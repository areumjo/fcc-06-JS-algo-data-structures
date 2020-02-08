/* 
  JS Algorithms and Data Structures Projects 01
  ** Palindrome Checker **
*/

function palindrome(str) {

  // check input
  // 1) all str ==> convert to lowercase
  // 2) str +a ==> use regular expression, omit non-alphanumeric characters
  
  // reg-exp
  let regexp = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase();;

  let laststr = regexp.replace(/\s/g, "");
  console.log('laststr: ', laststr);

  // remove whitespace
  let reversedStr = '';
  for (let i=laststr.length-1; i>-1; i--) {
    reversedStr = reversedStr + laststr[i]
    
  }
  console.log('reversed: ', reversedStr);
  return (laststr === reversedStr)? true : false;
}

palindrome("_eye");
palindrome("Race car")
palindrome("0_0 (: /-\ :) 0-0");


/*
  ** Caesars Cipher **
*/

function rot13(str) { // LBH QVQ VG!

  // get plain and cipher
  let plain = "ABCDEFGHIJKLMNOPQRSTUVWXYZ `~!@#$%^&*()_|+\-=?;:',.<>";
  let cipher = "NOPQRSTUVWXYZABCDEFGHIJKLM `~!@#$%^&*()_|+\-=?;:',.<>";

  // use for loop --> get index from plain 
  // use index plain --> get cipher

  let result = [];
  let testarr = [];

  for (let i=0; i<str.length; i++) {
    testarr.push(plain.indexOf(str[i])) 
  }
  // console.log(testarr);

  for (let i=0; i<testarr.length; i++) {
    result.push(cipher[testarr[i]]);
  }
  console.log(result.join(''));
  return result.join('');
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
rot13("SERR CVMMN!");
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");


/*
  ** Roman Numeral Converter **
*/
function convertToRoman(num) {

  /*
  {
    1-3 : I, II (1+1), III (1+1+1)
    4 : IV (5-1)
    5 : V
    6-8 : VI (5+1), VII (5+1+1), VIII (5+1+1+1)
    9 : IX (10-1)
    10, 20 : X (10), XX (10+10)
    40 : XL (50-10)
    50 : L (50)
    100 : C
    400 : CD
    500 : D
    1000 : M
  }
  */

  let romandata = {
    'M': 1000,
    'CM': 900,
    'D': 500,
    'CD': 400,
    'C': 100,
    'XC': 90,
    'L': 50,
    'XL': 40,
    'X': 10,
    'IX': 9,
    'V': 5,
    'IV': 4,
    'I': 1,
  };

  let result = '';
  let i;
  for (i in romandata) {
    console.log('i from for: ', i)
    while (num >= romandata[i]) {
      result += i;
      console.log('result: ', result, ' i: ', i);
      num -= romandata[i];
      console.log('num: ', num);
    }
  }
  return result; 
}


/*
  ** Telephone Number Validator **
*/
function telephoneCheck(str) {

  // check input
  // if there is special character other than - and () -- false
  // #  space  ### space||-||()|| ###  ####
  // -- true
  // use regexp 

  var phoneregexp = /^[1]?[- ]?\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
  if (str.match(phoneregexp)) {
    if (str.includes('(') && str.includes(')')) {
      console.log('true include:' , str)
      return true;
    } else if (str.includes('(') || str.includes(')')) {
      console.log('false include:' , str)
      return false;
    }
    return true;
  }
  else {
    return false;
  }
}

telephoneCheck("555-555-5555");
telephoneCheck("2 (757) 622-7382");


/*
  ** Cash Register **
*/
function checkCashRegister(price, cash, cid) {
  let cashArr = cid.map(e => e[1]*100),
      converted = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000],
      rawChange = ((cash - price)*100),
      result = [["PENNY", 0],  ["NICKEL", 0],  ["DIME", 0],  ["QUARTER", 0],  ["ONE", 0],  ["FIVE", 0],  ["TEN", 0],  ["TWENTY", 0],  ["ONE HUNDRED", 0]],
      change = {status: "", change: []};
  /*This loop will do all the math at *100 to avoid rounding errors, it runs through the cashArr backwards finding
  the highest denomination of each possible change it can until the change hits 0 
  */   
  for (let i = cashArr.length - 1; i >= 0; i--) {
    while(cashArr[i] > 0) {
      if (rawChange - converted[i] >= 0) {
        result[i][1] += converted[i];
        rawChange -= converted[i];
        cashArr[i] -= converted[i];       
      } else { break; }
    }
    if (rawChange === 0) {break;}
  }
  /*This loop will go through the result Array and divide any number that's not 0 by 100 to get us back to the 
  proper format. 
  */  
  for (let i = result.length -1;i >= 0; i--){
    if (result[i][1] !== 0){
      result[i][1] = result[i][1]/100
    }
  }
  /*This if logic will check if we have zeroed the change (meaning we had enough proper change), if not, we send
  the insufficient funds message.
  */
  if (rawChange !== 0) {
    change.status = "INSUFFICIENT_FUNDS";
    return change;
  }
  /*This if logic will check if we had enough change as well as if result is the same as cid(meaning there was
  exactly enough change), if so it sends the closed message.
  */ 
  else if (rawChange === 0 && JSON.stringify(result)==JSON.stringify(cid)) {    
    change.status = "CLOSED";
    change.change = result;
    return change;        
  }
  /*Anything else will have to be we had enough change with change left over, so we send the open message after
  we reverse the results array and remove all entries that have a 0 for value. This creates the array needed for
  output.
  */ 
  else {  
    result = result.filter(e => e[1] !== 0).reverse();  
    change.status = "OPEN";
    change.change = result;
    return change;
  }
}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
