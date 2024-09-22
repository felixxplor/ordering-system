import http from '@/lib/http'
import { LoginBodyType, LoginResType, LogoutBodyType } from '@/schemaValidations/auth.schema'

const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseUrl: '',
    }),
  sLogout: (
    body: LogoutBodyType & {
      accessToken: string
    }
  ) =>
    http.post(
      '/auth/logout',
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),
  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }), // The client calls the route handler, and there's no need to pass the Access Token and Refresh Token in the body because the AT and RT are automatically sent through cookies.
}
export default authApiRequest
