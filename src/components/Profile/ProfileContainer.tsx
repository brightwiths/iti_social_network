import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfilePageType} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

type PathParamsType = {
  userId: string
}

type MapStatePropsType = {
  profilePage: ProfilePageType
  isAuth: boolean
}

type MapDispatchPropsType = {

  getUserProfile: (userId: string) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType
export type ProfilePropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = '2';
    }
    this.props.getUserProfile(userId)
  }

  render() {
    if (!this.props.isAuth) return <Redirect to={'/login'}/>

    return (
      <Profile {...this.props} profilePage={this.props.profilePage}/>
    )
  }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
  profilePage: state.profilePage,
  isAuth: state.auth.isAuth
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)

