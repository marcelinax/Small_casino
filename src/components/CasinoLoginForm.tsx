import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logInUser} from "../state/usersSlice";
import {RootState} from "../store";

const CasinoLoginForm: React.FC = () => {

    const [userName, setUserName] = useState<string>('');
    const loggedUser = useSelector((state: RootState) => state.users.loggedUser);

    const dispatch = useDispatch();


    const handleUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };


    return (
        <div className={'casino-login-form'}>

            <div className={'casino-login-form-box'}>
                <div className={'casino-login-form-box-top'}>
                    <h3>What's your name</h3>
                    <input value={userName} onChange={handleUserNameInput}/>
                </div>

                <button onClick={() => dispatch(logInUser(userName))}>Enter the casino
                </button>
            </div>
        </div>);
};

export default CasinoLoginForm;