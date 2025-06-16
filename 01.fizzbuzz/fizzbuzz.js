#!/usr/bin/env node

let arr = [...Array(20).keys()].map((i) => i + 1);

arr.forEach((number) => {
  if (number % 15 === 0) {
    console.log("FizzBuzz");
  } else if (number % 3 === 0) {
    console.log("Fizz");
  } else if (number % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(number.toString());
  }
});
