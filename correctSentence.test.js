const functions = require('./correctSentence');
 
test('Проверка пустой строки', () => {
  expect(functions.isEmptyString("")).toBe(true);
})

test('Проверка строки из пробелов', () => {
  expect(functions.isEmptyString("       ")).toBe(true);
})

test('Проверка непустой строки №1', () => {
  expect(functions.isEmptyString("    qwert   ")).toBe(false);
})

test('Проверка непустой строки №2', () => {
  expect(functions.isEmptyString("qwert")).toBe(false);
})

test('Проверка пустой строки в главной функции', () => {
  expect(functions.correctSentence("")).toBe('');
})

test('Проверка строки из пробелов в главной функции', () => {
  expect(functions.correctSentence("       ")).toBe('');
})

test('Проверка строки начинающейся с цифры,без пробелов', () => {
  expect(functions.correctSentence("1res")).toBe(-666);
})

test('Проверка строки начинающейся с цифры,с пробелами', () => {
  expect(functions.correctSentence("  6sd5  ")).toBe(-666);
})

test('Проверка строки начинающейся с символа,отличного от буквы,без пробелов', () => {
  expect(functions.correctSentence("{}")).toBe(-666);
})

test('Проверка строки начинающейся с символа,отличного от буквы,с пробелами', () => {
  expect(functions.correctSentence("  !as ")).toBe(-666);
})

test('Проверка корректной строки с маленькой буквы без точки без пробелов', () => {
  expect(functions.correctSentence("greetings, friends")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с маленькой буквы без точки с пробелами', () => {
  expect(functions.correctSentence("   greetings, friends  ")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с маленькой буквы с точкой без пробелов', () => {
  expect(functions.correctSentence("greetings, friends.")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с маленькой буквы с точкой c пробелами', () => {
  expect(functions.correctSentence("  greetings, friends. ")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с большой буквы без точки без пробелов', () => {
  expect(functions.correctSentence("Greetings, friends")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с большой буквы без точки с пробелами', () => {
  expect(functions.correctSentence("   Greetings, friends  ")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с большой буквы с точкой без пробелов', () => {
  expect(functions.correctSentence("Greetings, friends.")).toBe("Greetings, friends.");
})

test('Проверка корректной строки с большой буквы с точкой с пробелами', () => {
  expect(functions.correctSentence("   Greetings, friends.   ")).toBe("Greetings, friends.");
})
