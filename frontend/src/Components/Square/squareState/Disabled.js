import React from 'react';
const disabledBtn = (componentName, num, borderColor) => {
  return React.createElement(
    componentName,
    { className: 'square primary', borderColor },
    num,
  );
};

export default disabledBtn;