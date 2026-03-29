import { describe, it, expect, vi } from 'vitest'
import ApiImpl from '@/infrastructure/Api'
import axios from 'axios'

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      postForm: vi.fn(),
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

    await tasks.getAll({ query: { page: 1 } })
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
})
