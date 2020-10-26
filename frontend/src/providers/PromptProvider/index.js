import React, { useState, useCallback } from 'react';

export const SudokuPromptContext = React.createContext({
  prompt: null,
  addPrompt: () => {},
  removePrompt: () => {},
});

const SudokuPromptProvider = ({ children }) => {
  const [prompt, setPrompt] = useState(null);
  const removePrompt = () => setPrompt(null);
  const addPrompt = (message, promptType) => setPrompt({ message, promptType });

  const contextValue = {
    prompt,
    addPrompt: useCallback((message, promptType) => addPrompt(message, promptType), []),
    removePrompt: useCallback(() => removePrompt(), [])
  };

  return (
    <SudokuPromptContext.Provider value={contextValue}>{children}</SudokuPromptContext.Provider>
  );
};

export default SudokuPromptProvider;
