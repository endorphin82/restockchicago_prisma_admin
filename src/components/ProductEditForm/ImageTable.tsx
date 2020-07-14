import React from 'react'
import { connect } from 'react-redux'
import { Product } from '../../__generated__/types'
import { RootState } from '../../reducer'
import { Button, Table, Tooltip } from 'antd'
import { REACT_APP_BASE_URL } from '../../actions/types'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'

const columns = [
  {
    title: 'Position',
    dataIndex: 'pos',
    key: 'pos'
  },
  {
    title: 'Images',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => {
      return <img
        style={{ width: '50px', marginRight: '10px' }}
        key={String(`${name}`)}
        src={`${REACT_APP_BASE_URL}/images/${name}`}
        alt={name}/>
    }
  },
  {
    title: 'Action',
    dataIndex: 'pos',
    key: 'pos',
    render: (pos: Number) =>
      <Tooltip
        title="Delete">
        <Button style={{ float: 'right' }}
                onClick={() => console.log('delete image pos:', pos)}
                type="dashed"
                danger
                icon={<DeleteOutlined/>}>
        </Button>
      </Tooltip>

  }
]

const ImageTable: React.FC<any> = ({ isOpenEditProductModal, edited_product }) => {
  return (!edited_product || !isOpenEditProductModal)
    ? <div>Load..</div>
    : <Table
      pagination={false}
      // style={{ width: '120%' }}
      dataSource={JSON.parse(edited_product?.img)}
      columns={columns}/>

}

interface StateProps {
  isOpenEditProductModal: Boolean
  edited_product?: Product | {}
}

const mapStateToProps = (state: RootState): StateProps => ({
  isOpenEditProductModal: state.edit_product_modal.isOpen,
  edited_product: state.edit_product.product
})

export default connect<typeof ImageTable>(
// @ts-ignore
  mapStateToProps
)(ImageTable)
