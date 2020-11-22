import { boxConditionLookup } from '../Components/Square/squareUtility';

const squareStateConstants = {
  num: 1,
  handleClick: () => {},
  borderColor: 'blue'
};

const squarePropsConstants = {
  row: 0,
  col: 0,
  number: 1,
  pressKey: () => {},
  boxLookup: boxConditionLookup()
};

export {
  squareStateConstants,
  squarePropsConstants
};
