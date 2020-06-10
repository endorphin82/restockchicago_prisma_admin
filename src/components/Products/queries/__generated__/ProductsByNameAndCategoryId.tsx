import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ProductsByNameAndCategoryIdVariables = {
  name: Types.Scalars['String'];
  category_id: Types.Scalars['Int'];
};


export type ProductsByNameAndCategoryId = (
  { __typename: 'Query' }
  & { productsByNameAndCategoryId: Array<(
    { __typename: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon'>
    & { images: Array<(
      { __typename: 'ImageProd' }
      & Pick<Types.ImageProd, 'id' | 'url'>
    )>, category?: Types.Maybe<(
      { __typename: 'Category' }
      & Pick<Types.Category, 'id' | 'name' | 'parent' | 'url' | 'description' | 'icon'>
      & { images: Array<(
        { __typename: 'ImageCat' }
        & Pick<Types.ImageCat, 'id' | 'url'>
      )> }
    )> }
  )> }
);


export const ProductsByNameAndCategoryIdDocument = gql`
    query ProductsByNameAndCategoryId($name: String!, $category_id: Int!) {
  productsByNameAndCategoryId(name: $name, category_id: $category_id) {
    id
    name
    price
    icon
    images {
      id
      url
    }
    category {
      id
      name
      parent
      url
      description
      icon
      images {
        id
        url
      }
    }
  }
}
    `;

/**
 * __useProductsByNameAndCategoryId__
 *
 * To run a query within a React component, call `useProductsByNameAndCategoryId` and pass it any options that fit your needs.
 * When your component renders, `useProductsByNameAndCategoryId` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByNameAndCategoryId({
 *   variables: {
 *      name: // value for 'name'
 *      category_id: // value for 'category_id'
 *   },
 * });
 */
export function useProductsByNameAndCategoryId(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsByNameAndCategoryId, ProductsByNameAndCategoryIdVariables>) {
        return ApolloReactHooks.useQuery<ProductsByNameAndCategoryId, ProductsByNameAndCategoryIdVariables>(ProductsByNameAndCategoryIdDocument, baseOptions);
      }
export function useProductsByNameAndCategoryIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsByNameAndCategoryId, ProductsByNameAndCategoryIdVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsByNameAndCategoryId, ProductsByNameAndCategoryIdVariables>(ProductsByNameAndCategoryIdDocument, baseOptions);
        }
export type ProductsByNameAndCategoryIdHookResult = ReturnType<typeof useProductsByNameAndCategoryId>;
export type ProductsByNameAndCategoryIdLazyQueryHookResult = ReturnType<typeof useProductsByNameAndCategoryIdLazyQuery>;
export type ProductsByNameAndCategoryIdQueryResult = ApolloReactCommon.QueryResult<ProductsByNameAndCategoryId, ProductsByNameAndCategoryIdVariables>;