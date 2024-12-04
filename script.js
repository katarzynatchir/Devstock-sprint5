'use strict';
//Zadanie 1

const people = [
  {
    firstName: false,
    lastName: 2,
  },
  {
    firstName: 'Roman',
    lastName: 'Kowalski',
  },

  {
    firstName: 'Halina',
    lastName: 'Malina',
  },
  {
    firstName: 'B',
    lastName: '22',
  },
  {
    firstName: 'Jan',
    lastName: 'Nowak',
  },
  {
    firstName: 'Kamil',
    lastName: null,
  },
];

function reverseString(str) {
  const reverseStr = str.toLowerCase().split('').reverse().join('');
  return reverseStr;
}

function firstLetterToUppercase(str) {
  const modStr = str[0].toUpperCase() + str.slice(1);
  return modStr;
}

const arrayWithNicknames = people.map(obj => {
  if (typeof obj.firstName === 'string' && typeof obj.lastName === 'string') {
    if (obj.firstName.length >= 3 && obj.lastName.length >= 3) {
      const { firstName, lastName } = obj;
      const reverseSliceName = reverseString(firstName.slice(-3));
      const reverseSliceSurname = reverseString(lastName.slice(0, 3));
      const nickname = firstLetterToUppercase(
        reverseSliceName + reverseSliceSurname
      );
      obj.nickname = nickname;
    }
  }
  return obj;
});

console.log('arrayWithNicknames:', arrayWithNicknames);

//Zadanie 2

const peopleWithNicknames = arrayWithNicknames.filter(user => user.nickname);

const peopleWithAge = peopleWithNicknames.map((el, index) => {
  const sum = el.firstName.length + el.lastName.length;
  if (sum % 2 === 0) {
    el.age = sum;
  } else {
    const keysSum = Object.keys(el).reduce((acc, curr) => acc + curr.length, 0);
    index !== 0 ? (el.age = keysSum / index) : (el.age = keysSum);
  }
  return el;
});

console.log('peopleWithAge:', peopleWithAge);

//Zadanie 3

const peopleWithLetters = peopleWithAge.map((person, index, arr) => {
  const data = {};
  let maximum = 0;
  let maxLetter = '';
  const str = (
    person.firstName +
    person.lastName +
    person.nickname
  ).toLowerCase();

  for (let letter of str) {
    if (data[letter]) {
      data[letter]++;
    } else {
      data[letter] = 1;
    }
  }
  // console.log(str);
  // console.log(data);

  for (const letter in data) {
    if (data[letter] > maximum) {
      maximum = data[letter];
      maxLetter = letter;
    } else if (data[letter] === maximum) {
      letter < maxLetter ? (maxLetter = letter) : maxLetter;
    }
  }
  person.mostCommonLetter = { letter: maxLetter, count: maximum };
  return person;
});
console.log('peopleWithLetters:', peopleWithLetters);
