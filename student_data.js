const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];


const results = [];

for (let i = 0; i < students.length; i++) {
  const student = students[i];


  const average = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;

  // Xếp loại
  let classification = "";
  if (average >= 8.0) {
    classification = "Giỏi";
  } else if (average >= 6.5) {
    classification = "Khá";
  } else if (average >= 5.0) {
    classification = "Trung bình";
  } else {
    classification = "Yếu";
  }

  results.push({
    name: student.name,
    average: average.toFixed(1),
    classification: classification,
    gender: student.gender,
    math: student.math,
    physics: student.physics,
    cs: student.cs,
  });
}


console.log("\n========== BẢNG KẾT QUẢ ==========");
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < results.length; i++) {
  const r = results[i];
  console.log(
    `| ${i + 1}   | ${r.name.padEnd(6)} | ${r.average.padEnd(4)} | ${r.classification.padEnd(11)} |`,
  );
}


console.log("\n========== THỐNG KÊ XẾP LOẠI ==========");

let countGioi = 0,
  countKha = 0,
  countTrungBinh = 0,
  countYeu = 0;

for (let i = 0; i < results.length; i++) {
  if (results[i].classification === "Giỏi") {
    countGioi++;
  } else if (results[i].classification === "Khá") {
    countKha++;
  } else if (results[i].classification === "Trung bình") {
    countTrungBinh++;
  } else {
    countYeu++;
  }
}

console.log("Giỏi (≥8.0):      " + countGioi + " sinh viên");
console.log("Khá (≥6.5):       " + countKha + " sinh viên");
console.log("Trung bình (≥5.0):" + countTrungBinh + " sinh viên");
console.log("Yếu (<5.0):       " + countYeu + " sinh viên");

console.log("\n========== ĐIỂM CAO NHẤT / THẤP NHẤT ==========");

let maxStudent = results[0];
let minStudent = results[0];

for (let i = 1; i < results.length; i++) {
  if (parseFloat(results[i].average) > parseFloat(maxStudent.average)) {
    maxStudent = results[i];
  }
  if (parseFloat(results[i].average) < parseFloat(minStudent.average)) {
    minStudent = results[i];
  }
}

console.log(
  "Cao nhất: " + maxStudent.name + " với điểm TB = " + maxStudent.average,
);
console.log(
  "Thấp nhất: " + minStudent.name + " với điểm TB = " + minStudent.average,
);


console.log("\n========== ĐIỂM TB TOÀN LỚP ==========");

let sumMath = 0,
  sumPhysics = 0,
  sumCS = 0;

for (let i = 0; i < students.length; i++) {
  sumMath += students[i].math;
  sumPhysics += students[i].physics;
  sumCS += students[i].cs;
}

const avgMath = (sumMath / students.length).toFixed(1);
const avgPhysics = (sumPhysics / students.length).toFixed(1);
const avgCS = (sumCS / students.length).toFixed(1);

console.log("Toán (Math):      " + avgMath);
console.log("Vật lý (Physics): " + avgPhysics);
console.log("Tin học (CS):     " + avgCS);


console.log("\n========== ĐIỂM TB THEO GIỚI TÍNH ==========");

let sumMathM = 0,
  sumPhysicsM = 0,
  sumCSM = 0,
  countM = 0;
let sumMathF = 0,
  sumPhysicsF = 0,
  sumCSF = 0,
  countF = 0;

for (let i = 0; i < students.length; i++) {
  if (students[i].gender === "M") {
    sumMathM += students[i].math;
    sumPhysicsM += students[i].physics;
    sumCSM += students[i].cs;
    countM++;
  } else {
    sumMathF += students[i].math;
    sumPhysicsF += students[i].physics;
    sumCSF += students[i].cs;
    countF++;
  }
}

const avgMathM = (sumMathM / countM).toFixed(1);
const avgPhysicsM = (sumPhysicsM / countM).toFixed(1);
const avgCSM = (sumCSM / countM).toFixed(1);

const avgMathF = (sumMathF / countF).toFixed(1);
const avgPhysicsF = (sumPhysicsF / countF).toFixed(1);
const avgCSF = (sumCSF / countF).toFixed(1);

console.log("\nNam (M):");
console.log("  Toán:     " + avgMathM);
console.log("  Vật lý:   " + avgPhysicsM);
console.log("  Tin học:  " + avgCSM);

console.log("\nNữ (F):");
console.log("  Toán:     " + avgMathF);
console.log("  Vật lý:   " + avgPhysicsF);
console.log("  Tin học:  " + avgCSF);
