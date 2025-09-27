let days = document.querySelector(".ch1 span");
let hours = document.querySelector(".ch2 span");
let minutes = document.querySelector(".ch3 span");
let seconds = document.querySelector(".ch4 span");

// التاريخ اللي العداد هيقف عنده (1 أكتوبر الساعة 00:00)
let endDate = new Date("2025-11-01T00:00:00").getTime();

function updateTimer() {
  let now = new Date().getTime();
  let diff = endDate - now; // الفرق بالمللي ثانية

  if (diff <= 0) {
    clearInterval(counter);
    days.textContent = 0;
    hours.textContent = 0;
    minutes.textContent = 0;
    seconds.textContent = 0;
    return;
  }

  // التحويل
  let d = Math.floor(diff / (1000 * 60 * 60 * 24));
  let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let s = Math.floor((diff % (1000 * 60)) / 1000);

  days.textContent = d;
  hours.textContent = h;
  minutes.textContent = m;
  seconds.textContent = s;
}

let counter = setInterval(updateTimer, 1000);
updateTimer(); // أول تشغيل مباشرة
