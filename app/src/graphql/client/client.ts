import { GraphQLClient } from 'graphql-request';
import nookie from 'nookies';

// react_query parameter
export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_END_POINT}`);
export const adminClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_ADMIN_END_POINT}`);
export const tokenClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_TOKEN_END_POINT}`);

export const token = nookie.get(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
export const headers = {
    authorization: `Bearer ${token[process.env.NEXT_PUBLIC_COOKIE_KEY!]}`,
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
