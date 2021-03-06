import React, { useState } from 'react'
import { Button, Modal, Table, Tooltip, Tag } from 'antd'
import { Category } from '../../__generated__/types'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { editCategory } from '../../actions'
import { setIsOpenEditCategoryModal } from '../../actions'
import { connect } from 'react-redux'
import { CategoriesDocument } from '../Categories/queries/__generated__/Categories'
import { useDeleteOneCategory } from '../Categories/mutations/__generated__/DeleteOneCategory'
import { REACT_APP_BASE_URL } from '../../actions/types'
import { RootState } from '../../reducer'

const styleIconInTable = { width: '20px', height: '100%', marginRight: '10px' }
const styleImagesInTable = { width: '20px', height: '100%', marginRight: '10px' }

export interface PropsCategoryTable {
  editCategory: (category: Category | undefined) => void
  setIsOpenEditCategoryModal: (isOpen: Boolean | undefined) => void
}

const CategoriesTable: React.FC<any> = (
  {
    categoryList, editCategory, setIsOpenEditCategoryModal
  }) => {
  const [deleteOneCategory] = useDeleteOneCategory({
    refetchQueries: [{
      query: CategoriesDocument
    }]
  })
  const [isVisualDeleteModal, setIsVisualDeleteModal] = useState<Boolean>(false)
  const [categoryDeleted, setCategoryDeleted] = useState<Category | any>({})

  const handleEdit = (id: number): void => {
    console.log('id', id)
    // @ts-ignore
    const cat = categoryList?.find((cat: Category) => cat.id === id)
    editCategory(cat)
    setIsOpenEditCategoryModal(true)
  }

  const handleDelete = (id: Number): void => {
    setIsVisualDeleteModal(true)
    // @ts-ignore
    setCategoryDeleted(categoryList.find((cat: Category) => cat.id === id))
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
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
          <Tag color="gold" key={String(parent)}>{categoryList.find(
            (cat: Category) => Number(cat?.id) == Number(parent)).name}
          </Tag>
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
      dataIndex: 'id',
      key: 'id',
      render: (id: Number) => <>
        <Tooltip title="Edit this category">
          <Button onClick={() => handleEdit(Number(id))}
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
      <Table dataSource={categoryList} columns={columns} rowKey="id"/>
      <Modal
        title="Delete Category With All Products WITHOUT recovery!?"
        visible={Boolean(isVisualDeleteModal)}
        onOk={() => handleOk(categoryDeleted.id)}
        onCancel={handleCancel}
      >
        <p>{categoryDeleted.name}</p>
      </Modal>
    </>
  )
}

interface StateProps {
  categoryList?: Category | {}
}

const mapStateToProps = (state: RootState): StateProps => ({
  categoryList: state.categories_list.categories
})

export default connect<typeof CategoriesTable>(
// @ts-ignore
  mapStateToProps, {
    editCategory, setIsOpenEditCategoryModal
  })(CategoriesTable)
