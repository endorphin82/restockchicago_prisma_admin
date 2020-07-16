import { ActionsTypes } from "../store"
import { EDIT_PRODUCT_PAYLOAD } from '../actions/types'

export type initialState = typeof initialState
const initialState = {
  editProductPayload: ''
}

export default (state: initialState = initialState, action: ActionsTypes): initialState => {
  switch (action.type) {
    case EDIT_PRODUCT_PAYLOAD:
      // @ts-ignore
      return { editProductPayload: action.payload }
    default:
      return state
  }
}
