import { describe, it, expect, vi, beforeEach } from 'vitest';
import SecureStorage from './secureStorage';
import CryptoJS from 'crypto-js';

describe('SecureStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const TEST_KEY = 'test_key';
  const TEST_VALUE = 'secret_data';

  it('setItem encryption and getItem decryption', () => {
    SecureStorage.setItem(TEST_KEY, TEST_VALUE);
    const encrypted = localStorage.getItem(TEST_KEY);
    
    expect(encrypted).not.toBeNull();
    expect(encrypted).not.toBe(TEST_VALUE); // Should be encrypted

    const decrypted = SecureStorage.getItem(TEST_KEY);
    expect(decrypted).toBe(TEST_VALUE);
  });

  it('setItem handles empty values', () => {
    SecureStorage.setItem(TEST_KEY, '');
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });

  it('setItem catches errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(CryptoJS.AES, 'encrypt').mockImplementation(() => {
      throw new Error('Encryption fail');
    });

    SecureStorage.setItem(TEST_KEY, TEST_VALUE);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('getItem catches decryption errors and removes corrupted items', () => {
    localStorage.setItem(TEST_KEY, 'corrupted-invalid-cypher-text');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(CryptoJS.AES, 'decrypt').mockImplementation(() => {
      throw new Error('Forced Decryption Error');
    });

    const result = SecureStorage.getItem(TEST_KEY);
    
    expect(result).toBeNull();
    expect(localStorage.getItem(TEST_KEY)).toBeNull(); // It should remove corrupt data
    expect(errorSpy).toHaveBeenCalled();
  });

  it('getItem returns null if empty string is decrypted', () => {
    vi.spyOn(CryptoJS.AES, 'decrypt').mockImplementation(() => {
      return { toString: () => '' } as unknown as CryptoJS.lib.WordArray;
    });
    localStorage.setItem(TEST_KEY, 'dummy-encrypted-data');

    expect(SecureStorage.getItem(TEST_KEY)).toBeNull();
  });

  it('removeItem works', () => {
    localStorage.setItem(TEST_KEY, 'value');
    SecureStorage.removeItem(TEST_KEY);
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });

  it('clear works', () => {
    localStorage.setItem(TEST_KEY, 'value');
    SecureStorage.clear();
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });
});
