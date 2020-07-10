import React from 'react'
import { priceToDollars } from '../../utils/utils'
import { Button, Table, Tooltip, Tag } from 'antd'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { Products } from '../Products/queries/__generated__/Products'
import { Category } from '../../__generated__/types'
import { REACT_APP_BASE_URL } from '../../actions/types'

const styleImagesInTable = { width: '50px', height: '100%', marginRight: '10px' }

interface PropsProductsTableAntd {
  handleEditProp: (id: Number) => void
  handleDeleteProp: (id: Number) => void
  productsProp: Products
}

const ProductsTableAntd: React.FC<PropsProductsTableAntd> = ({ handleEditProp, handleDeleteProp, productsProp }) => {
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: Number) => {
        return priceToDollars(price)
      }
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories: Category[]) => {
        return (categories) ?
          (<span>
            {
              categories
                .map((category) =>
                  <span>
                    <Tag color="blue" key={String(category?.name)}>
                      {category?.name}
                    </Tag>
                  </span>)
            }
          </span>) : (<span>no cat</span>)
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
        <Tooltip title="Edit this product">
          <Button onClick={() => handleEditProp(id)}
                  type="dashed">
            Edit
          </Button>
        </Tooltip>
        <Tooltip
          title="Delete">
          <Button style={{ float: 'right' }}
                  onClick={() => handleDeleteProp(id)}
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
      <Table
        // TODO:
        // @ts-ignore
        dataSource={productsProp}
        columns={columns}
        rowKey="id"/>
    </>
  )
}

export default ProductsTableAntd
