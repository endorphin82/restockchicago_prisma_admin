import React from 'react'
import { Empty, Tabs } from 'antd'
import Products from '../Products'

import Categories from '../Categories'

import { connect } from 'react-redux'
import { categoriesList } from '../../actions'
import { useCategories } from '../Categories/queries/__generated__/Categories'
import { Category } from '../../__generated__/types'
import { useProductsByNameAndCategoryIds } from '../Products/queries/__generated__/ProductsByNameAndCategoryIds'

const { TabPane } = Tabs

function callback(key: any) {
  console.log(key)
}

interface Props {
  categoriesList: (categories: Category[] | undefined) => void
}

const TabsContainer: React.FC<any> = ({ categoriesList }) => {
  const { loading: cat_loading, error: cat_error, data: cat_data } = useCategories()
  const { loading: prod_loading, error: prod_error, data: prod_data } = useProductsByNameAndCategoryIds({
    variables: { name: '' }
  })
  // const { loading: recycle_bin_prod_loading, error: recycle_bin_prod_error, data: recycle_bin_prod_data } = useProductsByCategoryId({
  //   variables: {
  //     id: REACT_APP_RECYCLE_BIN_ID
  //   }
  // })
  // const { loading: recycle_bin_cat_loading, error: recycle_bin_cat_error, data: recycle_bin_cat_data } = useCategoryById({
  //   variables: {
  //     _id: REACT_APP_RECYCLE_BIN_ID
  //   }
  // })

  if (cat_loading || prod_loading) {
    return (<div>Loading...</div>)
  }
  if (cat_error || prod_error || !cat_data || !prod_data) {
    return (<div>Error.</div>)
  }

  // const { productsByCategoryId } = recycle_bin_prod_data
  // const { categoryById } = recycle_bin_cat_data
  const { categories } = cat_data
  // @ts-ignore
  // const categoriesAllWithoutRecycleBin = categories?.map((category: Category) => {
  //   if (category.id !== REACT_APP_RECYCLE_BIN_ID) {
  //     return category.name
  //   }
  // }).filter(Boolean)

  categoriesList(categories)
  console.log('categoriesList(categories)', categories)
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <Tabs.TabPane tab="Products" key="1">
        <Products/>
      </Tabs.TabPane>
      <TabPane tab="Categories" key="2">
        <Categories/>
      </TabPane>
      {/*<TabPane tab={*/}
      {/*  <span>*/}
      {/*    <RecycleBinIcon*/}
      {/*      // TODO:*/}
      {/*      // @ts-ignore*/}
      {/*      categoryById={categoryById} productsByCategoryId={productsByCategoryId}/>*/}
      {/*    Recycle bin*/}
      {/*  </span>*/}
      {/*} key="3">*/}
      {/*  {(productsByCategoryId?.length === 0) ? <Empty/> : <RecycleBin/>}*/}
      {/*</TabPane>*/}

    </Tabs>
  )
}

export default connect<typeof TabsContainer>(null, { categoriesList })(TabsContainer)
