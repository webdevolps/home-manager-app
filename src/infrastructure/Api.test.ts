import { describe, it, expect, vi } from 'vitest'
import ApiImpl from '@/infrastructure/Api'
import axios from 'axios'
import { store } from '@/store/store'
import { logout } from '@/store/auth/authSlice'

vi.mock('@/store/store', () => ({
  store: {
    getState: vi.fn(),
    dispatch: vi.fn()
  }
}))

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      postForm: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
  },
}))

describe('ApiImpl', () => {
  const url = 'http://api.test/'
  const api = new ApiImpl({ url })

  it('creates entities and generates endpoints', () => {
    api.createEntity({ name: 'users' })
    const endpoints = api.getEndpoints()
    expect(endpoints.users).toBeDefined()
    expect(typeof endpoints.users.get).toBe('function')
  })

  it('calls axios methods correctly', async () => {
    api.createEntity({ name: 'tasks' })
    const tasks = api.getEndpoints().tasks
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInstance = (axios.create as any).mock.results[0].value
    
    const baseUrl = 'http://api.test/tasks'
    
    await tasks.get({})
    expect(mockInstance.get).toHaveBeenCalledWith(baseUrl, {})

    await tasks.getId({ id: 1 })
    expect(mockInstance.get).toHaveBeenCalledWith(`${baseUrl}/1`, {})

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await tasks.getAll({ query: { page: 1 } as any })
    expect(mockInstance.get).toHaveBeenCalledWith(baseUrl, { params: { page: 1 } })

    await tasks.create({ toCreate: { name: 'new' } })
    expect(mockInstance.post).toHaveBeenCalledWith(baseUrl, { name: 'new' }, {})

    await tasks.update({ id: 1, toUpdate: { name: 'updated' } })
    expect(mockInstance.put).toHaveBeenCalledWith(`${baseUrl}/1`, { name: 'updated' }, {})

    await tasks.patch({ id: 1, toPatch: { status: 'done' } })
    expect(mockInstance.patch).toHaveBeenCalledWith(`${baseUrl}/1`, { status: 'done' }, {})

    await tasks.delete({ id: 1 })
    expect(mockInstance.delete).toHaveBeenCalledWith(`${baseUrl}/1`, {})

    await tasks.sendFile({ toCreate: { file: 'data' } })
    expect(mockInstance.postForm).toHaveBeenCalledWith(baseUrl, { file: 'data' }, {})
  })

  it('creates multiple entities', () => {
    const api2 = new ApiImpl({ url })
    api2.createEntities([{ name: 'a' }, { name: 'b' }])
    const endpoints = api2.getEndpoints()
    expect(endpoints.a).toBeDefined()
    expect(endpoints.b).toBeDefined()
  })

  // Interceptor Tests
  it('should inject token and X-Tenant-ID from Redux Store into the request', async () => {
    const mockState = {
      _placeholder: {},
      auth: { token: 'redux-token-123', currentTenantId: 'tenant-456', user: null, isAuthenticated: true }
    }
    vi.mocked(store.getState).mockReturnValue(mockState)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInstance = (axios.create as any).mock.results[0].value
    const requestInterceptor = mockInstance.interceptors.request.use.mock.calls[0][0]
    const config = await requestInterceptor({ headers: {} })

    expect(config.headers.Authorization).toBe('Bearer redux-token-123')
    expect(config.headers['X-Tenant-ID']).toBe('tenant-456')
  })

  it('should fallback to localStorage token if Redux token is absent', async () => {
    vi.mocked(store.getState).mockReturnValue({
      _placeholder: {},
      auth: { token: null, currentTenantId: null, user: null, isAuthenticated: false }
    })
    localStorage.setItem('token', 'local-token-999')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInstance = (axios.create as any).mock.results[0].value
    const requestInterceptor = mockInstance.interceptors.request.use.mock.calls[0][0]
    const config = await requestInterceptor({ headers: {} })

    expect(config.headers.Authorization).toBe('Bearer local-token-999')
    expect(config.headers['X-Tenant-ID']).toBeUndefined()
  })

  it('should not inject headers if neither token nor tenant are present', async () => {
    vi.mocked(store.getState).mockReturnValue({
      _placeholder: {},
      auth: { token: null, currentTenantId: null, user: null, isAuthenticated: false }
    })
    localStorage.removeItem('token')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInstance = (axios.create as any).mock.results[0].value
    const requestInterceptor = mockInstance.interceptors.request.use.mock.calls[0][0]
    const config = await requestInterceptor({ headers: {} })

    expect(config.headers.Authorization).toBeUndefined()
    expect(config.headers['X-Tenant-ID']).toBeUndefined()
  })

  it('should dispatch global logout when response is 401 Unauthorized', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInstance = (axios.create as any).mock.results[0].value
    const responseInterceptor = mockInstance.interceptors.response.use.mock.calls[0][1]
    const errorWith401 = { response: { status: 401 } }

    try {
      await responseInterceptor(errorWith401)
    } catch {
      // Ignoramos la promesa rechazada intencionalmente
    }

    expect(store.dispatch).toHaveBeenCalledWith(logout())
  })
})
