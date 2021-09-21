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
        logInUser: (state, action: PayloadAction<User>) => {
            const {userName} = action.payload;
            const userIndex = state.users.map(user => user.userName).indexOf(userName);
            if (state.users.map(user => user.userName).includes(userName)) {
                state.loggedUser = action.payload;

            } else {
                action.payload.money = 100;
                state.users = [...state.users, action.payload];
                state.loggedUser = action.payload;

            }
            saveUsersInLocalStorage(state.users);
        }
    }
});


export const {logInUser} = usersSlice.actions;
export default usersSlice.reducer;