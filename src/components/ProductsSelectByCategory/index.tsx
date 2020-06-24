import React from "react"
import { Select } from "antd"
import { RootState } from "../../reducer"
import { connect } from "react-redux"
import { Category } from '../../__generated__/types'

const { Option } = Select

interface Props {
  categories: String[] | [] | any
  handleChange: (e: any) => any
  searchCategories: String[] | [] | undefined
}

const ProductsSelectByCategory: React.FC<any> = ({ categories, handleChange, searchCategories }) => {
  console.log("categories",categories)

  return (
    <Select
      mode="multiple"
      // @ts-ignore
      defaultValue={searchCategories.length === categories.length ? [] : searchCategories}
      style={{ width: "30%" }}
      placeholder="Please select categories"
      // @ts-ignore
      onChange={(value: Number[]) => {
        // if categories empty, search all categories
        return value?.length === 0 ?
          handleChange(categories.map((cat: Category) => cat.id))
          :
          handleChange(value)
      }}
    >
      {categories?.map((cat: Category) => {
          // @ts-ignore
        return <Option
            // @ts-ignore
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
  searchCategories: String[]
}

const mapStateToProps = (state: RootState): StateProps => ({
  categories: state.categories_list.categories,
  searchCategories: state.search_categories_list.searchCategories
})

export default connect<typeof ProductsSelectByCategory>(
// @ts-ignore
  mapStateToProps
)(ProductsSelectByCategory)
