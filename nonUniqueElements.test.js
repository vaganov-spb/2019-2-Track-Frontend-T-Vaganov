const nonUniqueElements = require('./nonUniqueElements');

test('returns non unique elements №1', () => {
  expect(nonUniqueElements([1, 2, 3, 1, 3])).toEqual([1, 3, 1, 3]);
})

test('returns non unique elements №2', () => {
  expect(nonUniqueElements([1, 2, 3, 4, 5])).toEqual([]);
})

test('returns non unique elements №3', () => {
  expect(nonUniqueElements([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
})

test('returns non unique elements №4', () => {
  expect(nonUniqueElements([10, 9, 10, 10, 9, 8])).toEqual([10, 9, 10, 10, 9]);
})

test('returns non unique elements №5', () => {
  expect(nonUniqueElements([1, "1", 3, 1, 3])).toEqual([1, 3, 1, 3]);
})

test('returns non unique elements №6', () => {
  expect(nonUniqueElements([1, '1', 3, '1', 3])).toEqual(['1', 3, '1', 3]);
})

test('returns non unique elements №7', () => {
  expect(nonUniqueElements([1, {name :  'John'}, 3, '1', 3, true])).toEqual([3, 3]);
})

test('returns non unique elements №8', () => {
  expect(nonUniqueElements([1, 3, '1', true, true, [1, 2, 3]])).toEqual([true, true]);
})
