const boxLookupAssignment = (boxLookup, rowArr, colArr, button) => {
  for (let rowNum = 0; rowNum < rowArr.length; rowNum++) {
    for (let colNum = 0; colNum < colArr.length; colNum++) {
      boxLookup[`${rowArr[rowNum]} ${colArr[colNum]}`] = button;
    }
  }
};

export default boxLookupAssignment;
