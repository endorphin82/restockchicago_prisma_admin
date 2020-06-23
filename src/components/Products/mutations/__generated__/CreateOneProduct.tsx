import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateOneProductVariables = {
  data: Types.ProductCreateInput;
};


export type CreateOneProduct = (
  { __typename: 'Mutation' }
  & { createOneProduct: (
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
  ) }
);


export const CreateOneProductDocument = gql`
    mutation CreateOneProduct($data: ProductCreateInput!) {
  createOneProduct(data: $data) {
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
export type CreateOneProductMutationFn = ApolloReactCommon.MutationFunction<CreateOneProduct, CreateOneProductVariables>;

/**
 * __useCreateOneProduct__
 *
 * To run a mutation, you first call `useCreateOneProduct` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneProduct` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneProduct, { data, loading, error }] = useCreateOneProduct({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneProduct(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneProduct, CreateOneProductVariables>) {
        return ApolloReactHooks.useMutation<CreateOneProduct, CreateOneProductVariables>(CreateOneProductDocument, baseOptions);
      }
export type CreateOneProductHookResult = ReturnType<typeof useCreateOneProduct>;
export type CreateOneProductMutationResult = ApolloReactCommon.MutationResult<CreateOneProduct>;
export type CreateOneProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneProduct, CreateOneProductVariables>;