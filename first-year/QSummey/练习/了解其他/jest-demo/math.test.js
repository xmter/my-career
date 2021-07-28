const {add, minus} = require('./math');

// import {add} from './math.js';

test('加', () => {
    expect(add(1,1)).toBe(2);
});

test('减', () => {
    expect(minus(1,1)).toBe(0);
});
