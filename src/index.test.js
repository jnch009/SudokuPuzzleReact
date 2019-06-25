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
    
    const gridRowViolated = [[null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,2,3,5,null,5,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null]];

    const colNumber = 4;
    const rowNumber = 4;

    const valToAdd = 3;
    const successValRow = 7;
    const successValCol = 5;

    it('Error inserting same value into same column',()=>{
        expect(fn.insertIntoCol(grid,colNumber,valToAdd)).toBe(false);
    });

    it('Error inserting same value into same row',()=>{
        expect(fn.insertIntoRow(grid,rowNumber,valToAdd)).toBe(false);
    });

    it('Grid violates row and column condition',()=>{
        expect(fn.insertConstraint(grid,rowNumber,colNumber,valToAdd)).toBe(false);
    });

    it('Grid violates row condition',() => {
        expect(fn.verifyRow(gridRowViolated,rowNumber)).toBe(false);
    });
});