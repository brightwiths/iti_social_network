import React from 'react';
import s from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {reduxStoreType} from '../../redux/redux-store';

type ProfileType = {
  store: reduxStoreType
}

const Profile:React.FC<ProfileType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo top={props.store.getState().profileReducer.top} />
      <MyPostsContainer store={props.store} />
    </div>
  )
}

export default Profile;