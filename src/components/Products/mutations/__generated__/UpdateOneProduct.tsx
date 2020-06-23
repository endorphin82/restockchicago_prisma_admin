import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateOneProductVariables = {
  data: Types.ProductUpdateInput;
  where: Types.ProductWhereUniqueInput;
};


export type UpdateOneProduct = (
  { __typename: 'Mutation' }
  & { updateOneProduct?: Types.Maybe<(
    { __typename: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon'>
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


export const UpdateOneProductDocument = gql`
    mutation UpdateOneProduct($data: ProductUpdateInput!, $where: ProductWhereUniqueInput!) {
  updateOneProduct(data: $data, where: $where) {
    id
    name
    price
    icon
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
export type UpdateOneProductMutationFn = ApolloReactCommon.MutationFunction<UpdateOneProduct, UpdateOneProductVariables>;

/**
 * __useUpdateOneProduct__
 *
 * To run a mutation, you first call `useUpdateOneProduct` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneProduct` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneProduct, { data, loading, error }] = useUpdateOneProduct({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneProduct(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneProduct, UpdateOneProductVariables>) {
        return ApolloReactHooks.useMutation<UpdateOneProduct, UpdateOneProductVariables>(UpdateOneProductDocument, baseOptions);
      }
export type UpdateOneProductHookResult = ReturnType<typeof useUpdateOneProduct>;
export type UpdateOneProductMutationResult = ApolloReactCommon.MutationResult<UpdateOneProduct>;
export type UpdateOneProductMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneProduct, UpdateOneProductVariables>;