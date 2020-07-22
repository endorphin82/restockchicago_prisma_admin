import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../reducer'
import { clearEditCategory, setIsOpenEditCategoryModal } from '../../actions'
import { Button, Form, Input, Modal, Select } from 'antd'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'
import { Category } from '../../__generated__/types'
import { REACT_APP_RECYCLE_BIN_ID } from '../../actions/types'
import { useUpdateOneCategory } from '../Categories/mutations/__generated__/UpdateOneCategory'
import { ProductsDocument } from '../Products/queries/__generated__/Products'
import { CategoriesDocument, useCategories } from '../Categories/queries/__generated__/Categories'

type PropsCategoryEditForm = {
  setIsOpenEditCategoryModal: (isOpen: Boolean) => void
  isOpenEditCategoryModal: Boolean
  edited_category: Category
}
const CategoryEditForm: React.FC<any> = ({ edited_category, setIsOpenEditCategoryModal, isOpenEditCategoryModal }) => {
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
  const [values, setValues] = useState<Category | any>({})
  useEffect(() => {
    setValues(edited_category)
  }, [edited_category])
  useEffect(() => {
    formEditCategory.setFieldsValue({
      'name': edited_category.name,
      'icons': edited_category.icon,
      // 'images': edited_category.images,
      'parent': edited_category.parent,
      'id': edited_category.id
    })
    return () => {
      formEditCategory.resetFields()
    }
  }, [edited_category, formEditCategory])
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()

  if (cat_loading) {
    return (<div>Loading...</div>)
  }
  if (cat_error || !cat_data) {
    return (<div>Error...</div>)
  }
  const { categories } = cat_data

  // @ts-ignore
  // const categoriesAllWithoutRecycleBin = categories?.filter((category: Category) => {
  //   return category?.id !== REACT_APP_RECYCLE_BIN_ID
  // })

  const onFinish = (valuefromformlist: Category) => {
    const { name, img, icon, parent } = valuefromformlist
    const id = Number(values?.id)

    updateOneCategory({
      variables: {
        data: {
          name, icon, parent
        },
        where: {
          id
        }
      }
    }).then((m: any) => console.log('updateProductMESSAGE:', m))
      .catch((e: any) => console.log('updateProductERROR:', e))

    setIsOpenEditCategoryModal(false)
  }
  const handleCancel = () => {
    setIsOpenEditCategoryModal(false)
    // clearEditCategory()
  }
  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
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
              categories?.map((category: Category) =>
              <Select.Option
                key={Number(category.id)}
                value={Number(category.id)}
              >{category.id}
              </Select.Option>
            )
            }
          </Select>
        </Form.Item>

        <Form.List name="icon">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'icons' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input icons url or delete this field.'
                        }
                      ]}
                      noStyle
                    >
                      <Input value={values.icons[index]} placeholder="icon url"
                             style={{ width: '90%', marginRight: 8 }}/>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name)
                        }}
                      />
                    ) : <span/>}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    style={{ width: '80%' }}
                  >
                    <PlusOutlined/> Add icon url
                  </Button>
                </Form.Item>
              </div>
            )
          }}
        </Form.List>
        <Form.List name="images">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Images' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input image url or delete this field.'
                        }
                      ]}
                      noStyle
                    >
                      <Input value={values.images[index]} placeholder="image url"
                             style={{ width: '90%', marginRight: 8 }}/>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name)
                        }}
                      />
                    ) : <span/>}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    style={{ width: '80%' }}
                  >
                    <PlusOutlined/> Add image url
                  </Button>
                </Form.Item>
              </div>
            )
          }}
        </Form.List>
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
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenEditCategoryModal: state.edit_cat_modal.isOpen,
  edited_category: state.edit_category.category
})

export default connect<typeof CategoryEditForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenEditCategoryModal, clearEditCategory }
)(CategoryEditForm)
