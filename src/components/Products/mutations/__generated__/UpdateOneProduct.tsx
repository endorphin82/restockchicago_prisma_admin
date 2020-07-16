import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateOneProductVariables = {
  data: Types.ProductUpdateInput;
  files?: Types.Maybe<Array<Types.Scalars['Upload']>>;
  payloadEditProduct?: Types.Maybe<Types.Scalars['String']>;
  where: Types.ProductWhereUniqueInput;
};


export type UpdateOneProduct = (
  { __typename: 'Mutation' }
  & { updateOneProduct: (
    { __typename: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img'>
    & { categories: Array<(
      { __typename: 'Category' }
      & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon'>
    )> }
  ) }
);


export const UpdateOneProductDocument = gql`
    mutation UpdateOneProduct($data: ProductUpdateInput!, $files: [Upload!], $payloadEditProduct: String, $where: ProductWhereUniqueInput!) {
  updateOneProduct(data: $data, files: $files, payloadEditProduct: $payloadEditProduct, where: $where) {
    id
    name
    price
    icon
    img
    categories {
      id
      name
      description
      url
      parent
      icon
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
 *      files: // value for 'files'
 *      payloadEditProduct: // value for 'payloadEditProduct'
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