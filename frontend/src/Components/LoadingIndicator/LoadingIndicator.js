import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
