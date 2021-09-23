import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../types/User";

interface UsersState {
    users: User[];
    loggedUser: User | null;
}

const saveUsersInLocalStorage = (state: User[]): void => {
    localStorage.setItem('casinoUsers', JSON.stringify(state));
};

const loadUsersFromLocalStorage = (): User[] => {
    return JSON.parse(localStorage.getItem('casinoUsers') || '[]');
};

const initialState: UsersState = {
    users: loadUsersFromLocalStorage(),
    loggedUser: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logInUser: (state, action: PayloadAction<string>) => {
            const userName = action.payload;
            const userIndex = state.users.map(user => user.userName).indexOf(userName);
            if (state.users.map(user => user.userName).includes(userName)) {
                state.loggedUser = {userName, money: state.users[userIndex].money};
            } else {
                state.users = [...state.users, {userName, money: 500}];
                state.loggedUser = {userName, money: 500};
            }
            saveUsersInLocalStorage(state.users);
        },
        logOutUser: (state) => {
            state.loggedUser = null;
        },
        changeLoggedUserMoney: (state, action: PayloadAction<number>) => {
            const money = action.payload;
            if (state.loggedUser !== null) {
                const userIndex = state.users.map(user => user.userName).indexOf(state.loggedUser.userName);
                state.loggedUser.money = money;
                state.users[userIndex].money = money;
                state.users = [...state.users];
                saveUsersInLocalStorage(state.users);
            }

        }
    }
});


export const {logInUser, logOutUser, changeLoggedUserMoney} = usersSlice.actions;
export default usersSlice.reducer;