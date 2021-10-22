import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Sidebar.module.scss'
import {FriendItem} from './FriendItem/FriendItem';
import {SidebarPropsType} from './SidebarContainer';

export const Sidebar:React.FC<SidebarPropsType> = (props) => {

  let FriendsElements = props.sidebar.friends.map(f => <FriendItem key={f.id} id={f.id} name={f.name} avatar={f.avatar}/>)

  return (
    <div className={s.navbarContainer}>
      <nav className={s.nav}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.active}>Dialogs</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/news' activeClassName={s.active}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
        </div>
      </nav>
      <div className={s.friends}>
        <h3>Friends</h3>
        <div className={s.friendsContainer}>{FriendsElements}</div>
      </div>
    </div>
  )
}