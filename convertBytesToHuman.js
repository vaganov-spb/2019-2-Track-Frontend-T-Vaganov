/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

function convertBytesToHuman(bytes) {
  
  if (!isPositiveInt(bytes)) return false;

  if (bytes === 0) return "0 B";
  
  let degree = 0;
  let converted_info = bytes;
  while (converted_info / 1024 >= 1) {
    degree++;
    converted_info /= 1024;
    if (degree === 8) break;
  }

  const dim = informationUnit(degree);
  if (dim === false) return false;

  
  if (!Number.isInteger(converted_info)) {
    let a = converted_info * 100;
    let last_digit_zero = Math.round(a)
    if (last_digit_zero % 10 == 0) {
      converted_info = converted_info.toFixed(1);
    } else {
      converted_info = converted_info.toFixed(2);
    }  
  }  
    //converted_info = converted_info.toFixed(2);
  return `${converted_info} ${dim}`;
}

function isPositiveInt(bytes) {
  if (Number.isInteger(bytes) && bytes >= 0) return true;
  return false;
}

function informationUnit(num) {
  switch (num) {
    case 0:
      return "B";
    case 1:
      return "KB";
    case 2:
      return "MB";
    case 3:
      return "GB";
    case 4:
      return "TB";
    case 5:
      return "PB";
    case 6:
      return "EB";
    case 7:
      return "ZB";
    case 8:
      return "YB";
    default:
      return false;
  }
}

module.exports = {convertBytesToHuman, isPositiveInt, informationUnit};
