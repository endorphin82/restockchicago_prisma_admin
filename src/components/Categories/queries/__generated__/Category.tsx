import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type categoryVariables = {
  where: Types.CategoryWhereUniqueInput;
};


export type category = (
  { __typename: 'Query' }
  & { category?: Types.Maybe<(
    { __typename: 'Category' }
    & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon' | 'img'>
    & { products: Array<(
      { __typename: 'Product' }
      & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img' | 'description'>
    )> }
  )> }
);


export const categoryDocument = gql`
    query category($where: CategoryWhereUniqueInput!) {
  category(where: $where) {
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
    }
  }
}
    `;

/**
 * __usecategory__
 *
 * To run a query within a React component, call `usecategory` and pass it any options that fit your needs.
 * When your component renders, `usecategory` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usecategory({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usecategory(baseOptions?: ApolloReactHooks.QueryHookOptions<category, categoryVariables>) {
        return ApolloReactHooks.useQuery<category, categoryVariables>(categoryDocument, baseOptions);
      }
export function usecategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<category, categoryVariables>) {
          return ApolloReactHooks.useLazyQuery<category, categoryVariables>(categoryDocument, baseOptions);
        }
export type categoryHookResult = ReturnType<typeof usecategory>;
export type categoryLazyQueryHookResult = ReturnType<typeof usecategoryLazyQuery>;
export type categoryQueryResult = ApolloReactCommon.QueryResult<category, categoryVariables>;