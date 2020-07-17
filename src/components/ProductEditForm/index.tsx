import React, { useEffect, useState } from 'react'
import { Upload, message, InputNumber, Button, Form, Input, Modal, Select } from 'antd'
import { connect } from 'react-redux'
import { clearEditProduct, setIsOpenEditProductModal } from '../../actions'
import { priceStringToIntCent, priceToDollars } from '../../utils/utils'
import { RootState } from '../../reducer'
import { Category, Product } from '../../__generated__/types'
import { useUpdateOneProduct } from '../Products/mutations/__generated__/UpdateOneProduct'
import { useCategories } from '../Categories/queries/__generated__/Categories'
import { UploadOutlined } from '@ant-design/icons'
import ImageTable from './ImageTable'

interface PropsProductEditForm {
  edited_product: Product
  clearEditProduct: () => void
  setIsOpenEditProductModal: (isOpen: Boolean) => void
  isOpenEditProductModal: Boolean
}

const ProductEditForm: React.FC<any> = (
  {
    clearEditProduct, edited_product, categoryList,
    isOpenEditProductModal, setIsOpenEditProductModal,
    payloadEditProduct
  }) => {
  const [fl, setFl] = useState<any>([])
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
      'price': priceToDollars(edited_product.price),
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

    console.log('Received values of form:', values)
    const formData = new FormData()
    // @ts-ignore
    fl ?? valuefromformlist.files.forEach((file: any) => {
      setFl((fl: any[]) => [...fl, file.originFileObj])
      formData.append('files[]', file.originFileObj)
    })

    updateProduct({
      variables: {
        data: { name, price, icon, categories: values.cat },
        ...((fl.length == 0) ? {} : { files: fl }),
        where: {
          id
        },
        payloadEditProduct
      }
    }).then(m => {
      setFl([])
      console.log('updateProductMESSAGE:', m)
    })
      .catch(e => console.log('updateProductERROR:', e))
    setIsOpenEditProductModal(false)
  }
  const handleCancel = () => {
    setIsOpenEditProductModal(false)
    clearEditProduct()
  }
  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    console.log('valllll', e.target)
    setValues({ ...values, [name]: value })
  }

  const handleChangeSelect = (value: []) => {
    const conn = {
      connect: value.filter(v => {
        return !edited_product.categories.some((it: any) => it.id == v)
      }).map((conCat: Category) => ({ id: Number(conCat) }))
    }
    const discon = {
      disconnect: categoryList?.filter((cat: Category) => {
        return !value.some(item => item === cat.id)
      }).map((c: Category) => ({ id: Number(c.id) }))
    }
    const cat = {
      ...((conn.connect.length == 0) ? {} : conn),
      ...((discon.disconnect.length == 0) ? {} : discon)
    }
    setValues({ ...values, 'cat': { ...cat } })
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

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const propsUpload = {
    multiple: true,
    beforeUpload: (file: any) => {
      setFl((fl: any[]) => [...fl, file])
      return false
    },
    accept: "image/jpeg,image/png,image/gif",
    onRemove: (file: any) => {
      const index = fl.indexOf(file)
      const newFl = fl.slice()
      newFl.splice(index, 1)
      setFl([...newFl])
    },
    fl
  }
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
          <Input
            // @ts-ignore
            onChange={handleChange}
            placeholder="Price $"
            style={{ width: '100%', marginRight: 8 }}/>
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
          label="Add images"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...propsUpload} listType="picture">
            <Button>
              <UploadOutlined/> Select Images
            </Button>
          </Upload>
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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

interface StateProps {
  isOpenEditProductModal: Boolean
  edited_product?: Product | {},
  categoryList?: Category | {},
  payloadEditProduct: string | undefined
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenEditProductModal: state.edit_product_modal.isOpen,
  edited_product: state.edit_product.product,
  categoryList: state.categories_list.categories,
  payloadEditProduct: state.payload_edit_product.editProductPayload
})

export default connect<typeof ProductEditForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenEditProductModal, clearEditProduct }
)(ProductEditForm)
