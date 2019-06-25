import fn from './helperFn/boardFunctions';

test('Random Value', () =>{
    const value = fn.randomlyGeneratedValue(0,10);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
});