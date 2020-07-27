import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../reducer'
import { clearEditCategory, setIsOpenEditCategoryModal, setPayloadEditCategory } from '../../actions'
import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { Category } from '../../__generated__/types'
import { useUpdateOneCategory } from '../Categories/mutations/__generated__/UpdateOneCategory'
import { ProductsDocument } from '../Products/queries/__generated__/Products'
import { CategoriesDocument } from '../Categories/queries/__generated__/Categories'
import { UploadOutlined } from '@ant-design/icons'

import ImageTable from '../ImageTable'
import { normFile, useSetFilesFromForm, useSetValuesFromForm } from '../../utils/utils'

type PropsCategoryEditForm = {
  setIsOpenEditCategoryModal: (isOpen: Boolean) => void
  isOpenEditCategoryModal: Boolean
  edited_category: Category
}
const CategoryEditForm: React.FC<any> = (
  {
    setPayloadEditCategory, edited_category, setIsOpenEditCategoryModal,
    isOpenEditCategoryModal, categoryList, payloadEditCategory
  }) => {
  const [formEditCategory] = Form.useForm()
  const [updateOneCategory] = useUpdateOneCategory({
    refetchQueries: [
      {
        query: CategoriesDocument
      },
      {
        query: ProductsDocument
      }
    ]
  })
  const { values, setValues, handleChange } = useSetValuesFromForm()
  const { fl, setFl, setFilesFromForm, propsUpload } = useSetFilesFromForm()

  useEffect(() => {
    setValues(edited_category)
  }, [edited_category])
  useEffect(() => {
    formEditCategory.setFieldsValue({
      'name': edited_category.name,
      'description': edited_category.description,
      'parent': edited_category.parent,
      'id': edited_category.id
      // 'categories': categoryList.map((c: Category) => c.id)(edited_category.parent)
    })
    return () => {
      formEditCategory.resetFields()
    }
  }, [edited_category, formEditCategory])

  const onFinish = (valuefromformlist: Category) => {
    const { name, icon, description, parent, url } = valuefromformlist
    const id = Number(values?.id)
    setFilesFromForm(valuefromformlist)
    updateOneCategory({
      variables: {
        // @ts-ignore
        data: { name, icon, description, parent, url },
        ...((fl.length == 0) ? {} : { files: fl }),
        where: {
          id
        },
        payloadEditCategory
      }
    }).then((m: any) => console.log('updateProductMESSAGE:', m))
      .catch((e: any) => console.log('updateProductERROR:', e))
      .finally(() => {
        setFl([])
      })
    setIsOpenEditCategoryModal(false)
  }
  const handleCancel = () => {
    setIsOpenEditCategoryModal(false)
    // clearEditCategory()
  }

  return (
    <Modal
      title={`Category information id: ${values.id}`}
      visible={Boolean(isOpenEditCategoryModal)}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        form={formEditCategory}
        name="category" {...formItemLayoutWithOutLabel}
        // TODO:
        // @ts-ignore
        onFinish={onFinish}>

        <Form.Item
          label="ID category"
          name="id"
          // TODO:
          // @ts-ignore
          value={Number(values?.id)}
          rules={[{ required: true, message: 'Name category is required' }]}
        >
          <Input
            onChange={handleChange} placeholder="name category"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Name category"
          name="name"
          // TODO:
          // @ts-ignore
          value={String(values?.name)}
          rules={[{ required: true, message: 'Name category is required' }]}
        >
          <Input
            onChange={handleChange} placeholder="name category"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Description category"
          name="description"
          // @ts-ignore
          value={String(values?.description)}
        >
          <Input
            onChange={handleChange} placeholder="Description category"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Parent category"
          name="parent"
          // TODO:
          // @ts-ignore
          onChange={handleChange}
        >
          <Select
            defaultValue={values.id}
            placeholder="Select category">
            {
              // @ts-ignore
              categoryList?.map((category: Category) =>
                <Select.Option
                  key={Number(category.id)}
                  value={Number(category.id)}
                >{category.name}
                </Select.Option>
              )
            }
          </Select>
        </Form.Item>

        <Form.Item name="images" style={{ width: '100%' }}>
          <ImageTable
            setPayloadEditItem={setPayloadEditCategory}
            editedItem={edited_category}/>
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
  isOpenEditCategoryModal: Boolean
  edited_category?: Category | {}
  categoryList?: Category | {}
  payloadEditCategory: string | undefined
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenEditCategoryModal: state.edit_cat_modal.isOpen,
  edited_category: state.edit_category.category,
  categoryList: state.categories_list.categories,
  payloadEditCategory: state.payload_edit_category.editCategoryPayload
})

export default connect<typeof CategoryEditForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenEditCategoryModal, setPayloadEditCategory, clearEditCategory }
)(CategoryEditForm)
