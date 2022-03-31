// Assignment code here
var lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
var capitalCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var numberCharacters = '1234567890';
var specialCharacters = '!@#$%^&*()_+}{":?><~'
function generatePassword() {
  var passwordLength = document.getElementById("myRange").value;
  var include = [document.getElementById("lowercase").checked, document.getElementById("capital").checked, document.getElementById("number").checked, document.getElementById("special").checked];
  if (include[0] || include[1] || include[2] || include[3]){
  //check length is between 8-128
  if (passwordLength < 8) {
    passwordLength = 8;
  } 
  else if (passwordLength > 128) {
    passwordLength = 128;
  }
  //take the length of the password and split the total number of characters into 1-4 random groups of at least 1
  //finding the toral number of groups that we need to split our length into
  var groups = 0;
  for (let i = 0; i < 4; i++) {
    if (include[i]) {
      groups++;
    }
  }
  //generate a list of all numbers between 1 and the length of the password
  var groupSize = [];
  for (let i = 1; i <= passwordLength-1; i++) {
    groupSize.push(i);
  }
  shuffle(groupSize);
  //removes the numbers we dont need leaving us with the breaking points for our character groups
  groupSize = groupSize.slice(0, groups-1);
  //orders the breaking points
  groupSize = groupSize.sort((a,b) => a - b);
  //getting the total number of each type of character we need to generate
  var numOfEach = [];
  if (groups > 1){
  for (let i = 0; i <= groupSize.length; i++) {
    if (i == 0){
      numOfEach.push(groupSize[0]);
    }else if (i > 0 && i != groupSize.length) {
      numOfEach.push(groupSize[i]-groupSize[i-1]);
    }else if (i == groupSize.length){
      numOfEach.push(passwordLength-groupSize[i-1]);
    }
  }
} else {
  numOfEach.push(passwordLength);
}
  //insert 0 to corispond with any character types not used into sting of numOfEach
  var zeros = [0, 0, 0, 0]
  for (let i = 0; i <= 4; i++) {
    if (include[i])
    zeros[i] = 1;
  }
  var n = 0;
  for (let i = 0; i <= 4; i++) {
    if (zeros[i] == 1){
      zeros[i] = zeros[i]*numOfEach[n];
      n++;
    }
  }
  numOfEach = zeros;
  //generate n characters of each type
  var passwordArr = [];
  //store random characters into array
  //generate lowercase letters
  if (numOfEach[0] > 0){
    for (let i = 0; i < numOfEach[0]; i++) {
      passwordArr.push(randChar(1, lowercaseCharacters));
    }
  }
  //generate capital letters  
  if (numOfEach[1] > 0){
    for (let i = 0; i < numOfEach[1]; i++) {
      passwordArr.push(randChar(1, capitalCharacters));
    }
  }
  //generate numbers
  if (numOfEach[2] > 0){
    for (let i = 0; i < numOfEach[2]; i++) {
      passwordArr.push(randChar(1, numberCharacters));
    } 
  }
  //generate special characters  
  if (numOfEach[3] > 0){
    for (let i = 0; i < numOfEach[3]; i++) {
      passwordArr.push(randChar(1, specialCharacters));
    }
  }
  //shuffle array into a random order
  shuffle(passwordArr);
  return passwordArr.join("");
  } else {
    return "Oops! Looks like you didn't select any criteria for your new password, please selcet at least one and try again.";
  }
} 


//convert array into a string and output sting to password

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
//fuction to shuffle the array into a random order
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function randChar(length, set) {
  var result = '';
  var characters = set;
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
