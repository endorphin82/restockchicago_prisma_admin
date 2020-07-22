import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { REACT_APP_BASE_URL } from '../actions/types'
import ImageCard from './ImageCard'
import RLDD from 'react-list-drag-and-drop/lib/RLDD'
import { Empty } from 'antd'


const ImageTable = ({ isOpenEditProductModal, editedItem, setPayloadEditItem }) => {
  const [items, setNewOrderedItems] = useState([])
  const [delFileNames, setDelFileNames] = useState([])
  useEffect(() => {
    setPayloadEditItem(JSON.stringify({
        img: items.map(({ pos, name }) => ({ pos, name })),
        del: [...delFileNames]
      })
    )
  }, [items, delFileNames])
  useEffect(() => {
      setNewOrderedItems([...(!editedItem.img) ? [] : JSON.parse(editedItem?.img)?.map((i, ind) => {
          return {
            id: Number(i.pos),
            pos: ind,
            name: i.name
          }
        })]
      )
    }
    , [editedItem])
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
    setNewOrderedItems(items => items.map(it => {
      if (it.id === id) {
        setDelFileNames([...delFileNames, it.name])
        return it
      }
      return it
    })
      .filter((i) => i.id != id)
      .map(
        (i, ind) => ({
          id: i.id,
          pos: ind,
          name: i.name
        })
      ))
  }

  return (items.length === 0) ? <Empty description="No Images"/> :
    (!editedItem || !isOpenEditProductModal)
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
  isOpenEditProductModal: state.edit_product_modal.isOpen
})

export default connect(
// @ts-ignore
  mapStateToProps
)(ImageTable)
