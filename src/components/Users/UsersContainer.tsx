import {connect} from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC,
  unfollowAC,
  UserType
} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import {AppStateType} from '../../redux/redux-store';
import {UsersAPIComponent} from "./UsersAPIComponent";


type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
}

type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

type MapDispatchToPropsTypeApiOnly = {
  setUsers: (users: Array<UserType>) => void
  setCurrentPage: (pageNumber: number) => void
  setTotalUsersCount: (totalCount: number) => void
}

export type UsersAPIComponentPropsType = MapStatePropsType & MapDispatchToPropsType
  & MapDispatchToPropsTypeApiOnly

export type UsersPropsType = MapStatePropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType & MapDispatchToPropsTypeApiOnly => {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId: number) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (pageNumber: number) => {
      dispatch(setCurrentPageAC(pageNumber))
    },
    setTotalUsersCount: (totalCount: number) => {
      dispatch(setUsersTotalCountAC(totalCount))
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);