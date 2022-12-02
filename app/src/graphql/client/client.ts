import { GraphQLClient } from 'graphql-request';
import { GetAdminCookie, GetCookie } from 'utils/cookie';

// react_query parameter  -> api middleware branch
export const tokenClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_TOKEN_END_POINT}`); // create token client
export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_END_POINT}`); // users client
export const adminClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_ADMIN_END_POINT}`); // manage client

export const option = {
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    // onSettled: () => {
    //     queryClient?.invalidateQueries(["RepositoryNameQuery"]);
    // },
};

type Headers = {
    authorization: string;
};

export function NewAdminHeader(): Headers {
    const token = GetAdminCookie();
    const headers = {
        authorization: `Bearer ${token}`,
    };
    return headers;
}

export function NewHeader(): Headers {
    const token = GetCookie();
    const headers = {
        authorization: `Bearer ${token}`,
    };
    return headers;
}
