import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Input, Button, Select, Upload } from 'antd'
import { setIsOpenAddCategoryModal } from '../../actions'
import { RootState } from '../../reducer'
import { ICategories } from '../Categories/types'

import { Category } from '../../__generated__/types'
import { CategoriesDocument, useCategories } from '../Categories/queries/__generated__/Categories'
import { useCreateOneCategory } from '../Categories/mutations/__generated__/CreateOneCategory'
import { normFile, useSetFilesFromForm, useSetValuesFromForm } from '../../utils/utils'
import { UploadOutlined } from '@ant-design/icons/lib'

type PropsCategoryAddForm = {
  setIsOpenAddCategoryModal: (isOpen: Boolean) => void
  isOpenAddCategoryModal: Boolean
}

const CategoryAddForm: React.FC<any> = (
  {
    setIsOpenAddCategoryModal,
    isOpenAddCategoryModal,
    categoryList
  }) => {
  const { fl, propsUpload, setFilesFromForm } = useSetFilesFromForm()

  const [createOneCategory] = useCreateOneCategory(
    {
      // TODO:
      // @ts-ignore
      update(cache, { data: { createOneCategory } }) {
        const { categories } = cache.readQuery<ICategories>({ query: CategoriesDocument })!.categories
        cache.writeQuery({
          query: CategoriesDocument,
          data: { categoriesAll: categories?.concat([createOneCategory]) }
        })
      },
      refetchQueries: [{
        query: CategoriesDocument
      }]
    }
  )

  const { values, handleChange } = useSetValuesFromForm()

  const onFinish = (valuefromformlist: Category) => {
    setFilesFromForm(valuefromformlist)
    const parent = valuefromformlist.parent

    console.log('++++++++++++',
      valuefromformlist
    )
    console.log('+++V+++V++++++',
      values
    )

    createOneCategory({
      variables: {
        data: {
          ...values,
          parent
        },
        ...((fl.length == 0) ? {} : { files: fl })
      }
    }).then((m: any) => console.log('addCategoryMESSAGE:', m))
      .catch((e: any) => console.log('addCategoryERROR:', e))

    setIsOpenAddCategoryModal(false)
  }
  const handleCancel = () => {
    setIsOpenAddCategoryModal(false)
  }

  // const propsUpload = propsUploadF(setFl, fl)

  // @ts-ignore
  return (
    <Modal
      title="Category information"
      visible={Boolean(isOpenAddCategoryModal)}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        name="category" {...formItemLayoutWithOutLabel}
        // @ts-ignore
        onFinish={onFinish}>

        <Form.Item
          label="Name category"
          rules={[{ required: true, message: 'Name category is required' }]}
        >
          <Input
            name="name"
            onChange={handleChange} placeholder="name category"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="url"
        >
          <Input
            name="url"
            onChange={handleChange} placeholder="Url category"
            style={{ width: '100%', marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Description category"
        >
          <Input
            name="description"
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
  isOpenAddCategoryModal: Boolean
  categoryList?: Category | {}
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenAddCategoryModal: state.add_cat_modal.isOpen,
  categoryList: state.categories_list.categories
})

export default connect<typeof CategoryAddForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenAddCategoryModal }
)(CategoryAddForm)
