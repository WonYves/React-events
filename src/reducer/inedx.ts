import deepcopy from '../utils/deepcopy'

interface IpverState {
  user: PeopleType | null
}

interface Iaction {
  type: string
  payload: any
}

const userReducer = (pverState: IpverState = {
  user: {}
}, action: Iaction) => {
  let newState = deepcopy(pverState)
  switch (action.type) {
    case 'SignInlogin':
      return newState.user = action.payload
    case 'LogOut':
      return newState = {}
    default:
      return pverState
  }
}



export default userReducer