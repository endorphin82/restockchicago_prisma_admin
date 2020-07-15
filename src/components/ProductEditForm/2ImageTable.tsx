import React from 'react'
import { connect } from 'react-redux'
import { Product } from '../../__generated__/types'
import { RootState } from '../../reducer'
import { Button, Table, Tooltip } from 'antd'
import { REACT_APP_BASE_URL } from '../../actions/types'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import ImageCard from './ImageCard'


const ImageTable: React.FC<any> = ({ isOpenEditProductModal, edited_product }) => {
  const onDragStartHandler = (e: any) => {
    e.target.classList.add(`selected`)
    console.log('dragS', e)
  }

  const onDragEndHandler = (e: any) => {
    e.target.classList.remove(`selected`)
    console.log('dragEnd', e)
  }

  const getNextElement = (cursorPosition: any, currentElement: any) => {
    const currentElementCoord = currentElement.getBoundingClientRect()
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2

    const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling

    return nextElement
  }

  const onDragOverHandler = (e: any) => {
    e.preventDefault()
    // @ts-ignore
    const activeElement = document.querySelector(`.image__list`)?.querySelector(`.selected`)
    const currentElement = e.target
    const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`images__item`)
// console.log('activeElement', activeElement)
    console.log("+++", e.clientY)
    console.log('activeElement',isMoveable, activeElement?.classList.contains(`images__item`))

    if (!isMoveable) {
      // console.log('activeElement',isMoveable, activeElement)
      return
    }
    const nextElement = getNextElement(e.clientY, currentElement)

    if (
      nextElement &&
      activeElement === nextElement.previousElementSibling ||
      activeElement === nextElement
    ) {
      return
    }

    // @ts-ignore
    document.querySelector(`.image__list`).insertBefore(activeElement, nextElement)
  }

  return (!edited_product || !isOpenEditProductModal)
    ? <div>Load..</div>
    : <ul className="image__list"
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onDragOver={onDragOverHandler}
    >
      {
        JSON.parse(edited_product?.img).map((i: any) => <li draggable className="images__item">
          <ImageCard
            style={{ width: '48px', height: '100%' }}
            key={String(`${i.name}`)}
            pos={i.pos}
            src={`${REACT_APP_BASE_URL}/images/${i.name}`}
            alt={i.name}/>
        </li>)
      }
    </ul>
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
