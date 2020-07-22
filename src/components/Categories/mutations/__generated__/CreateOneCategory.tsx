import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateOneCategoryVariables = {
  data: Types.CategoryCreateInput;
};


export type CreateOneCategory = (
  { __typename: 'Mutation' }
  & { createOneCategory: (
    { __typename: 'Category' }
    & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon' | 'img'>
    & { products: Array<(
      { __typename: 'Product' }
      & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon' | 'img'>
    )> }
  ) }
);


export const CreateOneCategoryDocument = gql`
    mutation CreateOneCategory($data: CategoryCreateInput!) {
  createOneCategory(data: $data) {
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
    }
  }
}
    `;
export type CreateOneCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateOneCategory, CreateOneCategoryVariables>;

/**
 * __useCreateOneCategory__
 *
 * To run a mutation, you first call `useCreateOneCategory` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCategory` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneCategory, { data, loading, error }] = useCreateOneCategory({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneCategory(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneCategory, CreateOneCategoryVariables>) {
        return ApolloReactHooks.useMutation<CreateOneCategory, CreateOneCategoryVariables>(CreateOneCategoryDocument, baseOptions);
      }
export type CreateOneCategoryHookResult = ReturnType<typeof useCreateOneCategory>;
export type CreateOneCategoryMutationResult = ApolloReactCommon.MutationResult<CreateOneCategory>;
export type CreateOneCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneCategory, CreateOneCategoryVariables>;