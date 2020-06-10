import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateOneCategoryVariables = {
  data: Types.CategoryUpdateInput;
  where: Types.CategoryWhereUniqueInput;
};


export type UpdateOneCategory = (
  { __typename: 'Mutation' }
  & { updateOneCategory?: Types.Maybe<(
    { __typename: 'Category' }
    & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon'>
    & { images: Array<(
      { __typename: 'ImageCat' }
      & Pick<Types.ImageCat, 'id' | 'url'>
    )>, products: Array<(
      { __typename: 'Product' }
      & Pick<Types.Product, 'id' | 'name' | 'price' | 'icon'>
      & { images: Array<(
        { __typename: 'ImageProd' }
        & Pick<Types.ImageProd, 'id' | 'url'>
      )> }
    )> }
  )> }
);


export const UpdateOneCategoryDocument = gql`
    mutation UpdateOneCategory($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {
  updateOneCategory(data: $data, where: $where) {
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
    products {
      id
      name
      price
      icon
      images {
        id
        url
      }
    }
  }
}
    `;
export type UpdateOneCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateOneCategory, UpdateOneCategoryVariables>;

/**
 * __useUpdateOneCategory__
 *
 * To run a mutation, you first call `useUpdateOneCategory` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCategory` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCategory, { data, loading, error }] = useUpdateOneCategory({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneCategory(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneCategory, UpdateOneCategoryVariables>) {
        return ApolloReactHooks.useMutation<UpdateOneCategory, UpdateOneCategoryVariables>(UpdateOneCategoryDocument, baseOptions);
      }
export type UpdateOneCategoryHookResult = ReturnType<typeof useUpdateOneCategory>;
export type UpdateOneCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateOneCategory>;
export type UpdateOneCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneCategory, UpdateOneCategoryVariables>;