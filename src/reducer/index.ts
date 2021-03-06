import { combineReducers } from 'redux'
import edit_product_modal from './edit-prod-modal'
import add_product_modal from './add-prod-modal'
import edit_cat_modal from './edit-cat-modal'
import add_cat_modal from './add-cat-modal'
import edit_product from './edit-product'
import edit_category from './edit-category'
import categories_list from './categories-list'
import search_categories_list_ids from './search-categories-list-ids'
import search_name from './search-name'
import payload_edit_product from './payload-edit-product'
import payload_edit_category from './payload-edit-category'

export const rootReducer = combineReducers({
  add_cat_modal,
  edit_cat_modal,
  edit_product_modal,
  add_product_modal,
  edit_product,
  edit_category,
  categories_list,
  search_categories_list_ids,
  search_name,
  payload_edit_product,
  payload_edit_category
})

export type RootState = ReturnType<typeof rootReducer>
