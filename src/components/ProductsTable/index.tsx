import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import {
  editProduct,
  setIsOpenEditProductModal, setSearchCategories,
  setSearchName
} from '../../actions'
import ProductsTableAntd from './ProductsTableAntd'

import { Category, Product } from '../../__generated__/types'
import ProductsSearch from '../ProductsSearch'

import { RootState } from '../../reducer'
import {
  ProductsByNameAndCategoryIdsDocument,
  useProductsByNameAndCategoryIds
} from '../Products/queries/__generated__/ProductsByNameAndCategoryIds'
import { useCategories } from '../Categories/queries/__generated__/Categories'
import ProductsSelectByCategories from '../ProductsSelectByCategories'
import { useDeleteOneProduct } from '../Products/mutations/__generated__/DeleteOneProduct'
import { REACT_APP_RECYCLE_BIN_ID } from '../../actions/types'
import { IProductsByNameAndCategoryIds } from '../Products/types'


interface PropsProductsTable {
  editProduct: (product: Product | undefined) => void
  setSearchCategories: (searchCategories: Number | Number[] | Category[] | [] | undefined) => void
  setSearchName: (searchName: String | void | undefined) => void
  setIsOpenEditProductModal: (isOpen: Boolean | undefined) => void
  categories: Category[] | [] | any
  searchName: String | void | undefined
  searchCategory: Number | Number[] | [] | undefined
}

const ProductsTable: React.FC<any> = (
  {
    categories, editProduct, setIsOpenEditProductModal, setSearchCategory,
    setSearchName, searchName, searchCategories
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
  //         query: ProductsByNameAndCategoryIdsDocument,
  //         variables: {
  //           name: searchName,
  //           category_ids: searchCategory
  //         }
  //       }]
  //   }
  // )

  const { loading: prod_loading, error: prod_error, data: prod_data } = useProductsByNameAndCategoryIds(
    {
      variables: {
        name: searchName as string
        // category_ids: categories.map((c: Category) => Number(c.id))
      }
    }
  )
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const [isVisualDeleteModal, setIsVisualDeleteModal] = useState<Boolean>(false)
  const [productDeleted, setProductDeleted] = useState<Product | any>({})
  const [deleteOneProduct] = useDeleteOneProduct(
    {
      // @ts-ignore
      update(cache, { data: { deleteOneProduct } }) {
        const { productsByNameAndCategoryIds } = cache.readQuery<IProductsByNameAndCategoryIds>({
          query: ProductsByNameAndCategoryIdsDocument,
          variables: {
            name: searchName
            // category_ids: searchCategories
            // category_ids: [1, 2]
          }
        })!.productsByNameAndCategoryIds
        cache.writeQuery({
          query: ProductsByNameAndCategoryIdsDocument,
          data: {
            // if add product includes search categories, update cache query productsByNameAndCategoriesId
            // @ts-ignore
            // productsByNameAndCategoryId: deleteOneProduct.categories.every((cat: any) => searchCategories?.includes(cat)) ? productsByNameAndCategoryId?.filter(prod => deleteOneProduct.id !== prod.id) : productsByNameAndCategoryId
            productsByNameAndCategoryIds: productsByNameAndCategoryIds?.filter((prod: Product) => deleteOneProduct.id !== prod.id)
          }
        })
      }
      ,
      //// TODO:

      refetchQueries: [{
        query: ProductsByNameAndCategoryIdsDocument,
        variables: {
          name: searchName
          // category_ids: searchCategories.map((c: Category) => c.id)
        }
      }]
    }
  )
  useEffect(() => {
    setSearchCategories(categories)
  }, [categories])

  console.log('productDeleted', productDeleted)

  if (prod_loading || cat_loading) {
    return (<div>Loading...</div>)
  }
  if (prod_error || !prod_data || cat_error || !cat_data) {
    return (<div>Error...</div>)
  }
  const { productsByNameAndCategoryIds } = prod_data

  // TODO:
  // @ts-ignore
  // const productsAllWithoutRecycleBin = productsByNameAndCategoriesId?.filter((prod: Product) => {
  //   return !prod?.categories?.includes(REACT_APP_RECYCLE_BIN_ID)
  // })
  const handleEdit = (id: Number): void => {
    // @ts-ignore
    const prod = productsByNameAndCategoryIds?.find((prod: Product) => prod.id === id)
    // @ts-ignore
    editProduct(prod)
    setIsOpenEditProductModal(true)
  }

  const handleDelete = (id: Number): void => {
    setIsVisualDeleteModal(true)
    // @ts-ignore
    setProductDeleted(productsByNameAndCategoryIds?.find((prod: Product) => prod.id === id))
  }

  const handleOk = (productDeleted: Product | any): void => {
    deleteOneProduct({
      variables: {
        where: {
          id: Number(productDeleted.id)
        }
      }
    }).then(mess => console.log('deleteProduct response:', mess))
      .catch(err => console.log('Error Delete Product', err))
    setIsVisualDeleteModal(false)
  }

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

  const handleChange = (value: Category[]) => {
    setSearchCategories(value)
  }

  return (
    <>
      <ProductsSearch handleEnterSearch={handleEnterSearch}
                      handleSearch={handleSearch}/>
      <ProductsSelectByCategories handleChange={handleChange}/>

      <ProductsTableAntd
        // @ts-ignore
        productsProp={productsByNameAndCategoryIds}
        handleEditProp={handleEdit}
        handleDeleteProp={handleDelete}/>
      <Modal
        title="Delete product?"
        visible={Boolean(isVisualDeleteModal)}
        onOk={() => handleOk(productDeleted)}
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
  searchCategories: Category[]
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
