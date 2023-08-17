const crypto = require("crypto");

let counter = 1;

const digits = {
  16: "0123456789abcdef",
  64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-",
};

function encode(num, base = 64) {
  let result = "";

  if (num === 0) {
    return 0;
  }
  
  while (num) {
    const rem = num % base;
    result += digits[base][rem];
    num = Math.floor(num / base);
  }

  return result.split("").reverse().join("");
}

function decode(num, base = 64) {
  let result = 0;
  let place = 0;

  for (let index = num.length - 1; index >= 0; index--) {
    result += base ** place * digits[base].indexOf(num[index]);
    place++;
  }

  return result;
}

function createUrlHash(url) {
  let bitVector = "";

  const buffer = crypto
    .createHash("md5")
    .update(url + counter++)
    .digest();

  for (const item of buffer) {
    bitVector += item.toString(2).padStart(8, "0");
  }

  return bitVector;
}
// 127 - 6

function extractBits(vector) {
  let result = "";
  let start = 127 - 5;
  let iter = 6;

  while (iter) {
    const number = Number.parseInt(vector.substr(start, 6), 2);
    result += encode(number);
    iter--;
    start -= 5;
  }

  return result;
}

const bits1 = createUrlHash("https://www.youtube.com/");
console.log(extractBits(bits1));

const bits2 = createUrlHash("https://www.youtube.com/");
console.log(extractBits(bits2));

const bits3 = createUrlHash("https://www.youtube.com/");
console.log(extractBits(bits3));

const bits4 = createUrlHash("https://mail.google.com/mail/u/0/#inbox");
console.log(extractBits(bits4));

// module.exports = {
//   encode,
//   decode,
// };

// console.log(encode(45));
// console.log(encode(242));
// console.log(encode(165));
// console.log(encode(64));
// console.log(encode(165));

// console.log(encode(1_000_000_000, 64));
// console.log(encode(10_000_000_000_001, 64));

// 20_000_000_000 => 2 * 10**10 => 2 * 2**34 => 2 ** 35 =>

// 1 => 2 ** 10 => 10
// 10**9 => 2**30 => 30
// 10**9 => 2**30 => 30
// 2 ** 10  => 10
// 2 ** 10  => 10

// console.log(decode("2hxesG00"));
// console.log(decode("2hxesG01"));

// 100;
// 50 | 0;
// 25 | 0 | 0;
// 12 | 1 | 0 | 0;
// 6 | 0 | 1 | 0 | 0;
// 3 | 0 | 0 | 1 | 0 | 0;
// 1 | 1 | 0 | 0 | 1 | 0 | 0;
