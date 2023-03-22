import deepcopy from '../../utils/deepcopy'

interface IpverState {
  timer: number
}

interface Iaction {
  type: string
  [key: string]: any
}

const userReducer = (pverState: IpverState = {
  timer: 0
}, action: Iaction) => {
  let newState = deepcopy(pverState)
  switch (action.type) {
    case '+':
      return newState++
    case '-':
      return newState--
    default :
      return pverState
  }
}



export default userReducer