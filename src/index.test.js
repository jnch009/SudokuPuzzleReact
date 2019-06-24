import {randomlyGeneratedValue} from './helperFn/boardFunctions';

test('Random Value', () =>{
    const value = randomlyGeneratedValue(0,10);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
});