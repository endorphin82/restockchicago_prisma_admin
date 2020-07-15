import React, { useEffect, useState } from 'react'
import { Upload, message, Button, Form, Input, Modal, Select } from 'antd'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import { connect } from 'react-redux'
import { clearEditProduct, setIsOpenEditProductModal } from '../../actions'
import { priceStringToIntCent } from '../../utils/utils'
import { RootState } from '../../reducer'
import { REACT_APP_RECYCLE_BIN_ID } from '../../actions/types'
import { Category, Product } from '../../__generated__/types'
import { useUpdateOneProduct } from '../Products/mutations/__generated__/UpdateOneProduct'
import { useCategories } from '../Categories/queries/__generated__/Categories'
import { UploadOutlined } from '@ant-design/icons'
import ImageTable from './ImageTable'
import categories_list from '../../reducer/categories-list'

interface PropsProductEditForm {
  edited_product: Product
  clearEditProduct: () => void
  setIsOpenEditProductModal: (isOpen: Boolean) => void
  isOpenEditProductModal: Boolean
}

const ProductEditForm: React.FC<any> = (
  {
    clearEditProduct, edited_product, categoryList,
    isOpenEditProductModal, setIsOpenEditProductModal
  }) => {
  const [formEditProduct] = Form.useForm()
  const [updateProduct] = useUpdateOneProduct()
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const [values, setValues] = useState<Product | any>({})
  console.log('values+++', values)

  useEffect(() => {
    setValues(edited_product)
  }, [edited_product])
  useEffect(() => {
    formEditProduct.setFieldsValue({
      'name': edited_product.name,
      'price': edited_product.price,
      'icon': edited_product.icon,
      'categories': edited_product.categories?.map((c: Category) => c.id)
    })
    return () => {
      formEditProduct.resetFields()
    }
  }, [edited_product, formEditProduct])
  const onFinish = (valuefromformlist: Product) => {
    const { name, icon } = valuefromformlist
    const id = Number(values?.id)
    const price = priceStringToIntCent(String(valuefromformlist.price))
    // const category_id = Number(valuefromformlist.category_id)

    updateProduct({
      variables: {
        data: { name, price, icon },
        where: {
          id
        }
      }
    }).then(m => console.log('updateProductMESSAGE:', m))
      .catch(e => console.log('updateProductERROR:', e))
    setIsOpenEditProductModal(false)
  }
  const handleCancel = () => {
    setIsOpenEditProductModal(false)
    clearEditProduct()
  }
  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleChangeSelect = (value: []) => {
    const cat = {
      connect: value.map(v => {
        return {
          id: Number(v)
        }
      }),
      disconnect: categoryList?.filter((cat: Category) => {
        return !value.some(item => item === cat.id)
      }).map((c: Category) => ({ id: Number(c.id) }))
    }
    setValues({ ...values, 'categories': { ...cat } })
  }

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

  return (
    <Modal
      title={`Product information id: ${values.id}`}
      visible={Boolean(isOpenEditProductModal)}
      footer={false}
      onCancel={handleCancel}
      // forceRender={true}
      // destroyOnClose={false}
    >

      <Form
        form={formEditProduct}
        name="product" {...formItemLayoutWithOutLabel}
        // TODO:
        // @ts-ignore
        onFinish={onFinish}>

        <Form.Item
          label="Name product"
          name="name"
          // TODO:
          // @ts-ignore
          value={String(values?.name)}
          rules={[{ required: true, message: 'Name product is required' }]}
        >
          <Input

            onChange={handleChange} placeholder="name product"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          // noStyle
          rules={[{ required: true, message: 'Price is required' }]}
        >
          <Input type="number" placeholder="Price $" style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Categories"
          name="categories"
          // TODO:
          // @ts-ignore
          rules={[{ required: true, message: 'Category is required' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select category"
            // style={{ width: '100%'}}
            onChange={handleChangeSelect}
          >
            {categoryList?.map((c: Category) => <Select.Option
              defaultValue={edited_product?.categories?.map((c: Category) => Number(c.id))}
              key={Number(c.id)}
              value={Number(c.id)}>{c.name}</Select.Option>
            )
            }
          </Select>
        </Form.Item>

        <Form.Item name="images" style={{ width: '100%' }}>
          <ImageTable/>
        </Form.Item>

        <Form.Item
          label="Icon"
          name="icon"
          // noStyle
        >
          <Input onChange={handleChange} placeholder="icon url" style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  )
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

interface StateProps {
  isOpenEditProductModal: Boolean
  edited_product?: Product | {},
  categoryList?: Category | {}
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenEditProductModal: state.edit_product_modal.isOpen,
  edited_product: state.edit_product.product,
  categoryList: state.categories_list.categories
})

export default connect<typeof ProductEditForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenEditProductModal, clearEditProduct }
)(ProductEditForm)
