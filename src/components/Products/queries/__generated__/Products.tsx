import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ProductsVariables = {};


export type Products = (
  { __typename: 'Query' }
  & { products: Array<(
    { __typename: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img'>
    & { categories: Array<(
      { __typename: 'Category' }
      & Pick<Types.Category, 'id' | 'name' | 'parent' | 'url' | 'description' | 'icon'>
      & { images: Array<(
        { __typename: 'ImageCat' }
        & Pick<Types.ImageCat, 'id' | 'url'>
      )> }
    )> }
  )> }
);


export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    price
    icon
    img
    categories {
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
 * __useProducts__
 *
 * To run a query within a React component, call `useProducts` and pass it any options that fit your needs.
 * When your component renders, `useProducts` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProducts({
 *   variables: {
 *   },
 * });
 */
export function useProducts(baseOptions?: ApolloReactHooks.QueryHookOptions<Products, ProductsVariables>) {
        return ApolloReactHooks.useQuery<Products, ProductsVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Products, ProductsVariables>) {
          return ApolloReactHooks.useLazyQuery<Products, ProductsVariables>(ProductsDocument, baseOptions);
        }
export type ProductsHookResult = ReturnType<typeof useProducts>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = ApolloReactCommon.QueryResult<Products, ProductsVariables>;