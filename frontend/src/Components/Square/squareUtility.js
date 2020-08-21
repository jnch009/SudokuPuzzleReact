const boxLookupAssignment = (boxLookup, rowArr, colArr, disabled, buttonNonDisabled, buttonDisabled) => {
  for (let rowNum = 0; rowNum < rowArr.length; rowNum++) {
    for (let colNum = 0; colNum < colArr.length; colNum++) {
      boxLookup[`${rowArr[rowNum]} ${colArr[colNum]}`] = !disabled
        ? buttonNonDisabled
        : buttonDisabled;
    }
  }
};

export default boxLookupAssignment;
