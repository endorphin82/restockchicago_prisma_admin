import React, { useEffect, useState } from 'react'
import { Upload, message, InputNumber, Button, Form, Input, Modal, Select } from 'antd'
import { connect } from 'react-redux'
import { clearEditProduct, setIsOpenEditProductModal, setPayloadEditProduct } from '../../actions'
import {
  normFile,
  priceStringToIntCent,
  priceToDollars,
  useSetFilesFromForm,
  useSetValuesFromForm
} from '../../utils/utils'
import { RootState } from '../../reducer'
import { Category, Product } from '../../__generated__/types'
import { useUpdateOneProduct } from '../Products/mutations/__generated__/UpdateOneProduct'
import { UploadOutlined } from '@ant-design/icons'
import ImageTable from '../ImageTable'
import TextArea from 'antd/lib/input/TextArea'

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
    payloadEditProduct, setPayloadEditProduct
  }) => {
  const { fl, setFl, setFilesFromForm, propsUpload } = useSetFilesFromForm()
  const [formEditProduct] = Form.useForm()
  const [updateProduct] = useUpdateOneProduct()
  // @ts-ignore
  const { values, setValues, handleChange } = useSetValuesFromForm()

  useEffect(() => {
    setValues(edited_product)
  }, [edited_product])
  useEffect(() => {
    formEditProduct.setFieldsValue({
      'name': edited_product.name,
      'price': priceToDollars(edited_product.price),
      'icon': edited_product.icon,
      'description': edited_product.description,
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
    setFilesFromForm(valuefromformlist)
    updateProduct({
      variables: {
        data: { name, icon, price, categories: values.cat },
        ...((fl.length == 0) ? {} : { files: fl }),
        where: {
          id
        },
        payloadEditProduct
      }
    }).then(m => {
      console.log('updateProductMESSAGE:', m)
    })
      .catch(e => console.log('updateProductERROR:', e))
      .finally(() => {
        setFl([])
      })
    setIsOpenEditProductModal(false)

  }
  const handleCancel = () => {
    setIsOpenEditProductModal(false)
    clearEditProduct()
  }

  const handleChangeSelect = (value: []) => {
    const conn = {
      connect: value.filter(v => {
        return !edited_product.categories.some((it: any) => it.id == v)
      }).map((conCat: Category) => ({ id: Number(conCat) }))
    }
    const discon = {
      disconnect: edited_product?.categories?.filter((cat: Category) => {
        return !value.some(item => item === cat.id)
      }).map((c: Category) => ({ id: Number(c.id) }))
    }
    const cat = {
      ...((conn.connect.length == 0) ? {} : conn),
      ...((discon.disconnect.length == 0) ? {} : discon)
    }
    setValues({ ...values, 'cat': { ...cat } })
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
          <ImageTable
            setPayloadEditItem={setPayloadEditProduct}
            editedItem={edited_product}/>
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
        <Form.Item
          label="Description"
          name="description"
          // noStyle
        >
          <TextArea onChange={handleChange} maxLength={180} placeholder="description" rows={3}
                    style={{ width: '100%', marginRight: 8 }}/>
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
  { setPayloadEditProduct, setIsOpenEditProductModal, clearEditProduct }
)(ProductEditForm)
