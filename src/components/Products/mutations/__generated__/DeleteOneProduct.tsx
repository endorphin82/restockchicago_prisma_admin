import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DeleteOneProductVariables = {
  where: Types.ProductWhereUniqueInput;
};


export type DeleteOneProduct = (
  { __typename: 'Mutation' }
  & { deleteOneProduct?: Types.Maybe<(
    { __typename: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img'>
    & { images: Array<(
      { __typename: 'ImageProd' }
      & Pick<Types.ImageProd, 'id' | 'url'>
    )>, categories: Array<(
      { __typename: 'Category' }
      & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon'>
      & { images: Array<(
        { __typename: 'ImageCat' }
        & Pick<Types.ImageCat, 'id' | 'url'>
      )> }
    )> }
  )> }
);


export const DeleteOneProductDocument = gql`
    mutation DeleteOneProduct($where: ProductWhereUniqueInput!) {
  deleteOneProduct(where: $where) {
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
      description
      url
      parent
      icon
      images {
        id
        url
      }
    }
  }
}
    `;
export type DeleteOneProductMutationFn = ApolloReactCommon.MutationFunction<DeleteOneProduct, DeleteOneProductVariables>;

/**
 * __useDeleteOneProduct__
 *
 * To run a mutation, you first call `useDeleteOneProduct` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneProduct` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneProduct, { data, loading, error }] = useDeleteOneProduct({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneProduct(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneProduct, DeleteOneProductVariables>) {
        return ApolloReactHooks.useMutation<DeleteOneProduct, DeleteOneProductVariables>(DeleteOneProductDocument, baseOptions);
      }
export type DeleteOneProductHookResult = ReturnType<typeof useDeleteOneProduct>;
export type DeleteOneProductMutationResult = ApolloReactCommon.MutationResult<DeleteOneProduct>;
export type DeleteOneProductMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneProduct, DeleteOneProductVariables>;