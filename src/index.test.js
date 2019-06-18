const {generateValidEntries} = require('./index')
var boxGrid = Array(9).fill(null).map(x=>[]);
var entries = [1,2,3,4,5,6,7,8,9];
var newGrid = [[null,null,null,null,null,null,null,null,null],
               [null,null,null,null,null,null,null,null,null],
               [null,null,null,null,null,null,null,null,null],
               [null,null,null,null,null,null,null,null,null],
               [null,null,null,null,null,null,null,null,null],
               [null,null,null,null,null,null,null,null,null],
               [8,6,5,null,null,null,null,null,null],
               [3,1,9,null,null,null,null,null,null],
               [7,2,4,null,null,null,null,null,null]];
var beginRow = 0;
var beginCol = 3;

var result = [[]];

test('Adding 1 + 1 equals 2', (boxGrid, entries, beginRow, beginCol, newGrid) => {
    expect(generateValidEntries(boxGrid, entries, beginRow, beginCol, newGrid)).toBe(result);
})