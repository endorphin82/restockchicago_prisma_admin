import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CategoriesVariables = {};


export type Categories = (
  { __typename: 'Query' }
  & { categories: Array<(
    { __typename: 'Category' }
    & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon' | 'img'>
    & { products: Array<(
      { __typename: 'Product' }
      & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img' | 'description'>
      & { categories: Array<(
        { __typename: 'Category' }
        & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon' | 'img'>
      )> }
    )> }
  )> }
);


export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
    description
    url
    parent
    icon
    img
    products {
      id
      name
      price
      icon
      img
      description
      categories {
        id
        name
        description
        url
        parent
        icon
        img
      }
    }
  }
}
    `;

/**
 * __useCategories__
 *
 * To run a query within a React component, call `useCategories` and pass it any options that fit your needs.
 * When your component renders, `useCategories` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategories({
 *   variables: {
 *   },
 * });
 */
export function useCategories(baseOptions?: ApolloReactHooks.QueryHookOptions<Categories, CategoriesVariables>) {
        return ApolloReactHooks.useQuery<Categories, CategoriesVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Categories, CategoriesVariables>) {
          return ApolloReactHooks.useLazyQuery<Categories, CategoriesVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesHookResult = ReturnType<typeof useCategories>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<Categories, CategoriesVariables>;