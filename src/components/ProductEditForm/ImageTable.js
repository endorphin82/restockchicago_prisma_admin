import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { REACT_APP_BASE_URL } from '../../actions/types'
import ImageCard from './ImageCard'
import RLDD from 'react-list-drag-and-drop/lib/RLDD'


const ImageTable = ({ isOpenEditProductModal, edited_product }) => {
  const [items, setNewOrderedItems] = useState([])
  useEffect(() => {
      setNewOrderedItems([...JSON.parse(edited_product?.img).map((i, ind) => {
          return {
            id: Number(i.pos),
            pos: ind,
            name: i.name
          }
        })]
      )
    }
    , [edited_product])
  const handleRLDDChange = (newItems) => {
    setNewOrderedItems(items => newItems.map(
      (i, ind) => ({
        id: Number(i.pos),
        pos: ind,
        name: i.name
      })
      )
    )
  }

  const onDelete = (ind) => {
    setNewOrderedItems(items => items.filter((i, index) => index != ind))
  }
  console.log('items', items)
  return (!edited_product || !isOpenEditProductModal)
    ? <div>Load..</div>
    : <RLDD onChange={handleRLDDChange}
            items={items}
            itemRenderer={
              (item, index) => {
                return <ImageCard
                  className="item"
                  style={{ width: '48px', height: '100%' }}
                  key={item.name}
                  pos={index}
                  handleDelete={onDelete}
                  src={`${REACT_APP_BASE_URL}/images/${item.name}`}
                  alt={item.name}/>
              }
            }
    />
}


const mapStateToProps = (state) => ({
  isOpenEditProductModal: state.edit_product_modal.isOpen,
  edited_product: state.edit_product.product
})

export default connect(
// @ts-ignore
  mapStateToProps
)(ImageTable)
