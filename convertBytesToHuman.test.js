/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

const functions = require('./convertBytesToHuman');

test('Определяет правильно ли число введено №1', () => {
  expect(functions.isPositiveInt(5)).toBe(true);
});

test('Определяет правильно ли число введено №2', () => {
  expect(functions.isPositiveInt(-1)).toBe(false);
});

test('Определяет правильно ли число введено №3', () => {
  expect(functions.isPositiveInt("sert")).toBe(false);
});

test('Определяет правильно ли число введено №4', () => {
  expect(functions.isPositiveInt(0)).toBe(true);
});

test('Определяет правильно ли число введено №5', () => {
  expect(functions.isPositiveInt(-6)).not.toBe(true);
});

test('Определение степени информации №1', () => {
  expect(functions.informationUnit(0)).toBe("B");
});

test('Определение степени информации №2', () => {
  expect(functions.informationUnit(6)).toBe("EB");
});

test('Определение степени информации №3', () => {
  expect(functions.informationUnit(8)).toBe("YB");
});

test('Определение степени информации №4', () => {
  expect(functions.informationUnit(-1)).toBe(false);
});

test('Определение степени информации №5', () => {
  expect(functions.informationUnit("srt")).toBe(false);
});

test('Определение степени информации №6', () => {
  expect(functions.informationUnit(12)).toBe(false);
});

test('Возвращает корректное значение для чисел №1', () => {
  expect(functions.convertBytesToHuman(0)).toBe('0 B');
});

test('Возвращает корректное значение для чисел №2', () => {
  expect(functions.convertBytesToHuman(123123123)).toBe('117.42 MB');
});

test('Возвращает корректное значение для чисел №3', () => {
  expect(functions.convertBytesToHuman(1024)).toBe('1 KB');
});

test('Возвращает корректное значение для чисел №4', () => {
  expect(functions.convertBytesToHuman(1073741824)).toBe('1 GB');
});

test('Возвращает корректное значение для чисел №5', () => {
  expect(functions.convertBytesToHuman(17920)).toBe('17.5 KB');
});

test('Возвращает корректное значение для чисел №6', () => {
  expect(functions.convertBytesToHuman(78899999999)).toBe('73.48 GB');
});

test('Возвращает корректное значение для чисел №7', () => {
  expect(functions.convertBytesToHuman(78918950323)).toBe('73.5 GB');
});

test('Возвращает false для отрицательного числа', () => {
  expect(functions.convertBytesToHuman(-14)).toBe(false);
});

test('Возвращает false для неправильного типа', () => {
  expect(functions.convertBytesToHuman("dert")).toBe(false);
});

test('Возвращает false для нецелого типа данных', () => {
  expect(functions.convertBytesToHuman(15.6)).toBe(false);
});