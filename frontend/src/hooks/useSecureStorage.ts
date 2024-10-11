import React, { useState, useEffect } from "react";
import SecureStorage from "react-secure-storage";

const useSecureStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = SecureStorage.getItem(key)?.toString();
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error retrieving from secure storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === null) {
        SecureStorage.removeItem(key);
      } else {
        SecureStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error saving to secure storage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSecureStorage;
