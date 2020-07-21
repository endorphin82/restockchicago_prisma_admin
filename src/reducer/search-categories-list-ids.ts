import { ActionsTypes } from "../store"
import { SEARCH_CATEGORIES_LIST_IDS } from "../actions/types"

export type initialState = typeof initialState
const initialState = {
  searchCategoriesIds: []
}

export default (state: initialState = initialState, action: ActionsTypes): initialState => {
  switch (action.type) {
    case SEARCH_CATEGORIES_LIST_IDS:
      // @ts-ignore
      return { searchCategoriesIds: [...action.payload] }
    default:
      return state
  }
}
