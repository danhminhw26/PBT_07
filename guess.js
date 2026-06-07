
let secretNumber;
let attempts = 0;
let maxAttempts = 7;
let guessedNumbers = [];

function startGame() {
  // Reset game state
  secretNumber = Math.floor(Math.random() * 100) + 1; // 1-100
  attempts = 0;
  maxAttempts = 7;
  guessedNumbers = [];

  // Clear result
  document.getElementById("result").innerHTML = "";

  // Start guessing loop
  playGame();
}

function playGame() {
  while (attempts < maxAttempts) {
    const input = prompt(
      `Đoán số (1-100)\nLần đoán: ${attempts + 1}/${maxAttempts}\nSố đã đoán: ${guessedNumbers.length > 0 ? guessedNumbers.join(", ") : "chưa có"}`,
    );

    // User cancel
    if (input === null) {
      alert("Bạn đã thoát game!");
      document.getElementById("result").innerHTML =
        "❌ Bạn đã thoát! Đáp án là: " + secretNumber;
      return;
    }

    // Validate input
    const guess = parseInt(input);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert("❌ Vui lòng nhập một số từ 1 đến 100!");
      continue;
    }

    // Check if already guessed
    if (guessedNumbers.includes(guess)) {
      alert(`⚠️ Bạn đã đoán số ${guess} rồi!`);
      continue;
    }

    attempts++;
    guessedNumbers.push(guess);

    // Check the guess
    if (guess === secretNumber) {
      showWinMessage();
      return;
    } else if (guess < secretNumber) {
      alert(`📈 Cao hơn! Bạn đã đoán ${attempts}/${maxAttempts} lần`);
    } else {
      alert(`📉 Thấp hơn! Bạn đã đoán ${attempts}/${maxAttempts} lần`);
    }
  }

  // Game over - lost
  showLoseMessage();
}

function showWinMessage() {
  const message = `🎉 CHÚC MỪNG! Bạn đoán đúng sau ${attempts} lần!\nĐáp án: ${secretNumber}`;
  alert(message);
  document.getElementById("result").innerHTML =
    `<span style="color: green;">✅ Bạn đoán đúng sau ${attempts} lần!</span>`;
}

function showLoseMessage() {
  const message = `😢 Bạn đã hết lượt!\nĐáp án là: ${secretNumber}\nCác số bạn đoán: ${guessedNumbers.join(", ")}`;
  alert(message);
  document.getElementById("result").innerHTML =
    `<span style="color: red;">❌ Game Over! Đáp án: ${secretNumber}</span>`;
}

module.exports = { startGame };
