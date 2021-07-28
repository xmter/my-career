const {fff} = require('./bar');

test('加', () => {
    expect(fff(1,1)).toBe(2);
});
