function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

function calcAge() {
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  if (!day || !month || !year) {
    alert("اجى انا اكتبلك تاريخك بالمره");
    return;
  }

  let birthDate = new Date(year, month - 1, day);
  let now = new Date();

  if (birthDate > now) {
    alert("و دى نحسبهالك ازاى بذكائك");
    return;
  }

  let diff = now - birthDate;

  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(days / 30.44);
  let years = Math.floor(months / 12);

  document.getElementById("years").textContent = years.toLocaleString();
  document.getElementById("months").textContent = months.toLocaleString();
  document.getElementById("weeks").textContent = weeks.toLocaleString();
  document.getElementById("days").textContent = days.toLocaleString();
  document.getElementById("hours").textContent = hours.toLocaleString();
  document.getElementById("minutes").textContent = minutes.toLocaleString();
  document.getElementById("seconds").textContent = seconds.toLocaleString();

  // -------------------------------
  // حساب العمر بالتفصيل (سنة + شهر + يوم)
  // -------------------------------
  let y = now.getFullYear() - birthDate.getFullYear();
  let m = now.getMonth() - birthDate.getMonth();
  let d = now.getDate() - birthDate.getDate();

  if (d < 0) {
    m--;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  let ageText = "";

  if (y >= 1) {
    ageText = `عمرك ${y} سنة`;
    if (m > 0) ageText += ` و ${m} شهر`;
    if (d > 0) ageText += ` و ${d} يوم`;
  } else if (m >= 1) {
    ageText = `عمرك ${m} شهر`;
    if (d > 0) ageText += ` و ${d} يوم`;
  } else {
    ageText = `عمرك ${d} يوم`;
  }

  document.getElementById("finalAge").innerHTML = `
    <h3>${ageText}</h3>
  `;

  // -------------------------------
  // حساب المدة المتبقية لعيد الميلاد القادم 🎂
  // -------------------------------
  let nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  let diffToBday = nextBirthday - now;
  let daysToBday = Math.ceil(diffToBday / (1000 * 60 * 60 * 24));

  let msg = "";
  if (daysToBday <= 30) {
    msg = `🎂 فاضل على عيد ميلادك ${daysToBday} يوم 🎉`;
  } else {
    let monthsLeft = Math.floor(daysToBday / 30);
    let daysLeft = daysToBday % 30;
    msg = `الواحد عايش بقاله كتير يا جدعان 😂😂<br>🎂🎉 فاضل على عيد ميلادك ${monthsLeft} شهر و ${daysLeft} يوم 🎉🎂`;
  }

  document.getElementById("birthdayLeft").innerHTML = `<h4>${msg}</h4>`;
}
