// fizzbuzz.js - FizzBuzz Classic + Custom

// ============================================
// VERSION 1: Classic FizzBuzz
// ============================================
console.log("===== VERSION 1: CLASSIC FIZZBUZZ (1-100) =====\n");

for (let i = 1; i <= 100; i++) {
  let output = "";

  if (i % 3 === 0) {
    output += "Fizz";
  }
  if (i % 5 === 0) {
    output += "Buzz";
  }

  console.log(output || i);
}

// ============================================
// VERSION 2: Custom FizzBuzz
// ============================================
console.log("\n\n===== VERSION 2: CUSTOM FIZZBUZZ =====\n");

function customFizzBuzz(n, rules) {
  const results = [];

  for (let i = 1; i <= n; i++) {
    let output = "";

    // Apply all rules
    for (let j = 0; j < rules.length; j++) {
      if (i % rules[j].divisor === 0) {
        output += rules[j].word;
      }
    }

    results.push(output || i);
  }

  return results;
}

// Test Case 1: Classic FizzBuzz
console.log("Test 1: Classic FizzBuzz (1-30)");
const result1 = customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
]);

for (let i = 0; i < result1.length; i++) {
  process.stdout.write(result1[i] + " ");
  if ((i + 1) % 10 === 0) {
    console.log();
  }
}

// Test Case 2: FizzBuzzJazz (with 7)
console.log("\n\nTest 2: FizzBuzzJazz (1-30) with divisor 3, 5, 7");
const result2 = customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
]);

for (let i = 0; i < result2.length; i++) {
  process.stdout.write(result2[i] + " ");
  if ((i + 1) % 10 === 0) {
    console.log();
  }
}

// Test Case 3: Show specific results
console.log("\n\nTest 3: Kiểm tra các số đặc biệt:");
const testNumbers = [3, 5, 7, 15, 21, 35, 105];
const result3 = customFizzBuzz(105, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
]);

for (let i = 0; i < testNumbers.length; i++) {
  const num = testNumbers[i];
  console.log(`${num} = "${result3[num - 1]}"`);
}

// Test Case 4: Custom rules (even, odd, multiple of 4)
console.log("\n\nTest 4: Custom rules - Even, Odd, Quad (1-20)");
const result4 = customFizzBuzz(20, [
  { divisor: 2, word: "Even" },
  { divisor: 4, word: "Quad" },
]);

for (let i = 0; i < result4.length; i++) {
  process.stdout.write(result4[i] + " ");
  if ((i + 1) % 10 === 0) {
    console.log();
  }
}

// ============================================
// VERSION 3: Advanced with console table
// ============================================
console.log("\n\n===== VERSION 3: DETAILED ANALYSIS =====\n");

const detailedResult = [];
const rules = [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
];

for (let i = 1; i <= 35; i++) {
  let output = "";
  let divisibleBy = [];

  for (let j = 0; j < rules.length; j++) {
    if (i % rules[j].divisor === 0) {
      output += rules[j].word;
      divisibleBy.push(rules[j].divisor);
    }
  }

  detailedResult.push({
    Number: i,
    "Divisible By": divisibleBy.join(", ") || "-",
    Result: output || i,
  });
}

console.table(detailedResult);

// Export for use in Node.js or browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { customFizzBuzz };
}
