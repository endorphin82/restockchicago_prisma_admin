import React, { useState } from 'react'
import { Button, Form, Modal, Select, Table, Tag, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { clearEditProduct, editProduct } from '../../actions'
import { priceToDollars } from '../../utils/utils'
import { PropsUpdateProduct } from '../Products/types'
import { REACT_APP_RECYCLE_BIN_ID } from '../../actions/types'
import { RootState } from '../../reducer'
import {
  ProductsByCategoryIdDocument
} from '../Products/queries/__generated__/ProductsByCategoryId'

import { Category, Product } from '../../__generated__/types'
import { useDeleteOneProduct } from '../Products/mutations/__generated__/DeleteOneProduct'
import { useCategories } from '../Categories/queries/__generated__/Categories'
import { useUpdateOneProduct } from '../Products/mutations/__generated__/UpdateOneProduct'

const styleImagesInTable = { width: '50px', height: '100%', marginRight: '10px' }

interface PropsRecycleBinProductsTable {
  clearEditProduct: () => void
  editProduct: (product: Product) => void
  edited_product: Product
}

const RecycleBinProductsTable: React.FC<PropsRecycleBinProductsTable> = (
  {
    clearEditProduct,
    editProduct,
    edited_product
  }) => {
  // const { loading: recycle_bin_prod_loading, error: recycle_bin_prod_error, data: recycle_bin_prod_data } = useProductsByCategoryId(
  //   {
  //     variables: {
  //       id: REACT_APP_RECYCLE_BIN_ID
  //     }
  //   })
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const [values, setValues] = useState({})
  const [isVisualDeleteModal, setIsVisualDeleteModal] = useState(false)
  const [isVisualRestoreModal, setIsVisualRestoreModal] = useState(false)
  const [productDeleted, setProductDeleted] = useState<Product | any>({})
  const [deleteOneProduct] = useDeleteOneProduct({
      refetchQueries: [{
        query: ProductsByCategoryIdDocument,
        variables: {
          id: REACT_APP_RECYCLE_BIN_ID
        }
      }]
    }
  )
  const [updateOneProduct] = useUpdateOneProduct({
      refetchQueries: [{
        query: ProductsByCategoryIdDocument,
        variables: {
          id: REACT_APP_RECYCLE_BIN_ID
        }
      }]
    }
  )

  if (cat_loading) {
    return (<div>Loading...</div>)
  }
  if (cat_error || !cat_data) {
    return (<div>Error...</div>)
  }
  const { categories } = cat_data

  // const categoriesAllWithoutRecycleBin = categories?.filter((category) => {
  //   return category?.id !== REACT_APP_RECYCLE_BIN_ID
  // })
  // console.log('productDeleted', productDeleted)

  // if (recycle_bin_prod_loading) {
  //   return (<div>Loading...</div>)
  // }
  // if (recycle_bin_prod_error || !recycle_bin_prod_data) {
  //   return (<div>Error...</div>)
  // }
  // const { productsByCategoryId } = recycle_bin_prod_data

  // console.log('productsByCategoryId', recycle_bin_prod_data?.productsByCategoryId)

  const onFinish = (valuefromform: any) => {
    const productWithoutRecycleBin = {
      ...edited_product,
      categories: [valuefromform?.category]
    }

    const { name, price, categories, icon } = edited_product
    // TODO:
    // @ts-ignore
    const id = Number(edited_product.id)

    console.log('onFinish', edited_product)
    // TODO:
    // @ts-ignore
    updateOneProduct<PropsUpdateProduct>({
      variables: {
        id, name, price, categories, icon
      }
    }).then((m: any) => {
        console.log('updateProductMESSAGE:', m)
      }
    )
      .catch((e: Error) => console.log('updateProductERROR:', e))

    setIsVisualRestoreModal(false)
  }
  const handleEdit = (id: String) => {
    // TODO:
    // @ts-ignore
    const edit_product = productsByCategoryId?.find((prod: Product) => prod.id === id)
    if (edit_product.categories.length === 1) {
      editProduct(edit_product)
      setIsVisualRestoreModal(true)
    } else {
      // const categoriesWithoutRecyclebin = edit_product.categories.filter((category: String) => {
      //   return category !== REACT_APP_RECYCLE_BIN_ID
      // })
      // const productWithoutRecycleBin = {
      //   ...edit_product,
      //   categories: [...categories]
      // }
      const {
        id, name, price, categories, icon
      } = edit_product
      // console.log("productWithoutRecycleBin", productWithoutRecycleBin)
      // TODO:
      // @ts-ignore
      updateProduct<PropsUpdateProduct>({
        variables: {
          id, name, price, categories, icon
        }
      }).then((m: String) => {
          console.log('updateProductMESSAGE:', m)
        }
      )
        .catch((e: Error) => console.log('updateProductERROR:', e))
    }
  }
  const handleCancelRestore = () => {
    clearEditProduct()
    setIsVisualRestoreModal(false)
  }

  const handleDelete = (id: String) => {
    setIsVisualDeleteModal(true)
    // TODO:
    // @ts-ignore
    setProductDeleted(productsByCategoryId?.find((prod: Product) => prod.id === id))
  }

  const handleOk = (id: String) => {
    console.log('productDeleted.id', productDeleted.id)
    deleteOneProduct({
      variables: {
        where: {
          id: Number(id)
        }
      }
    }).then(mess => console.log('deleteProduct response:', mess))
    setIsVisualDeleteModal(false)
  }

  const handleCancel = () => {
    setIsVisualDeleteModal(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: Number) => {
        return priceToDollars(price)
      }
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: Category) => (
        <span>
              <Tag color="red" key={String(category.id)}>
                {category.name}
              </Tag>
        </span>
      )
    }
    ,
    // {
    //   title: 'Images',
    //   dataIndex: 'images',
    //   key: 'images',
    //   render: (images: String[]) => {
    //     return (images)
    //       ? <div>
    //         {
    //           images
    //             .map(image => <img
    //               key={String(image)}
    //               alt="img"
    //               src={String(image)}
    //               style={styleImagesInTable}/>
    //             )
    //         }
    //       </div>
    //       : <span>no images</span>
    //   }
    // },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (id: String) => <>
        <Tooltip title="Recovery this product in any category">
          <Button onClick={() => handleEdit(id)} type="dashed">
            Recovery in category
          </Button>
        </Tooltip>
        <Tooltip title="Delete forever">
          <Button onClick={() => handleDelete(id)} type="dashed" danger>
            Delete
          </Button>
        </Tooltip>
      </>
    }
  ]

  return (
    <>
      <Table
        // TODO:
        // @ts-ignore
        dataSource={productsByCategoryId} columns={columns} rowKey="id"/>
      <Modal
        title="Delete product?"
        visible={isVisualDeleteModal}
        onOk={() => handleOk(productDeleted.id)}
        onCancel={handleCancel}
      >
        <p>{productDeleted.name}</p>
      </Modal>

      <Modal
        footer={false}
        title="Restore in category?"
        visible={isVisualRestoreModal}
        onCancel={handleCancelRestore}
      >
        <Form
          name="restore"
          // TODO:
          // @ts-ignore
          onFinish={onFinish}>
          <Form.Item
            label="Category"
            name="category"
            // TODO:
            // @ts-ignore
            onChange={handleChange}
            rules={[{ required: true, message: 'Category is required' }]}
          >
            {/*<Select*/}
            {/*  placeholder="Select category">*/}
            {/*  {categories?.map((category) =>*/}
            {/*    <Select.Option*/}
            {/*      // TODO:*/}
            {/*      // @ts-ignore*/}
            {/*      key={category?._id}*/}
            {/*    >{category?.name}</Select.Option>*/}
            {/*  )*/}
            {/*  }*/}
            {/*</Select>*/}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Restore
          </Button>
        </Form>
      </Modal>
    </>
  )
}

interface StateProps {
  edited_product?: Product | {}
}

const mapStateToProps = (state: RootState): StateProps => ({
  edited_product: state.edit_product.product
})

export default connect<typeof RecycleBinProductsTable>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { editProduct, clearEditProduct }
)(RecycleBinProductsTable)
