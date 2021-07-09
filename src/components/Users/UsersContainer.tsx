import {connect} from 'react-redux';
import {
  follow,
  setCurrentPage,
  setUsers,
  setTotalUsersCount,
  toggleIsFetching,
  unfollow,
  UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import React from "react";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
}

type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

type MapStateToPropsTypeAPI = {
  isFetching: boolean
}

type MapDispatchToPropsTypeAPI = {
  setUsers: (users: Array<UserType>) => void
  setCurrentPage: (pageNumber: number) => void
  setTotalUsersCount: (totalCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType
type UsersAPIPropsType = MapDispatchToPropsTypeAPI & MapStateToPropsTypeAPI & UsersPropsType

class UsersContainer extends React.Component<UsersAPIPropsType> {
  componentDidMount() {
    this.props.toggleIsFetching(true)

    usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
      debugger
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
        this.props.setUsers(data.items)
        this.props.setTotalUsersCount(data.totalCount)
      });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    this.props.toggleIsFetching(true)

    usersAPI.getUsers(pageNumber, this.props.pageSize)
      .then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
      });
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
      />
    </>
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType & MapStateToPropsTypeAPI => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}

export default connect(mapStateToProps, { follow, unfollow, setUsers,
  setCurrentPage, setTotalUsersCount, toggleIsFetching })(UsersContainer);