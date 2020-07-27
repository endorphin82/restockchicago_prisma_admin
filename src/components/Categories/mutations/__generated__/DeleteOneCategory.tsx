import * as Types from '../../../../__generated__/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DeleteOneCategoryVariables = {
  where: Types.CategoryWhereUniqueInput;
};


export type DeleteOneCategory = (
  { __typename: 'Mutation' }
  & { deleteOneCategory: (
    { __typename: 'Category' }
    & Pick<Types.Category, 'id' | 'name' | 'description' | 'url' | 'parent' | 'icon' | 'img'>
  ) }
);


export const DeleteOneCategoryDocument = gql`
    mutation DeleteOneCategory($where: CategoryWhereUniqueInput!) {
  deleteOneCategory(where: $where) {
    id
    name
    description
    url
    parent
    icon
    img
  }
}
    `;
export type DeleteOneCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteOneCategory, DeleteOneCategoryVariables>;

/**
 * __useDeleteOneCategory__
 *
 * To run a mutation, you first call `useDeleteOneCategory` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCategory` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneCategory, { data, loading, error }] = useDeleteOneCategory({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneCategory(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneCategory, DeleteOneCategoryVariables>) {
        return ApolloReactHooks.useMutation<DeleteOneCategory, DeleteOneCategoryVariables>(DeleteOneCategoryDocument, baseOptions);
      }
export type DeleteOneCategoryHookResult = ReturnType<typeof useDeleteOneCategory>;
export type DeleteOneCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteOneCategory>;
export type DeleteOneCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneCategory, DeleteOneCategoryVariables>;