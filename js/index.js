let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

function circle(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawBee(x, y) {
  ctx.lineWidth = 2;

  // Малюємо тіло пчоли з градієнтом
  let gradient = ctx.createRadialGradient(x, y, 2, x, y, 8);
  gradient.addColorStop(0, "gold");
  gradient.addColorStop(1, "orange");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "black";

  // Тіло пчоли
  circle(x, y, 8, true);
  circle(x, y, 8, false);

  // Малюємо вушка пчоли
  ctx.fillStyle = "black"; // Колір вушок
  ctx.beginPath();
  ctx.ellipse(x - 6, y - 10, 5, 7, Math.PI / 4, 0, Math.PI * 2); // Ліве вушко
  ctx.ellipse(x + 6, y - 10, 5, 7, -Math.PI / 4, 0, Math.PI * 2); // Праве вушко
  ctx.fill();

  // Малюємо очі пчоли
  ctx.fillStyle = "black";
  circle(x - 2, y - 3, 2, true); // Ліве око
  circle(x + 2, y - 3, 2, true); // Праве око
}

function update(coordinate, max, radius, offset) {
  coordinate += offset;

  // Обмеження координат з урахуванням радіуса
  if (coordinate > max - radius) {
    coordinate = max - radius;
  }
  if (coordinate < radius) {
    coordinate = radius;
  }

  return coordinate;
}

// Створюємо масив для пчіл
let numBees = 77;
let bees = [];

// Ініціалізуємо пчоли з випадковими координатами та зсувами
for (let i = 0; i < numBees; i++) {
  bees.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    xOffset: Math.random() * 6 - 3, // Випадковий зсув по X
    yOffset: Math.random() * 6 - 3, // Випадковий зсув по Y
  });
}

let beeRadius = 20;

setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Оновлюємо і малюємо кожну пчолу
  for (let bee of bees) {
    drawBee(bee.x, bee.y);
    bee.x = update(bee.x, canvas.width, beeRadius, bee.xOffset);
    bee.y = update(bee.y, canvas.height, beeRadius, bee.yOffset);

    // Змінюємо зсув для наступного кадру
    bee.xOffset = Math.random() * 6 - 3;
    bee.yOffset = Math.random() * 6 - 3;
  }
}, 30);