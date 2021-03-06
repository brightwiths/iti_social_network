import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";


export const Header: React.FC<HeaderPropsType> = (props) => {
    return <header className={s.header}>
        {/*<img src={logo} alt=""/>*/}
        <div className={s.logo}>BrightNet</div>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>
                    <button>Login</button>
                </NavLink>}
        </div>
    </header>
}