import { ActionsTypes } from "../store"
import { EDIT_CATEGORY_PAYLOAD } from '../actions/types'


export type initialState = typeof initialState
const initialState = {
  editCategoryPayload: ''
}

export default (state: initialState = initialState, action: ActionsTypes): initialState => {
  switch (action.type) {
    case EDIT_CATEGORY_PAYLOAD:
      // @ts-ignore
      return { editCategoryPayload: action.payload }
    default:
      return state
  }
}
