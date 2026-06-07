// restaurant_bill.js - Tính hóa đơn nhà hàng

// ============================================
// Dữ liệu đơn hàng
// ============================================
const orderItems = [
  { name: "Phở bò", price: 65000, quantity: 2 },
  { name: "Trà đá", price: 5000, quantity: 3 },
  { name: "Bún chả", price: 55000, quantity: 1 },
  { name: "Cơm tấm", price: 50000, quantity: 1 },
  { name: "Bánh mì", price: 15000, quantity: 2 },
];

// Cấu hình tính toán
const config = {
  vatRate: 0.08, // 8%
  tipRate: 0.05, // 5%
  discount500k: 0.1, // 10% nếu > 500k
  discount1m: 0.15, // 15% nếu > 1 triệu
  discountWednesday: 0.05, // thêm 5% vào thứ 3
};

// ============================================
// Hàm tính hóa đơn
// ============================================
function calculateBill(items, applyTip = true, currentDate = new Date()) {
  // 1. Tính tổng cộng
  let subtotal = 0;
  const itemDetails = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    itemDetails.push({
      index: i + 1,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: itemTotal,
    });
  }

  // 2. Tính discount
  let discountPercent = 0;

  if (subtotal > 1000000) {
    discountPercent = config.discount1m; // 15%
  } else if (subtotal > 500000) {
    discountPercent = config.discount500k; // 10%
  }

  // Thêm discount nếu là thứ 3 (Wednesday = 3)
  if (currentDate.getDay() === 3) {
    discountPercent += config.discountWednesday; // +5%
  }

  const discountAmount = subtotal * discountPercent;
  const afterDiscount = subtotal - discountAmount;

  // 3. Tính VAT
  const vatAmount = afterDiscount * config.vatRate;

  // 4. Tính tip
  const tipAmount = applyTip ? afterDiscount * config.tipRate : 0;

  // 5. Tổng thanh toán
  const totalPayment = afterDiscount + vatAmount + tipAmount;

  return {
    itemDetails: itemDetails,
    subtotal: subtotal,
    discountPercent: discountPercent,
    discountAmount: discountAmount,
    afterDiscount: afterDiscount,
    vatAmount: vatAmount,
    tipAmount: tipAmount,
    totalPayment: totalPayment,
    isWednesday: currentDate.getDay() === 3,
  };
}

// ============================================
// Hàm format tiền tệ
// ============================================
function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

// ============================================
// Hàm in hóa đơn
// ============================================
function printBill(bill, restaurantName = "HÓA ĐƠN NHÀ HÀNG") {
  const width = 45;
  const line = "═".repeat(width - 2);
  const itemLine = "─".repeat(width - 2);

  console.log("╔" + line + "╗");
  console.log("║" + centerText(restaurantName, width - 2) + "║");
  console.log("╠" + line + "╣");

  // In danh sách items
  for (let i = 0; i < bill.itemDetails.length; i++) {
    const item = bill.itemDetails[i];
    const itemStr = formatItemLine(
      item.index,
      item.name,
      item.quantity,
      item.price,
      item.total,
    );
    console.log("║ " + itemStr + " ║");
  }

  console.log("╠" + line + "╣");

  // Tổng cộng
  let row1 =
    padRight("Tổng cộng:", width - 20) +
    padLeft(formatCurrency(bill.subtotal), 15);
  console.log("║ " + row1 + " ║");

  // Giảm giá
  const discountPercent = (bill.discountPercent * 100).toFixed(0);
  let row2 =
    padRight(`Giảm giá (${discountPercent}%):`, width - 20) +
    padLeft(formatCurrency(bill.discountAmount), 15);
  console.log("║ " + row2 + " ║");

  if (bill.isWednesday) {
    console.log("║ " + padRight("(Bao gồm -5% ngày thứ 3)", width - 2) + " ║");
  }

  // VAT
  let row3 =
    padRight("VAT (8%):", width - 20) +
    padLeft(formatCurrency(bill.vatAmount), 15);
  console.log("║ " + row3 + " ║");

  // Tip
  let row4 =
    padRight("Tip (5%):", width - 20) +
    padLeft(formatCurrency(bill.tipAmount), 15);
  console.log("║ " + row4 + " ║");

  console.log("╠" + line + "╣");

  // Thanh toán
  let row5 =
    padRight("THANH TOÁN:", width - 20) +
    padLeft(formatCurrency(bill.totalPayment), 15);
  console.log("║ " + row5 + " ║");

  console.log("╚" + line + "╝");
}

// ============================================
// Hàm helper format
// ============================================
function centerText(text, width) {
  const padding = Math.floor((width - text.length) / 2);
  return " ".repeat(padding) + text + " ".repeat(width - padding - text.length);
}

function padRight(text, width) {
  return text + " ".repeat(Math.max(0, width - text.length));
}

function padLeft(text, width) {
  return " ".repeat(Math.max(0, width - text.length)) + text;
}

function formatItemLine(index, name, qty, price, total) {
  const part1 = index + ". " + padRight(name, 15);
  const part2 = "x" + qty;
  const part3 = "@" + formatCurrency(price).padStart(10);
  const part4 = "= " + formatCurrency(total).padStart(10);

  return part1 + part2.padStart(3) + " " + part3 + " " + part4;
}

// ============================================
// TEST CASES
// ============================================
console.log("\n========== TEST 1: Hóa đơn thường ngày ==========\n");
const bill1 = calculateBill(orderItems, true);
printBill(bill1);

console.log("\n========== TEST 2: Hóa đơn ngày thứ 3 (Wednesday) ==========\n");
// Tạo ngày thứ 3 (day 3)
const wednesdayDate = new Date();
wednesdayDate.setDate(
  wednesdayDate.getDate() + ((3 - wednesdayDate.getDay() + 7) % 7),
);
const bill2 = calculateBill(orderItems, true, wednesdayDate);
printBill(bill2, "HÓA ĐƠN NHÀ HÀNG (Ngày thứ 3)");

console.log(
  "\n========== TEST 3: Hóa đơn > 1 triệu (15% discount) ==========\n",
);
const bigOrder = [
  { name: "Lẩu 2 người", price: 450000, quantity: 1 },
  { name: "Thịt bò Mỹ", price: 300000, quantity: 1 },
  { name: "Tôm sú", price: 250000, quantity: 1 },
  { name: "Rau/nước ngọt", price: 100000, quantity: 1 },
];
const bill3 = calculateBill(bigOrder, true);
printBill(bill3, "HÓA ĐƠN NHÀ HÀNG (Đơn lớn)");

console.log("\n========== TEST 4: Hóa đơn không có tip ==========\n");
const bill4 = calculateBill(orderItems, false);
printBill(bill4, "HÓA ĐƠN NHÀ HÀNG (Không tip)");

// ============================================
// Export cho Node.js
// ============================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateBill, printBill, formatCurrency };
}
