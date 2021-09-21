import React from 'react';
import {useSelector} from "react-redux";
import Casino from "./components/Casino";
import CasinoLoginForm from "./components/CasinoLoginForm";
import {RootState} from "./store";


function App() {

    const loggedUser = useSelector((state: RootState) => state.users.loggedUser);

    return (
        <>
            {loggedUser !== null ? <Casino/> : <CasinoLoginForm/>}
        </>
    );
}

export default App;
