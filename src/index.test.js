import fn from './helperFn/boardFunctions';

test('Random Value', () =>{
    const value = fn.randomlyGeneratedValue(0,10);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
});

describe('Testing grid conditions', ()=>{
    const grid = [[2,3,5,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null]];
    const colNumber = 1;
    const rowNumber = 0;
    const valToAdd = 3;

    it('Error inserting same value into same column',()=>{
        expect(fn.checkCol(grid,colNumber,valToAdd)).toBe(false);
    });

    it('Error inserting same value into same row',()=>{
        expect(fn.checkRow(grid,rowNumber,valToAdd)).toBe(false);
    })
});