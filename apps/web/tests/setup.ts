import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

// nr generate:mock
import { handlers } from '~/msw-mock-srever'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
