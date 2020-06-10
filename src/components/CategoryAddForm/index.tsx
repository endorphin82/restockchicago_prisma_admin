import React, { useState } from "react"
import { connect } from "react-redux"
import { Modal, Form, Input, Button, Select } from "antd"
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import MinusCircleOutlined from "@ant-design/icons/lib/icons/MinusCircleOutlined"
import { setIsOpenAddCategoryModal } from "../../actions"
import { RootState } from "../../reducer"
import { ICategories } from "../Categories/types"

import { Category, CategoryCreateInput } from '../../__generated__/types'
import { CategoriesDocument, useCategories } from '../Categories/queries/__generated__/Categories'
import { useCreateOneCategory } from '../Categories/mutations/__generated__/CreateOneCategory'

type PropsCategoryAddForm = {
  setIsOpenAddCategoryModal: (isOpen: Boolean) => void
  isOpenAddCategoryModal: Boolean
}

const CategoryAddForm: React.FC<PropsCategoryAddForm> = (
  {
    setIsOpenAddCategoryModal,
    isOpenAddCategoryModal
  }) => {
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

  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const [values, setValues] = useState<Category | any>({})

  if (cat_loading) {
    return (<div>Loading...</div>)
  }
  if (cat_error || !cat_data) {
    return (<div>Error...</div>)
  }
  const { categories } = cat_data

  // @ts-ignore
  // const categoriesAllWithoutRecycleBin = categories?.filter((category: Category) => {
  //   return category._id !== REACT_APP_RECYCLE_BIN_ID
  // })

  const onFinish = (valuefromformlist: Category) => {
    const { icon, description, images, url, name } = values
    // const _id = String(values._id)
    // const name = String(valuefromformlist.name)
    console.log("++++++++++++",
      valuefromformlist
    )
    console.log("+++V+++V++++++",
      values
    )

    createOneCategory({
      variables: {
        data: {
          name,
          description,
          url,
          icon,
          images,
          parent: valuefromformlist.parent
        }
      }
    }).then((m: any) => console.log("addCategoryMESSAGE:", m))
      .catch((e: any) => console.log("addCategoryERROR:", e))

    setIsOpenAddCategoryModal(false)
  }
  const handleCancel = () => {
    setIsOpenAddCategoryModal(false)
  }

  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    console.log("target", e.target)
    setValues({ ...values, [name]: value })
  }

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
        onFinish={onFinish}>



        <Form.Item
          label="Name category"
          rules={[{ required: true, message: "Name category is required" }]}
        >
          <Input
            name="name"
            onChange={handleChange} placeholder="name category"
            style={{ width: "100%", marginRight: 8 }}/>
        </Form.Item>

        <Form.Item
          label="Description category"
        >
          <Input
            name="description"
            onChange={handleChange} placeholder="Description category"
            style={{ width: "100%", marginRight: 8 }}/>
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
            {categories?.map((category: Category) =>
              <Select.Option
                key={String(category.id)}
                value={String(category.id)}
              >{category.id}
              </Select.Option>
            )
            }
          </Select>
        </Form.Item>

        <Form.List name="icons">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "icons" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input icon url or delete this field."
                        }
                      ]}
                      noStyle
                    >
                      <Input
                        style={{ width: "90%", marginRight: 8 }}/>
                    </Form.Item>

                    {(fields.length >= 1) ? (
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
                    style={{ width: "80%" }}
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
                    label={index === 0 ? "Images" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input image url or delete this field."
                        }
                      ]}
                      noStyle
                    >
                      <Input
                        style={{ width: "90%", marginRight: 8 }}/>
                    </Form.Item>

                    {(fields.length >= 1) ? (
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
                    style={{ width: "80%" }}
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
  isOpenAddCategoryModal: Boolean
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenAddCategoryModal: state.add_cat_modal.isOpen
})

export default connect<typeof CategoryAddForm>(
  // TODO:
// @ts-ignore
  mapStateToProps,
  { setIsOpenAddCategoryModal }
)(CategoryAddForm)