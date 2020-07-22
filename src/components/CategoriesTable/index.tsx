import React, { useState } from 'react'
import { Button, Modal, Table, Tooltip, Tag } from 'antd'
import { Category, Product } from '../../__generated__/types'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { editCategory } from '../../actions'
import { setIsOpenEditCategoryModal } from '../../actions'
import { connect } from 'react-redux'
import { useCategories, CategoriesDocument } from '../Categories/queries/__generated__/Categories'
import { useDeleteOneCategory } from '../Categories/mutations/__generated__/DeleteOneCategory'
import { REACT_APP_BASE_URL } from '../../actions/types'

const styleIconInTable = { width: '20px', height: '100%', marginRight: '10px' }
const styleImagesInTable = { width: '20px', height: '100%', marginRight: '10px' }

export interface PropsCategoryTable {
  editCategory: (product: Product | undefined) => void
  setIsOpenEditCategoryModal: (isOpen: Boolean | undefined) => void
}

const CategoriesTable: React.FC<any> = ({ editCategory, setIsOpenEditCategoryModal }) => {
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const [deleteOneCategory] = useDeleteOneCategory({
      refetchQueries: [{
        query: CategoriesDocument
      }]
    }
  )
  const [isVisualDeleteModal, setIsVisualDeleteModal] = useState<Boolean>(false)
  const [categoryDeleted, setCategoryDeleted] = useState<Category | any>({})
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

  const handleEdit = (id): void => {
    // @ts-ignore

    const cat = categories?.find((cat: Category) => cat.id === id)    //
    // @ts-ignore
    editCategory(cat)
    setIsOpenEditCategoryModal(true)
  }

  const handleDelete = (id: Number): void => {
    setIsVisualDeleteModal(true)
    // @ts-ignore
    setCategoryDeleted(categories.find((cat: Category) => cat.id === id))
  }

  const handleOk = (id: Number) => {
    deleteOneCategory({
      variables: {
        where: {
          id: Number(id)
        }
      }
    }).then((mess: any) => console.log('deleteCascadeCategoryWithProductsById response:', mess))
    setIsVisualDeleteModal(false)
  }

  const handleCancel = () => {
    setIsVisualDeleteModal(false)
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
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
      render: (parent: String) => {
        return parent ?
          <span>
          <Tag color="green" key={String(parent)}>{parent}</Tag>
        </span> : null
      }
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: String) => {
        return icon
          ? <div>
            <img
              key={String(icon)} alt="img"
              src={`${REACT_APP_BASE_URL}/images/${icon}`}
              style={styleIconInTable}/>
          </div>
          : <span>no icons</span>
      }
    },
    {
      title: 'Images',
      dataIndex: 'img',
      key: 'img',
      render: (img: String) => {
        let images = []
        if (img) {
          // @ts-ignore
          const imgs = JSON.parse(img)
          images = imgs.map((i: any) => i['name'])
        }
        return (images.length !== 0)
          ? <div>
            {
              images
                .map((image: string, index: number) => <img
                  key={String(`${image}+${index}`)}
                  alt="img"
                  src={`${REACT_APP_BASE_URL}/images/${image}`}
                  style={styleImagesInTable}/>
                )
            }
          </div>
          : <span>no images</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: 'id',
      render: (id: Number) => <>
        <Tooltip title="Edit this category">
          <Button onClick={() => handleEdit(id)}
                  type="dashed">
            Edit
          </Button>
        </Tooltip>
        <Tooltip
          title="Delete Category With All Products">
          <Button style={{ float: 'right' }}
                  onClick={() => handleDelete(Number(id))}
                  type="dashed"
                  danger
                  icon={<DeleteOutlined/>}>
          </Button>
        </Tooltip>
      </>
    }
  ]

  return (
    <>
      <Table dataSource={categories} columns={columns} rowKey="id"/>
      <Modal
        title="Delete Category With All Products WITHOUT recovery!?"
        visible={Boolean(isVisualDeleteModal)}
        onOk={() => handleOk(categoryDeleted._id)}
        onCancel={handleCancel}
      >
        <p>{categoryDeleted.name}</p>
      </Modal>
    </>
  )
}

export default connect<typeof CategoriesTable>(null, {
  editCategory, setIsOpenEditCategoryModal
})(CategoriesTable)
