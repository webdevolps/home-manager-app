import CryptoJS from 'crypto-js';

// En un entorno de producción, esto debería inyectarse vía variables de entorno (VITE_STORAGE_SECRET).
const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET || 'agnes-enterprise-super-secret-key-256';

export const SecureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      if (!value) return;
      const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error(`Error encrypting item ${key}:`, error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;

      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      
      return decryptedValue || null;
    } catch (error) {
      console.error(`Error decrypting item ${key}:`, error);
      // Si la desencriptación falla (por cambio de clave, manipulación manual, etc), limpiamos el key corrupto.
      localStorage.removeItem(key);
      return null;
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  }
};

export default SecureStorage;
