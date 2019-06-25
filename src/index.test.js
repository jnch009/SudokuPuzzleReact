import fn from './helperFn/boardFunctions';

test('Random Value', () =>{
    const value = fn.randomlyGeneratedValue(0,10);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
});

describe('Testing grid conditions', ()=>{
    const grid = [[null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,2,3,5,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null]];
    
    const gridViolated = [[null,8,null,null,null,null,null,null,null],
                  [null,1,null,null,null,null,null,null,null],
                  [null,1,null,null,null,null,null,null,null],
                  [null,5,null,null,null,null,null,null,null],
                  [null,7,null,2,3,5,null,5,null],
                  [null,9,null,null,null,null,null,null,null],
                  [null,3,null,null,null,null,null,null,null],
                  [null,2,null,null,null,null,null,null,null],
                  [null,4,null,null,null,null,null,null,null]];

    /*const colNumber = 4;
    const rowNumber = 4;
    const valToAdd = 3;
    const successValRow = 7;
    const successValCol = 5;*/

    it('Error inserting same value into same column',()=>{
        expect(fn.insertIntoCol(grid,4,3)).toBe(false);
    });

    it('Error inserting same value into same row',()=>{
        expect(fn.insertIntoRow(grid,4,5)).toBe(false);
    });

    it('Entry is not allowed to be considered for the sub-box',()=>{
        expect(fn.insertConstraint(grid,4,0,2)).toBe(false);
    });

    it('Grid violates row condition',() => {
        expect(fn.verifyRow(gridViolated,4)).toBe(false);
    });

    it('Grid violates col condition',() => {
        expect(fn.verifyColumn(gridViolated,1)).toBe(false);
    });
});