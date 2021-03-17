import * as mocks from 'node-mocks-http'
import { AuthenticatedRequest } from '~types/request'

export const createAuthenticatedUserRequestMock = (): AuthenticatedRequest => {
  const req: AuthenticatedRequest = mocks.createRequest()
  req.user = {
    id: '1',
    username: 'test-user',
    role: 'basic',
    iat: '',
  }

  return req
}
