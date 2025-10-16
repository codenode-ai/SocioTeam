import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";

export type AuthUser = {
  id: string;
  username: string;
};

type AuthResponse = {
  user: AuthUser;
};

export const ME_QUERY_KEY = ["/api", "auth", "me"] as const;

export function useCurrentUser() {
  const query = useQuery<AuthUser | null>({
    queryKey: ME_QUERY_KEY,
    queryFn: getQueryFn<AuthUser | null>({ on401: "returnNull" }),
  });

  return {
    ...query,
    user: query.data ?? null,
  };
}

type Credentials = {
  username: string;
  password: string;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, Credentials>({
    mutationFn: async (credentials) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      return (await res.json()) as AuthResponse;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(ME_QUERY_KEY, data.user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, Credentials>({
    mutationFn: async (credentials) => {
      const res = await apiRequest("POST", "/api/auth/register", credentials);
      return (await res.json()) as AuthResponse;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(ME_QUERY_KEY, data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY, exact: true });
    },
  });
}
