import { AXIOS_INSTANCE } from 'api/axios-instance';
import { AxiosHeaders } from 'axios';
import * as Application from 'expo-application';
import { useRouter } from 'expo-router';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';

export const getApiHeaders = (accessToken?: string | null) => {
  const headers = {
    'X-App-Version': Application.nativeApplicationVersion,
    'X-OS': Platform.OS,
  };

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    };
  }

  return headers;
};

/**
 * ApiProvider is a context wrapper that injects authentication and versioning
 * headers into all outgoing API requests made through Axios.
 *
 * - Listens for Supabase auth state changes and updates the session token.
 * - Automatically attaches the `Authorization` header (with the Supabase
 *   session access token) to outgoing requests.
 * - Adds app metadata headers (`X-App-Version` and `X-OS`) to help the backend
 *   enforce version control and platform-specific behavior.
 * - Intercepts API responses to handle specific status codes (e.g., HTTP 426
 *   for forced app updates), and redirects the user to the appropriate screen
 *   if necessary.
 */
export const ApiProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  /**
   * You should implement your own logic to get the auth token
   * @example const { data } = await supabase.auth.getSession();
   * @example const accessToken = data.session?.access_token;
   */
  const accessToken = 'fake-token';

  const authorizationHeaders = useMemo(
    () => getApiHeaders(accessToken),
    [accessToken],
  );

  // Add the authorization token and the app version to the API requests.
  useEffect(() => {
    const requestInterceptor = AXIOS_INSTANCE.interceptors.request.use(
      async (config) => ({
        ...config,
        headers: new AxiosHeaders({
          ...config.headers,
          ...authorizationHeaders,
        }),
      }),
    );

    /**
     * You should implement your own logic to handle errors here.
     * @example
     * // If the backend responds with a status code of 426, the app needs to
     * // be updated. Here we redirect the user to the update required screen.
     * if (error.response?.status === 426) {
     *   while (router.canGoBack()) {
     *     router.back();
     *   }
     *   router.replace('/update-required');
     * }
     */
    const responseInterceptor = AXIOS_INSTANCE.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      AXIOS_INSTANCE.interceptors.request.eject(requestInterceptor);
      AXIOS_INSTANCE.interceptors.response.eject(responseInterceptor);
    };
  }, [router, authorizationHeaders]);

  return children;
};
