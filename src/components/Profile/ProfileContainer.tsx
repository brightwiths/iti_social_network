import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, InitialStateProfileType, updateStatus} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profilePage: InitialStateProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType
export type ProfilePropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userId: number | null = parseInt(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        if (userId) {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }

    }

    render() {
        return (
            <Profile {...this.props} profilePage={this.props.profilePage} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return ({
        profilePage: state.profilePage,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)



