import deepcopy from "../utils/deepcopy";


interface IpverState {
  isCollapsed: boolean | null
}

const collapsedReducer = (pverState: IpverState = {
  isCollapsed: false
}, action: Iaction) => {
  let newState = deepcopy(pverState)
  switch (action.type) {
    case 'changeType':
      newState.isCollapsed = !newState.isCollapsed
      return newState
    default:
      return pverState
  }
}

export default collapsedReducer