import { GraphQLClient } from 'graphql-request';
import { GetCookie } from 'utils/cookie';

// react_query parameter  -> api middleware branch
export const tokenClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_TOKEN_END_POINT}`); // create token client
export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_END_POINT}`); // users client
export const adminClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_ADMIN_END_POINT}`); // manage client

export const token = GetCookie();
export const headers = {
    authorization: `Bearer ${token}`,
};

export const option = {
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    // onSettled: () => {
    //         //refetch
    //     queryClient?.invalidateQueries(["RepositoryNameQuery"]);
    // },
};

// export const queryClient = useQueryClient();
