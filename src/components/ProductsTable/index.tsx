import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import {
  editProduct,
  setIsOpenEditProductModal, setSearchCategories,
  setSearchName
} from '../../actions'
import ProductsTableAntd from './ProductsTableAntd'

import { Product } from '../../__generated__/types'
import ProductsSearch from '../ProductsSearch'

import { RootState } from '../../reducer'
import {
  useProductsByNameAndCategoryId
} from '../Products/queries/__generated__/ProductsByNameAndCategoryId'
import { useCategories } from '../Categories/queries/__generated__/Categories'
import ProductsSelectByCategory from '../ProductsSelectByCategory'

interface PropsProductsTable {
  editProduct: (product: Product | undefined) => void
  setSearchCategory: (searchCtegory: Number | Number[] | [] | undefined) => void
  setSearchName: (searchName: String | void | undefined) => void
  setIsOpenEditProductModal: (isOpen: Boolean | undefined) => void
  categories: String[] | [] | any
  searchName: String | void | undefined
  searchCategory: Number | Number[] | [] | undefined
}

const ProductsTable: React.FC<any> = (
  {
    categories, editProduct, setIsOpenEditProductModal, setSearchCategory,
    setSearchName, searchName, searchCategory
  }) => {

  // const [updateOneProduct] = useUpdateOneProduct(
  //   {
  //     refetchQueries: [{
  //       query: ProductsByCategoryIdDocument,
  //       variables: {
  //         id: REACT_APP_RECYCLE_BIN_ID
  //       }
  //     },
  //       {
  //         query: ProductsByNameAndCategoryIdDocument,
  //         variables: {
  //           name: searchName,
  //           category_id: searchCategory
  //         }
  //       }]
  //   }
  // )

  const { loading: prod_loading, error: prod_error, data: prod_data } = useProductsByNameAndCategoryId(
    {
      variables: {
        name: searchName as string,
        // category_id: searchCategory as number
      }
    }
  )
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const [isVisualDeleteModal, setIsVisualDeleteModal] = useState<Boolean>(false)
  const [productDeleted, setProductDeleted] = useState<Product | any>({})

  // useEffect(() => {
  //   setSearchCategory(categories)
  // }, [categories])

  console.log('productDeleted', productDeleted)

  if (prod_loading || cat_loading) {
    return (<div>Loading...</div>)
  }
  if (prod_error || !prod_data || cat_error || !cat_data) {
    return (<div>Error...</div>)
  }
  const { productsByNameAndCategoryId } = prod_data

  // TODO:
  // @ts-ignore
  // const productsAllWithoutRecycleBin = productsByNameAndCategoriesId?.filter((prod: Product) => {
  //   return !prod?.categories?.includes(REACT_APP_RECYCLE_BIN_ID)
  // })
  const handleEdit = (id: Number): void => {
    // @ts-ignore
    const prod = productsByNameAndCategoryId?.find((prod: Product) => prod.id === id)
    // @ts-ignore
    editProduct(prod)
    setIsOpenEditProductModal(true)
  }

  const handleDelete = (id: Number): void => {
    setIsVisualDeleteModal(true)
    // @ts-ignore
    setProductDeleted(productsByNameAndCategoryId?.find((prod: Product) => prod.id === id))
  }

  // const handleOk = (productDeleted: Product | any): void => {
  //   const { id, name, price, category_id, images, icon } = productDeleted
  //
  //   // categories.push(REACT_APP_RECYCLE_BIN_ID)
  //
  //   updateProduct({
  //     variables: {
  //       id, name, price, categories, images, icon
  //     }
  //   }).then(m => console.log("updateProductMESSAGE:", m))
  //     .catch((e: Error) => console.log("updateProductERROR:", e))
  //
  //   setIsVisualDeleteModal(false)
  // }

  const handleCancel = () => {
    setIsVisualDeleteModal(false)
  }

  const handleSearch = (value: string) => {
    setSearchName(value)
  }

  const handleEnterSearch = (e: any) => {
    if (e.charCode === 13) {
      setSearchName(e.target.value)
    }
  }

  const handleChange = (value: number) => {
    setSearchCategory(value)
  }

  return (
    <>
      <ProductsSearch handleEnterSearch={handleEnterSearch}
                      handleSearch={handleSearch}/>
      <ProductsSelectByCategory handleChange={handleChange}/>

      <ProductsTableAntd
        // @ts-ignore
        productsProp={productsByNameAndCategoryId}
        handleEditProp={handleEdit}
        handleDeleteProp={handleDelete}/>
      <Modal
        title="Delete product in recycle bin?"
        visible={Boolean(isVisualDeleteModal)}
        // onOk={() => handleOk(productDeleted)}
        onCancel={handleCancel}
      >
        <p>{productDeleted.id}</p>
      </Modal>
    </>
  )
}

interface StateProps {
  categories: String[]
  searchName: String
  searchCategories: String[]
}

const mapStateToProps = (state: RootState): StateProps => ({
  categories: state.categories_list.categories,
  searchName: state.search_name.searchName,
  searchCategories: state.search_categories_list.searchCategories
})
export default connect<typeof ProductsTable>(
// @ts-ignore
  mapStateToProps
  , {
    setSearchCategories,
    setSearchName,
    setIsOpenEditProductModal,
    editProduct
  })(ProductsTable)
