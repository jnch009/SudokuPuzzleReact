import React from 'react';
const squareBtnDanger = (componentName, num, handleClick, borderColor) => {
  return React.createElement(
    componentName,
    {
      onClick: handleClick,
      className: 'square danger',
      modify: true,
      borderColor,
    },
    num
  );
};

export default squareBtnDanger;
