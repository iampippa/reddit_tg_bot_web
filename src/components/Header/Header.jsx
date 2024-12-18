import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <span className={'title'}>Я гей 4</span>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;
