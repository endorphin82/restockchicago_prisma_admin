import {   REACT_APP_RECYCLE_BIN_ID
} from "../../actions/types"
import { Product, Category } from '../../__generated__/types'
import { Products } from './queries/__generated__/Products'
import { ProductsByNameAndCategoryIds } from './queries/__generated__/ProductsByNameAndCategoryIds'

// export interface AllTasksResult {
//   allTasks: any;  // TODO: Put correct type here
// }

export interface IProducts {
  products: Products  // TODO: Put correct type here
}
export interface IProductsByNameAndCategoryIds {
  productsByNameAndCategoryIds: ProductsByNameAndCategoryIds  // TODO: Put correct type here
}

export interface PropsProducts {
  editProduct: (product: Product) => void
  setIsOpenAddProductModal: (isOpen: Boolean) => void
}

export interface PropsUpdateProduct {
  variables: Product
}

export interface ResponseProductsQueryData {
  products: Product[] | any
}

export interface ResponseProductsByCategoryIdQueryData {
  productsByCategoryId: ProductsByCategoryIdQuery[]
}

export interface ProductsByCategoryIdQuery {
  id: String
  name: String
  price: Number
  category?: Category
  images?: String[]
  icon?: String
}

export interface InputProductsByCategoryIdQueryVars {
  categoryId: String | typeof REACT_APP_RECYCLE_BIN_ID
}

export interface ResponseUpdateProductMutationData {
  updateProduct: InputUpdateProductMutationVars
}

export interface InputUpdateProductMutationVars {
  id?: String
  name?: String
  price?: Number
  categoryId?: String
  images?: String[]
  icon?: String
}
