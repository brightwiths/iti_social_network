import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

type locationType = {
  city: string
  country: string
}

type photosType = {
  small: string
  large: string
}


export type UserType = {
  id: number
  photos: photosType
  followed: boolean
  name: string
  status: string
  location: locationType
}

export type UsersPageType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  fake: number
}

const initialState: UsersPageType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  fake: 10
};

export const usersReducer = (state = initialState, action: UsersActionTypes): UsersPageType => {
  switch (action.type) {
    case 'FAKE': return {...state, fake: state.fake + 1}
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        })
      }
    case 'SET-USERS': {
      return {...state, users: action.users}
    }
    case 'SET-CURRENT-PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'SET-TOTAL-USERS-COUNT': {
      return {...state, totalUsersCount: action.count}
    }
    case 'TOGGLE-IS-FETCHING': {
      return {...state, isFetching: action.isFetching}
    }
    case "TOGGLE-IS-FOLLOWING-PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)

      }
    default:
      return state;
  }
}

export const fake = () => ({type: 'FAKE'} as const)
export const followSuccess = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: Array<UserType>) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({
  type: 'SET-TOTAL-USERS-COUNT',
  count: totalUsersCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
  type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
  isFetching,
  userId
} as const)

export type UsersActionTypes = ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess> |
  ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> |
  ReturnType<typeof toggleIsFetching> | ReturnType<typeof toggleFollowingProgress> | ReturnType<typeof fake>;

export const requestUsers = (currentPage: number, pageSize: number) => {

  return (dispatch: Dispatch<UsersActionTypes>) => {

    dispatch(toggleIsFetching(true))

    usersAPI.getUsers(currentPage, pageSize).then(data => {
      dispatch(toggleIsFetching(false))
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
    });
  }
}

export const follow = (userId: number) => {
  return (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.follow(userId)
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
      });
  }
}

export const unfollow = (userId: number) => {
  return (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollow(userId)
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
      });
  }
}