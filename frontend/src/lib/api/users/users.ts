/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Shopping List API
 * Endpoints for interacting with the shopping list application
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import type {
  NinjaCrudViewsListViewListUsersParams,
  PagedUserOut,
  RegEnabledSchema,
  TokenObtainPair,
  TokenObtainPairOut,
  TokenRefreshInputSchema,
  TokenRefreshPairOut,
  UserIn,
  UserOut,
  UserUpdate,
} from "../model";
import { customInstance } from "../mutator/custom-instance";
import type { ErrorType } from "../mutator/custom-instance";

/**
 * @summary Create user
 */
export const apiViewsUserRegisterUser = (userIn: UserIn) => {
  return customInstance<UserOut>({
    url: `/api/users/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userIn,
  });
};

export const getApiViewsUserRegisterUserMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserRegisterUser>>,
    TError,
    { data: UserIn },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiViewsUserRegisterUser>>,
  TError,
  { data: UserIn },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiViewsUserRegisterUser>>,
    { data: UserIn }
  > = (props) => {
    const { data } = props ?? {};

    return apiViewsUserRegisterUser(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ApiViewsUserRegisterUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof apiViewsUserRegisterUser>>
>;
export type ApiViewsUserRegisterUserMutationBody = UserIn;
export type ApiViewsUserRegisterUserMutationError = ErrorType<unknown>;

/**
 * @summary Create user
 */
export const useApiViewsUserRegisterUser = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserRegisterUser>>,
    TError,
    { data: UserIn },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof apiViewsUserRegisterUser>>,
  TError,
  { data: UserIn },
  TContext
> => {
  const mutationOptions = getApiViewsUserRegisterUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary List Users
 */
export const ninjaCrudViewsListViewListUsers = (
  params?: NinjaCrudViewsListViewListUsersParams,
  signal?: AbortSignal
) => {
  return customInstance<PagedUserOut>({
    url: `/api/users/`,
    method: "GET",
    params,
    signal,
  });
};

export const getNinjaCrudViewsListViewListUsersQueryKey = (params?: NinjaCrudViewsListViewListUsersParams) => {
  return [`/api/users/`, ...(params ? [params] : [])] as const;
};

export const getNinjaCrudViewsListViewListUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: NinjaCrudViewsListViewListUsersParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>, TError, TData>;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getNinjaCrudViewsListViewListUsersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>> = ({ signal }) =>
    ninjaCrudViewsListViewListUsers(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type NinjaCrudViewsListViewListUsersQueryResult = NonNullable<
  Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>
>;
export type NinjaCrudViewsListViewListUsersQueryError = ErrorType<unknown>;

/**
 * @summary List Users
 */

export function useNinjaCrudViewsListViewListUsers<
  TData = Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: NinjaCrudViewsListViewListUsersParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getNinjaCrudViewsListViewListUsersQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getNinjaCrudViewsListViewListUsersSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: NinjaCrudViewsListViewListUsersParams,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
      TError,
      TData
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getNinjaCrudViewsListViewListUsersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>> = ({ signal }) =>
    ninjaCrudViewsListViewListUsers(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type NinjaCrudViewsListViewListUsersSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>
>;
export type NinjaCrudViewsListViewListUsersSuspenseQueryError = ErrorType<unknown>;

/**
 * @summary List Users
 */

export function useNinjaCrudViewsListViewListUsersSuspense<
  TData = Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
  TError = ErrorType<unknown>,
>(
  params?: NinjaCrudViewsListViewListUsersParams,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof ninjaCrudViewsListViewListUsers>>,
      TError,
      TData
    >;
  }
): UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getNinjaCrudViewsListViewListUsersSuspenseQueryOptions(params, options);

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary New Token
 */
export const apiViewsUserNewToken = (tokenObtainPair: TokenObtainPair) => {
  return customInstance<TokenObtainPairOut>({
    url: `/api/users/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: tokenObtainPair,
  });
};

export const getApiViewsUserNewTokenMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserNewToken>>,
    TError,
    { data: TokenObtainPair },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiViewsUserNewToken>>,
  TError,
  { data: TokenObtainPair },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiViewsUserNewToken>>,
    { data: TokenObtainPair }
  > = (props) => {
    const { data } = props ?? {};

    return apiViewsUserNewToken(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ApiViewsUserNewTokenMutationResult = NonNullable<Awaited<ReturnType<typeof apiViewsUserNewToken>>>;
export type ApiViewsUserNewTokenMutationBody = TokenObtainPair;
export type ApiViewsUserNewTokenMutationError = ErrorType<unknown>;

/**
 * @summary New Token
 */
export const useApiViewsUserNewToken = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserNewToken>>,
    TError,
    { data: TokenObtainPair },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof apiViewsUserNewToken>>,
  TError,
  { data: TokenObtainPair },
  TContext
> => {
  const mutationOptions = getApiViewsUserNewTokenMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Reg Enabled
 */
export const apiViewsUserRegEnabled = (signal?: AbortSignal) => {
  return customInstance<RegEnabledSchema>({
    url: `/api/users/reg_enabled`,
    method: "GET",
    signal,
  });
};

export const getApiViewsUserRegEnabledQueryKey = () => {
  return [`/api/users/reg_enabled`] as const;
};

export const getApiViewsUserRegEnabledQueryOptions = <
  TData = Awaited<ReturnType<typeof apiViewsUserRegEnabled>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof apiViewsUserRegEnabled>>, TError, TData>;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getApiViewsUserRegEnabledQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof apiViewsUserRegEnabled>>> = ({ signal }) =>
    apiViewsUserRegEnabled(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof apiViewsUserRegEnabled>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ApiViewsUserRegEnabledQueryResult = NonNullable<
  Awaited<ReturnType<typeof apiViewsUserRegEnabled>>
>;
export type ApiViewsUserRegEnabledQueryError = ErrorType<unknown>;

/**
 * @summary Reg Enabled
 */

export function useApiViewsUserRegEnabled<
  TData = Awaited<ReturnType<typeof apiViewsUserRegEnabled>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof apiViewsUserRegEnabled>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getApiViewsUserRegEnabledQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getApiViewsUserRegEnabledSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof apiViewsUserRegEnabled>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiViewsUserRegEnabled>>, TError, TData>;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getApiViewsUserRegEnabledQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof apiViewsUserRegEnabled>>> = ({ signal }) =>
    apiViewsUserRegEnabled(signal);

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof apiViewsUserRegEnabled>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ApiViewsUserRegEnabledSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof apiViewsUserRegEnabled>>
>;
export type ApiViewsUserRegEnabledSuspenseQueryError = ErrorType<unknown>;

/**
 * @summary Reg Enabled
 */

export function useApiViewsUserRegEnabledSuspense<
  TData = Awaited<ReturnType<typeof apiViewsUserRegEnabled>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiViewsUserRegEnabled>>, TError, TData>;
}): UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getApiViewsUserRegEnabledSuspenseQueryOptions(options);

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Get the current authenticated user.
 * @summary Get current user
 */
export const apiViewsUserGetCurrentUser = (signal?: AbortSignal) => {
  return customInstance<UserOut>({
    url: `/api/users/me`,
    method: "GET",
    signal,
  });
};

export const getApiViewsUserGetCurrentUserQueryKey = () => {
  return [`/api/users/me`] as const;
};

export const getApiViewsUserGetCurrentUserQueryOptions = <
  TData = Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>, TError, TData>;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getApiViewsUserGetCurrentUserQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>> = ({ signal }) =>
    apiViewsUserGetCurrentUser(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ApiViewsUserGetCurrentUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>
>;
export type ApiViewsUserGetCurrentUserQueryError = ErrorType<unknown>;

/**
 * @summary Get current user
 */

export function useApiViewsUserGetCurrentUser<
  TData = Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getApiViewsUserGetCurrentUserQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getApiViewsUserGetCurrentUserSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>, TError, TData>;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getApiViewsUserGetCurrentUserQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>> = ({ signal }) =>
    apiViewsUserGetCurrentUser(signal);

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ApiViewsUserGetCurrentUserSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>
>;
export type ApiViewsUserGetCurrentUserSuspenseQueryError = ErrorType<unknown>;

/**
 * @summary Get current user
 */

export function useApiViewsUserGetCurrentUserSuspense<
  TData = Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiViewsUserGetCurrentUser>>, TError, TData>;
}): UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getApiViewsUserGetCurrentUserSuspenseQueryOptions(options);

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Update current user
 */
export const apiViewsUserUpdateMe = (userUpdate: UserUpdate) => {
  return customInstance<UserOut>({
    url: `/api/users/me`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data: userUpdate,
  });
};

export const getApiViewsUserUpdateMeMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserUpdateMe>>,
    TError,
    { data: UserUpdate },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiViewsUserUpdateMe>>,
  TError,
  { data: UserUpdate },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiViewsUserUpdateMe>>,
    { data: UserUpdate }
  > = (props) => {
    const { data } = props ?? {};

    return apiViewsUserUpdateMe(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ApiViewsUserUpdateMeMutationResult = NonNullable<Awaited<ReturnType<typeof apiViewsUserUpdateMe>>>;
export type ApiViewsUserUpdateMeMutationBody = UserUpdate;
export type ApiViewsUserUpdateMeMutationError = ErrorType<unknown>;

/**
 * @summary Update current user
 */
export const useApiViewsUserUpdateMe = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserUpdateMe>>,
    TError,
    { data: UserUpdate },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof apiViewsUserUpdateMe>>,
  TError,
  { data: UserUpdate },
  TContext
> => {
  const mutationOptions = getApiViewsUserUpdateMeMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Get User Details
 */
export const ninjaCrudViewsReadViewGetUserDetails = (
  id?: string | null | undefined | null,
  signal?: AbortSignal
) => {
  return customInstance<UserOut>({
    url: `/api/users/${id}`,
    method: "GET",
    signal,
  });
};

export const getNinjaCrudViewsReadViewGetUserDetailsQueryKey = (id?: string | null | undefined | null) => {
  return [`/api/users/${id}`] as const;
};

export const getNinjaCrudViewsReadViewGetUserDetailsQueryOptions = <
  TData = Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
  TError = ErrorType<unknown>,
>(
  id?: string | null | undefined | null,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>, TError, TData>;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getNinjaCrudViewsReadViewGetUserDetailsQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>> = ({
    signal,
  }) => ninjaCrudViewsReadViewGetUserDetails(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>, TError, TData> & {
    queryKey: QueryKey;
  };
};

export type NinjaCrudViewsReadViewGetUserDetailsQueryResult = NonNullable<
  Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>
>;
export type NinjaCrudViewsReadViewGetUserDetailsQueryError = ErrorType<unknown>;

/**
 * @summary Get User Details
 */

export function useNinjaCrudViewsReadViewGetUserDetails<
  TData = Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
  TError = ErrorType<unknown>,
>(
  id?: string | null | undefined | null,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getNinjaCrudViewsReadViewGetUserDetailsQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getNinjaCrudViewsReadViewGetUserDetailsSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
  TError = ErrorType<unknown>,
>(
  id?: string | null | undefined | null,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
      TError,
      TData
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getNinjaCrudViewsReadViewGetUserDetailsQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>> = ({
    signal,
  }) => ninjaCrudViewsReadViewGetUserDetails(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type NinjaCrudViewsReadViewGetUserDetailsSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>
>;
export type NinjaCrudViewsReadViewGetUserDetailsSuspenseQueryError = ErrorType<unknown>;

/**
 * @summary Get User Details
 */

export function useNinjaCrudViewsReadViewGetUserDetailsSuspense<
  TData = Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
  TError = ErrorType<unknown>,
>(
  id?: string | null | undefined | null,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof ninjaCrudViewsReadViewGetUserDetails>>,
      TError,
      TData
    >;
  }
): UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getNinjaCrudViewsReadViewGetUserDetailsSuspenseQueryOptions(id, options);

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Delete User
 */
export const ninjaCrudViewsDeleteViewDeleteUser = (id?: string | null | undefined | null) => {
  return customInstance<void>({ url: `/api/users/${id}`, method: "DELETE" });
};

export const getNinjaCrudViewsDeleteViewDeleteUserMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof ninjaCrudViewsDeleteViewDeleteUser>>,
    TError,
    { id?: string | null },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof ninjaCrudViewsDeleteViewDeleteUser>>,
  TError,
  { id?: string | null },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof ninjaCrudViewsDeleteViewDeleteUser>>,
    { id?: string | null }
  > = (props) => {
    const { id } = props ?? {};

    return ninjaCrudViewsDeleteViewDeleteUser(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type NinjaCrudViewsDeleteViewDeleteUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof ninjaCrudViewsDeleteViewDeleteUser>>
>;

export type NinjaCrudViewsDeleteViewDeleteUserMutationError = ErrorType<unknown>;

/**
 * @summary Delete User
 */
export const useNinjaCrudViewsDeleteViewDeleteUser = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof ninjaCrudViewsDeleteViewDeleteUser>>,
    TError,
    { id?: string | null },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof ninjaCrudViewsDeleteViewDeleteUser>>,
  TError,
  { id?: string | null },
  TContext
> => {
  const mutationOptions = getNinjaCrudViewsDeleteViewDeleteUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Refresh Token
 */
export const apiViewsUserRefreshToken = (tokenRefreshInputSchema: TokenRefreshInputSchema) => {
  return customInstance<TokenRefreshPairOut>({
    url: `/api/users/refresh`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: tokenRefreshInputSchema,
  });
};

export const getApiViewsUserRefreshTokenMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserRefreshToken>>,
    TError,
    { data: TokenRefreshInputSchema },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiViewsUserRefreshToken>>,
  TError,
  { data: TokenRefreshInputSchema },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiViewsUserRefreshToken>>,
    { data: TokenRefreshInputSchema }
  > = (props) => {
    const { data } = props ?? {};

    return apiViewsUserRefreshToken(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ApiViewsUserRefreshTokenMutationResult = NonNullable<
  Awaited<ReturnType<typeof apiViewsUserRefreshToken>>
>;
export type ApiViewsUserRefreshTokenMutationBody = TokenRefreshInputSchema;
export type ApiViewsUserRefreshTokenMutationError = ErrorType<unknown>;

/**
 * @summary Refresh Token
 */
export const useApiViewsUserRefreshToken = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiViewsUserRefreshToken>>,
    TError,
    { data: TokenRefreshInputSchema },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof apiViewsUserRefreshToken>>,
  TError,
  { data: TokenRefreshInputSchema },
  TContext
> => {
  const mutationOptions = getApiViewsUserRefreshTokenMutationOptions(options);

  return useMutation(mutationOptions);
};
