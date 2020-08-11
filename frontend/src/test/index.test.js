import fn from '../helperFn/boardFunctions';

// describe('Random Value Tests', () =>{
//     let value = fn.randomlyGeneratedValue(0,10);
//     it('Boundary test',()=>{
//         expect(value).toBeGreaterThanOrEqual(0);
//         expect(value).toBeLessThan(10);
//     });
    
//     value = fn.randomlyGeneratedValue(1,1);
//     it('Same value test',()=>{
//         expect(value).toBe(1);
//     })
// });

// describe('Testing grid conditions', ()=>{
//     const insertIntoGrid = [["4",null,null,null,null,null,null,null,null],
//                             [null,null,null,null,null,null,null,null,null],
//                             [null,null,null,null,null,null,null,null,null],
//                             [null,null,null,null,null,null,null,null,null],
//                             [null,null,null,2,3,5,null,null,null],
//                             [null,null,null,null,null,null,null,null,null],
//                             [null,null,null,null,null,null,null,null,null],
//                             [null,null,null,null,null,null,null,null,null],
//                             [null,null,null,null,null,null,null,null,null]];
    
//     const gridViolated = [[null,8,null,null,null,null,8,8,1],
//                           [null,1,null,null,null,null,4,3,2],
//                           [null,1,null,null,null,null,5,6,9],
//                           [null,5,null,null,null,null,null,null,null],
//                           [9,   7,4,2,3,5,1,5,6],
//                           [null,9,null,null,null,null,null,null,null],
//                           [null,3,null,null,null,null,null,null,null],
//                           [null,2,null,null,null,null,null,null,null],
//                           [null,4,null,null,null,null,null,null,null]];
    
//     const completedGrid = [[1,2,3,4,5,6,7,8,9],
//                            [4,5,6,7,8,9,1,2,3],
//                            [7,8,9,1,2,3,4,5,6],
//                            [2,3,1,5,6,8,9,4,7],
//                            [5,6,4,9,7,2,3,1,8],
//                            [8,9,7,3,4,1,2,6,5],
//                            [3,1,2,8,9,5,6,7,4],
//                            [6,4,5,2,3,7,8,9,1],
//                            [9,7,8,6,1,4,5,3,2]];

//     it('Error inserting same value into same column',()=>{
//         expect(fn.insertIntoCol(insertIntoGrid,4,3)).toBe(false);
//     });

//     it('Error inserting into same column with string entry',()=>{
//         expect(fn.insertIntoCol(insertIntoGrid,0,4)).toBe(false);
//     })

//     it('Error inserting same value into same row',()=>{
//         expect(fn.insertIntoRow(insertIntoGrid,4,5)).toBe(false);
//     });

//     it('Error inserting into same column with string entry',()=>{
//         expect(fn.insertIntoCol(insertIntoGrid,0,4)).toBe(false);
//     })

//     it('Entry is allowed to be inserted into the box', ()=>{
//         expect(fn.insertConstraint(insertIntoGrid,4,0,9)).toBe(true);
//     });

//     it('Entry is not allowed to be considered for the sub-box',()=>{
//         expect(fn.insertConstraint(insertIntoGrid,4,0,2)).toBe(false);
//     });

//     it('Grid satisfies all conditions',() => {
//         expect(fn.ensureGridSatisfied(completedGrid)).toBe(true);
//     });

//     it('Grid violates row condition',() => {
//         expect(fn.verifyRow(gridViolated,4)).toBe(false);
//     });

//     it('Grid violates col condition',() => {
//         expect(fn.verifyColumn(gridViolated,1)).toBe(false);
//     });

//     it('Grid violates box condition',() => {
//         expect(fn.verifyBox(gridViolated,0,6)).toBe(false);
//     });
// });