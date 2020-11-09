import SquareBorderTopLeft from './squareBorders/topLeft';
import SquareBorderTopRight from './squareBorders/topRight';
import SquareBorderTop from './squareBorders/Top';
import SquareBorderBottomLeft from './squareBorders/bottomLeft';
import SquareBorderBottomRight from './squareBorders/bottomRight';
import SquareBorderBottom from './squareBorders/Bottom';
import SquareBorderLeft from './squareBorders/Left';
import SquareBorderRight from './squareBorders/Right';

const rowTopLeft = [0, 3, 6];
const topRightRange = [2, 5, 8];
const topBorder = [1, 4, 7];

const boxLookupAssignment = (boxLookup, rowArr, colArr, button) => {
  for (let rowNum = 0; rowNum < rowArr.length; rowNum++) {
    for (let colNum = 0; colNum < colArr.length; colNum++) {
      boxLookup[`${rowArr[rowNum]} ${colArr[colNum]}`] = button;
    }
  }
};

const borderColorLookup = (row, col) => {
  return {
    '0 0': 'blue',
    '3 3': 'blue',
    '6 6': 'blue',
    '0 3': 'yellow',
    '3 6': 'yellow',
    '6 0': 'yellow',
  }[`${row} ${col}`];
};

const setBorderColor = (row, col) => {
  return borderColorLookup(row, col) || '#c700ff';
};

// this is a complicated function, but I will explain as best as I can
// what essentially is going on is we are populating the styled component button for each box
// for example, rowTopLeft and rowTopLeft are corresponding to this order:
// row 0 col 0, row 0 col 3, row 0 col 6, row 3 col 0, row 3 col 3, row 3 col 6, row 6 col 0, row 6 col 3, row 6 col 6
// the boxes in those positions will all contain the top left border

const boxConditionLookup = () => {
  const boxLookup = {};

  boxLookupAssignment(boxLookup, rowTopLeft, rowTopLeft, SquareBorderTopLeft);
  boxLookupAssignment(boxLookup, rowTopLeft, topRightRange, SquareBorderTopRight);
  boxLookupAssignment(boxLookup, topRightRange, rowTopLeft, SquareBorderBottomLeft);
  boxLookupAssignment(boxLookup, topRightRange, topRightRange, SquareBorderBottomRight);
  boxLookupAssignment(boxLookup, rowTopLeft, topBorder, SquareBorderTop);
  boxLookupAssignment(boxLookup, topRightRange, topBorder,SquareBorderBottom);
  boxLookupAssignment(boxLookup, topBorder, rowTopLeft, SquareBorderLeft);
  boxLookupAssignment(boxLookup, topBorder, topRightRange, SquareBorderRight);

  return boxLookup;
};

export {
  setBorderColor,
  boxConditionLookup
};
