/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

function correctSentence(text) {
  if(isEmptyString(text)) { 
    return '';
  }

  let sentence = text.trim();

  if (sentence.charCodeAt(0) < 65 || sentence.charCodeAt(0) > 122 || (90 < sentence.charCodeAt(0) && sentence.charCodeAt(0) < 97)) {
    return -666;          
    //-666 - POISON value, means that the first character is not a letter
  } else if (89 < sentence.charCodeAt(0) && sentence.charCodeAt(0) < 123) {
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  
  if (!sentence.endsWith('.')) sentence += '.';
  
  return sentence;
}

 function isEmptyString(text) {
   return (text === '' || text.trim() === '');
 }

 module.exports = {correctSentence, isEmptyString}
