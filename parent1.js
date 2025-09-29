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
    // alert("تاريخ الميلاد أكبر من التاريخ الحالي!");
    alert("و دى نحسبهالك ازاى");
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
}
