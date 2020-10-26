import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'shards-react';
import useSudokuPrompt from '../../hooks/usePromptProvider/index';

const timeUntilDismissed = 3;
const SudokuPrompt = () => {
  const interval = useRef(null);
  const { prompt, removePrompt } = useSudokuPrompt();
  const [ countdown, setCountdown ] = useState(0);

  useEffect(() => {
    if (prompt && interval.current === null){
      interval.current = setInterval(() => {
        setCountdown(count => count + 1);       
      }, 1000);
    }
  },[prompt]);

  useEffect(() => {
    if (countdown > timeUntilDismissed - 1){
      clearInterval(interval.current);
      interval.current = null;
      setCountdown(0);      
      removePrompt();
    }
  },[countdown]);

  return (
    <div>
      {/* bang bang you're boolean, !! means convert to boolean */}
      <Alert className='alertConstraint d-flex justify-content-center' open={!!prompt} theme={prompt && prompt.promptType}>
        {prompt && prompt.message}
      </Alert>
    </div>
  );
};

export default SudokuPrompt;
