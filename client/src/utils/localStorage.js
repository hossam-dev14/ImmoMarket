

// Persist a value to local storage by providing a key and a value.
export const persistState = (key, value) => {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error accessing local storage:', error);
  }
};


// Retrieves a value from local storage based on the provided key.
export const getStateFromStorage = (key) => {
  try {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error('Error parsing state from local storage:', error);
    return null;
  }
};
