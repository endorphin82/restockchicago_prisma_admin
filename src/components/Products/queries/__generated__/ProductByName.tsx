import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ProductByNameVariables = {
  name: Types.Scalars['String'];
};


export type ProductByName = (
  { __typename: 'Query' }
  & { productByName: (
    { __typename: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img'>
    & { images: Array<(
      { __typename: 'ImageProd' }
      & Pick<Types.ImageProd, 'id' | 'url'>
    )>, categories: Array<(
      { __typename: 'Category' }
      & Pick<Types.Category, 'id' | 'name' | 'parent' | 'url' | 'description' | 'icon'>
      & { images: Array<(
        { __typename: 'ImageCat' }
        & Pick<Types.ImageCat, 'id' | 'url'>
      )> }
    )> }
  ) }
);


export const ProductByNameDocument = gql`
    query ProductByName($name: String!) {
  productByName(name: $name) {
    id
    name
    price
    icon
    img
    images {
      id
      url
    }
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
 * __useProductByName__
 *
 * To run a query within a React component, call `useProductByName` and pass it any options that fit your needs.
 * When your component renders, `useProductByName` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductByName({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useProductByName(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductByName, ProductByNameVariables>) {
        return ApolloReactHooks.useQuery<ProductByName, ProductByNameVariables>(ProductByNameDocument, baseOptions);
      }
export function useProductByNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductByName, ProductByNameVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductByName, ProductByNameVariables>(ProductByNameDocument, baseOptions);
        }
export type ProductByNameHookResult = ReturnType<typeof useProductByName>;
export type ProductByNameLazyQueryHookResult = ReturnType<typeof useProductByNameLazyQuery>;
export type ProductByNameQueryResult = ApolloReactCommon.QueryResult<ProductByName, ProductByNameVariables>;