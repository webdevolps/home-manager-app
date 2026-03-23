import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ModalProvider, useModal } from '@/context/ModalContext'
import React from 'react'

const TestComponent = () => {
  const { isOpen, content, openModal, closeModal } = useModal()
  return (
    <div>
      <div data-testid="status">{isOpen ? 'open' : 'closed'}</div>
      <div data-testid="content">{content}</div>
      <button onClick={() => openModal(<div data-testid="modal-content">Modal Content</div>)}>Open</button>
      <button onClick={closeModal}>Close</button>
    </div>
  )
}

describe('ModalContext', () => {
  it('should provide modal state and functions', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    )

    expect(screen.getByTestId('status').textContent).toBe('closed')
    
    act(() => {
      screen.getByText('Open').click()
    })

    expect(screen.getByTestId('status').textContent).toBe('open')
    expect(screen.getByTestId('modal-content')).toBeInTheDocument()

    act(() => {
      screen.getByText('Close').click()
    })

    expect(screen.getByTestId('status').textContent).toBe('closed')
  })

  it('should throw error if used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow('useModal must be used within a ModalProvider')
    consoleSpy.mockRestore()
  })
})
