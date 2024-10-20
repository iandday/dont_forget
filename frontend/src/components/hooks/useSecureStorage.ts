import React, { useState, useEffect } from "react";
import SecureStorage from "react-secure-storage";

const useSecureStorage = <T>(key: string, initialValue: string): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
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

  const updateValue = (newData: T) => {
    console.log("updating value", newData);
    setValue(newData);
  };

  return [value, updateValue];
};

export default useSecureStorage;
