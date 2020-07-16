import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { REACT_APP_BASE_URL } from '../../actions/types'
import ImageCard from './ImageCard'
import RLDD from 'react-list-drag-and-drop/lib/RLDD'
import { Empty } from 'antd'
import { setPayloadEditProduct } from '../../actions'

const ImageTable = ({ isOpenEditProductModal, edited_product, setPayloadEditProduct }) => {
  const [items, setNewOrderedItems] = useState([])
  const [delFileNames, setDelFileNames] = useState([])
  useEffect(() => {
    setPayloadEditProduct(JSON.stringify({
        img: items.map(({ pos, name }) => ({ pos, name })),
        del: [...delFileNames]
      })
    )
  }, [items, delFileNames])
  useEffect(() => {
      setNewOrderedItems([...(!edited_product.img) ? [] : JSON.parse(edited_product?.img)?.map((i, ind) => {
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
        id: i.id,
        pos: ind,
        name: i.name
      })
      )
    )
  }

  const onDelete = (id) => {
    setNewOrderedItems(items => items.filter((i) => {
      setDelFileNames( [...delFileNames, i.name])
      return i.id != id
    }).map(
      (i, ind) => ({
        id: i.id,
        pos: ind,
        name: i.name
      })
    ))
  }
  console.log('items', items)
  console.log('delFileNames', delFileNames)
  return (items.length === 0) ? <Empty description="No Images"/> :
    (!edited_product || !isOpenEditProductModal)
      ? <div>Load..</div>
      : <RLDD cssClasses='image__list'
              onChange={handleRLDDChange}
              items={items}
              itemRenderer={
                (item, index) => {
                  return <ImageCard
                    className="item"
                    style={{ width: '48px', height: '100%' }}
                    key={item.name}
                    pos={item.pos}
                    id={item.id}
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
  mapStateToProps, { setPayloadEditProduct }
)(ImageTable)
