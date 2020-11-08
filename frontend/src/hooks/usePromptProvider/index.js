import { useContext } from 'react';
import { SudokuPromptContext } from '../../providers/PromptProvider/index';

const useSudokuPrompt = () => {
  const { prompt, addPrompt, removePrompt } = useContext(SudokuPromptContext);
  return { prompt, addPrompt, removePrompt };
};

export default useSudokuPrompt;
