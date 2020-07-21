import React from 'react'
import { Select } from 'antd'
import { RootState } from '../../reducer'
import { connect } from 'react-redux'
import { Category } from '../../__generated__/types'

const { Option } = Select

interface Props {
  categories: Category[] | [] | any
  onChange: (e: any) => any
  searchCategoriesIds: Number[] | [] | undefined
}

const ProductsSelectByCategories: React.FC<any> = ({ categories, onChange, searchCategoriesIds }) => {
  return (
    <Select
      mode="multiple"
      // @ts-ignore
      defaultValue={searchCategoriesIds.length === categories.length ? [] : searchCategoriesIds}
      style={{ width: '30%' }}
      placeholder="Please select categories"
      // @ts-ignore
      onChange={(value: Number[]) => {
        // if categories empty, search all categories
        value.length === 0 ?
          onChange(categories.map((cat: Category) => Number(cat.id)))
          :
          onChange(value)
      }}
    >
      {categories?.map((cat: Category) => {
          // @ts-ignore
          return <Option
            // @ts-ignore
            value={Number(cat.id)}
            key={cat?.id}>
            {cat?.name}
          </Option>
        }
      )
      }
    </Select>
  )
}

interface StateProps {
  categories: String[]
  searchCategoriesIds: Number[]
}

const mapStateToProps = (state: RootState): StateProps => ({
  categories: state.categories_list.categories,
  searchCategoriesIds: state.search_categories_list_ids.searchCategoriesIds
})

export default connect<typeof ProductsSelectByCategories>(
// @ts-ignore
  mapStateToProps
)(ProductsSelectByCategories)
