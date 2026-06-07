Cau A1:
Đoạn 1
console.log(x);
var x = 5;
Dự đoán:
undefined
Giải thích:

var được hoisting (đưa khai báo lên đầu scope).

JavaScript hiểu gần như:

var x;
console.log(x);
x = 5;

Nên x tồn tại nhưng chưa có giá trị ⇒ undefined.

Đoạn 2
console.log(y);
let y = 10;
Dự đoán:
ReferenceError
Giải thích:

let cũng hoisting nhưng nằm trong Temporal Dead Zone (TDZ) cho tới khi được khai báo.

Không được truy cập trước dòng:

let y = 10;
Đoạn 3
const z = 15;
z = 20;
console.log(z);
Dự đoán:
TypeError
Giải thích:

const không cho phép gán lại giá trị.

Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
Dự đoán:
[1, 2, 3, 4]
Giải thích:

const không cho đổi tham chiếu object/array, nhưng vẫn được phép sửa nội dung bên trong.

Sai:

arr = [1,2];

Đúng:

arr.push(4);
Đoạn 5
let a = 1;
{
let a = 2;
console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
Dự đoán:
Trong block: 2
Ngoài block: 1
Giải thích:

let có block scope.

Biến a trong {} là biến khác với bên ngoài.

Câu A2 — Data Types & Coercion
console.log(typeof null);

→ "object"

Đây là bug lịch sử của JavaScript.

console.log(typeof undefined);

→ "undefined"

console.log(typeof NaN);

→ "number"

NaN nghĩa là “Not a Number” nhưng kiểu dữ liệu vẫn là number.

console.log("5" + 3);

→ "53"

- với string sẽ nối chuỗi.

console.log("5" - 3);

→ 2

- ép kiểu sang number rồi tính toán.

console.log("5" \* "3");

→ 15

- ép sang number.

console.log(true + true);

→ 2

true = 1

console.log([] + []);

→ ""

Array rỗng chuyển thành chuỗi rỗng.

console.log([] + {});

→ "[object Object]"

[] -> ""

{} -> "[object Object]"

console.log({} + []);

→ 0 (trong nhiều môi trường console)

Giải thích:

{} // bị hiểu là block rỗng
+[] // => 0
Vì sao "5" + 3 khác "5" - 3?
"5" + 3

Toán tử + ưu tiên nối chuỗi nếu có string.

"5" + 3
=> "53"
"5" - 3

Toán tử - chỉ dùng cho toán học nên JS ép kiểu:

"5" -> 5
5 - 3 = 2
Câu A3 — == vs ===
console.log(5 == "5");

→ true

== ép kiểu trước khi so sánh.

console.log(5 === "5");

→ false

=== so sánh cả giá trị lẫn kiểu dữ liệu.

console.log(null == undefined);

→ true

console.log(null === undefined);

→ false

console.log(NaN == NaN);

→ false

NaN không bằng bất kỳ thứ gì, kể cả chính nó.

console.log(0 == false);

→ true

false -> 0

console.log(0 === false);

→ false

console.log("" == false);

→ true

Ép kiểu:

"" -> 0
false -> 0
Nên dùng == hay ===?

Nên dùng:

===

Vì:

Không ép kiểu ngầm
Ít bug hơn
Dễ đoán hơn
Chuẩn hiện đại trong JavaScript

Chỉ dùng == khi thật sự hiểu rõ coercion.

Câu A4 — Truthy & Falsy
TẤT CẢ giá trị Falsy trong JavaScript
false
0
-0
0n
""
null
undefined
NaN

Ngoài các giá trị trên thì hầu như đều là Truthy.

Dự đoán
if ("0") console.log("A");

→ In "A"

"0" là string không rỗng ⇒ truthy.

if ("") console.log("B");

→ Không in

if ([]) console.log("C");

→ In "C"

Array rỗng vẫn truthy.

if ({}) console.log("D");

→ In "D"

if (null) console.log("E");

→ Không in

if (0) console.log("F");

→ Không in

if (-1) console.log("G");

→ In "G"

if (" ") console.log("H");

→ In "H"

Có chứa dấu space nên không phải chuỗi rỗng.

Câu A5 — Template Literals
Cách 1
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
Cách 2
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
Cách 3
var html = `

<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
