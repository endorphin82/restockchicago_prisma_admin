import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { setIsOpenAddProductModal } from '../../actions'
import {
  priceStringToIntCent,
  useSetFilesFromForm,
  useSetValuesFromForm,
  normFile,

} from '../../utils/utils'
import { RootState } from '../../reducer'
import { Category, Product } from '../../__generated__/types'
import { useCreateOneProduct } from '../Products/mutations/__generated__/CreateOneProduct'
import { UploadOutlined } from '@ant-design/icons/lib'
import { ProductsByNameAndCategoryIdsDocument } from '../Products/queries/__generated__/ProductsByNameAndCategoryIds'
import { IProductsByNameAndCategoryIds } from '../Products/types'

const { TextArea } = Input

type PropsProductAddForm = {
  setIsOpenAddProductModal: (isOpen: Boolean) => void
  isOpenAddProductModal: Boolean
  searchName: String | void | undefined
  setSearchCategoriesIds: Number[] | [] | undefined
  categories: Category[] | [] | any
}

const ProductAddForm: React.FC<any> = ({ isOpenAddProductModal, categories, setIsOpenAddProductModal, searchName, searchCategoriesIds }) => {
  const { fl, setFilesFromForm, propsUpload } = useSetFilesFromForm()
  console.log('searchCategories', searchCategoriesIds)
  const [createOneProduct] = useCreateOneProduct({
      //   // TODO:
      // @ts-ignore
      update(cache, { data: { createOneProduct } }) {
        const { productsByNameAndCategoryIds } = cache.readQuery<IProductsByNameAndCategoryIds>({
          query: ProductsByNameAndCategoryIdsDocument,
          variables: {
            name: searchName,
            category_ids: (searchCategoriesIds.length !== 0) ? searchCategoriesIds : categories.map((c: Category) => Number(c.id))
          }
        })!.productsByNameAndCategoryIds
        cache.writeQuery({
          query: ProductsByNameAndCategoryIdsDocument,
          data: {
            // if add product includes search categories, update cache query productsByNameAndCategoriesId
            // @ts-ignore
            // productsByNameAndCategoryIds: createOneProduct.categories.every((cat: Category) => searchCategories.includes(cat.id)) ? productsByNameAndCategoryIds?.concat([createOneProduct]) : productsByNameAndCategoryIds
            productsByNameAndCategoryIds: productsByNameAndCategoryIds ? [...productsByNameAndCategoryIds, createOneProduct] : createOneProduct
          }
        })
      }
      ,
      refetchQueries: [
        {
          query: ProductsByNameAndCategoryIdsDocument,
          variables: {
            name: searchName
            // category_ids: searchCategories.map((c: Category) => Number(c.id))
          }
        }
      ]
    }
  )
  const { values, setValues, handleChange } = useSetValuesFromForm()
  const onFinish = (valuefromformlist: any) => {
    setFilesFromForm(valuefromformlist)
    const price = priceStringToIntCent(values.price)
    createOneProduct({
      variables: {
        data: {
          ...values,
          price
        },
        ...((fl.length == 0) ? {} : { files: fl })
      }
    }).then(m => console.log('createOneProduct:', m))
      .catch(e => console.log('addProductERROR:', e))
    setIsOpenAddProductModal(false)
  }

  const handleCancel = () => {
    setIsOpenAddProductModal(false)
  }

  const handleChangeSelect = (value: string[]) => {
    const cat = {
      connect: value.map(v => {
        return {
          id: Number(v)
        }
      })
    }
    setValues({ ...values, 'categories': { ...cat } })
  }

  // const propsUpload = propsUploadF(setFl, fl)

  return (
    <Modal
      title="Product information"
      visible={Boolean(isOpenAddProductModal)}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        // onChange={handleChange}
        name="product" {...formItemLayoutWithOutLabel}
        // @ts-ignore
        onFinish={onFinish}>
        <Form.Item
          label="Name product"
          rules={[{ required: true, message: 'Name product is required' }]}
        >
          <Input
            name="name"
            onChange={handleChange} placeholder="name product"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>
        <Form.Item
          label="Price"
          rules={[{ required: true, message: 'Price is required' }]}
        >
          <Input
            name="price"
            onChange={handleChange}
            type="number" placeholder="Price $" style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Category"
          name="categories"
          // noStyle
          rules={[{ required: true, message: 'Category is required' }]}
        >
          <Select
            onChange={handleChangeSelect}
            mode="multiple"
            placeholder="Select category">
            {categories?.map((category: Category) =>
              <Select.Option
                key={String(category?.id)}
                value={String(category?.id)}
                onChange={handleChange}
              >{String(category?.name)}
              </Select.Option>
            )
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="images"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...propsUpload} listType="picture">
            <Button>
              <UploadOutlined/> Select Files
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Icon"
          // noStyle
        >
          <Input
            name="icon"
            onChange={handleChange}
            placeholder="icon url"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>
        <Form.Item
          label="Url"
          // noStyle
        >
          <Input name="url" onChange={handleChange} placeholder="url" style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>
        <Form.Item
          label="Description"
          // noStyle
        >
          <TextArea name="description" onChange={handleChange} maxLength={180} placeholder="description" rows={3}
                    style={{ width: '100%', marginRight: 8 }}/>
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
  isOpenAddProductModal: Boolean
  searchName: String
  searchCategoriesIds: Number[]
  categories: String[]
}

const mapStateToProps = (state: RootState): StateProps => ({
  categories: state.categories_list.categories,
  isOpenAddProductModal: state.add_product_modal.isOpen,
  searchName: state.search_name.searchName,
  searchCategoriesIds: state.search_categories_list_ids.searchCategoriesIds
})

export default connect<typeof ProductAddForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenAddProductModal }
)(ProductAddForm)
