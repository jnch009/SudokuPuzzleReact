import React from 'react';
const squareBtnLight = (componentName, num, handleClick, borderColor) => {
  return React.createElement(
    componentName,
    {
      onClick: handleClick,
      className: 'square light',
      modify: true,
      borderColor,
    },
    num,
  );
};

export default squareBtnLight;
