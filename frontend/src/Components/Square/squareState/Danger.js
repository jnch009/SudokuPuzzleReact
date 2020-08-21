import React from 'react';
const squareBtnDanger = (componentName, num, handleClick, borderColor) => {
  return React.createElement(
    componentName,
    { onClick: handleClick, className: 'square danger', borderColor },
    num,
  );
};

export default squareBtnDanger;