function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

// ✅ دالة تمنع أي إدخال غير الأرقام (وتمنع الرموز والعلامات الغريبة)
function allowOnlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, ""); // يحذف أي حاجة غير أرقام
}

// ✅ دالة تحقق من السنة (بين 1900 و 2100 ولازم 4 أرقام)
function validateYear(input) {
  // يسمح بالكتابة لحد 4 أرقام
  if (input.value.length > 4) {
    input.value = input.value.slice(0, 4);
  }

  // التحقق هيكون بعد ما يكتب 4 أرقام
  if (input.value.length === 4) {
    if (input.value < 1900 || input.value > 2100) {
      alert("السنة لازم تكون بين 1900 و 2100");
      input.focus(); // يخلى المستخدم يعدلها بنفسه
    }
  }
}

// ✅ دالة تحقق من اليوم (1 - 31)
function validateDay(input) {
  if (input.value && (input.value < 1 || input.value > 31)) {
    alert("اليوم لازم يكون من 1 لحد 31");
    input.value = "";
    input.focus();
  }
}

// ✅ دالة تحقق من الشهر (1 - 12)
function validateMonth(input) {
  if (input.value && (input.value < 1 || input.value > 12)) {
    alert("الشهر لازم يكون من 1 لحد 12");
    input.value = "";
    input.focus();
  }
}

// دوال صياغة النصوص بالعربي بدون أرقام زائدة
function formatYears(n) {
  if (n === 1) return "سنة";
  if (n === 2) return "سنتين";
  if (n >= 3 && n <= 10) return `${n} سنوات`;
  return `${n} سنة`;
}

function formatMonths(n) {
  if (n === 1) return "شهر";
  if (n === 2) return "شهرين";
  if (n >= 3 && n <= 10) return `${n} شهور`;
  return `${n} شهر`;
}

function formatDays(n) {
  if (n === 1) return "يوم";
  if (n === 2) return "يومين";
  if (n >= 3 && n <= 10) return `${n} أيام`;
  return `${n} يوم`;
}

function calcAge() {
  // اظهار التورته عند الضغط على احسب العمر
  const tortaContainer = document.querySelector(".torta");
  if (tortaContainer) tortaContainer.style.display = "block";

  // إعادة opacity للبالونات للكشف عنها في كل مرة (لو موجود)
  const balloonElement = document.querySelector(".palon");
  if (balloonElement) {
    balloonElement.style.opacity = 1;
    balloonElement.style.transition = ""; // إعادة تعيين أي transition سابقة
  }

  // اخفاء نص الاختيار مؤقتًا
  let genderElement = document.querySelector(".genderp");
  if (genderElement) {
    genderElement.style.display = "none";
  }

  // اخفاء ديف .age في البداية (لو موجود)
  const ageDiv = document.querySelector("#result .age");
  if (ageDiv) ageDiv.style.opacity = 0;

  // اظهار الكعكة والبالونات كل واحد بكلاس مستقل (لو العناصر موجودة)
  const cakeElement = document.querySelector(".cake");
  if (cakeElement) cakeElement.classList.add("cake-show");
  if (balloonElement) balloonElement.classList.add("palon-show");
  if (tortaContainer) tortaContainer.classList.add("torta-show");

  // بعد ثانيتين: اخفاء الكعكة، وإظهار ديف .age تدريجيًا
  setTimeout(() => {
    if (cakeElement) cakeElement.classList.remove("cake-show");
    if (ageDiv) {
      ageDiv.style.transition = "opacity 0.8s ease-in-out";
      ageDiv.style.opacity = 1; // يظهر بعد التورته
    }
  }, 2000);

  // بعد 14 ثانية: اخفاء البالونات تدريجيًا (إن وُجدت)
  setTimeout(() => {
    if (balloonElement) {
      balloonElement.style.transition = "opacity 1.2s ease-in-out";
      balloonElement.style.opacity = 0; // يبدأ الاختفاء التدريجي
      // بعد انتهاء الانتقال نخفي العنصر بالكامل
      setTimeout(() => {
        if (balloonElement) balloonElement.classList.remove("palon-show");
        if (tortaContainer) tortaContainer.style.display = "none";
      }, 1200); // نفس مدة transition
    }
  }, 14000);

  // قراءة القيم
  let day = Number(document.getElementById("day").value);
  let month = Number(document.getElementById("month").value);
  let year = Number(document.getElementById("year").value);

  if (!day || !month || !year) {
    alert("اجى انا اكتبلك تاريخك بالمره");
    return;
  }

  if (year < 1900 || year > 2100 || year.toString().length !== 4) {
    alert("السنة لازم تكون 4 أرقام ما بين 1900 و 2100");
    return;
  }

  let birthDate = new Date(year, month - 1, day);
  let now = new Date();

  if (isNaN(birthDate.getTime())) {
    alert("التاريخ اللي كتبته غير صالح");
    return;
  }

  if (birthDate > now) {
    alert("و دى نحسبهالك ازاى بذكائك");
    return;
  }

  // حساب الفروق الزمنية (ميلي ثانية)
  let diffMs = now.getTime() - birthDate.getTime();

  // ثواني، دقائق، ساعات محسوبة من الفرق الكامل
  let seconds = Math.floor(diffMs / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // حساب الأيام باستخدام UTC
  let utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  let utcBirth = Date.UTC(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  let daysDiff = Math.floor((utcNow - utcBirth) / (1000 * 60 * 60 * 24));

  let weeks = Math.floor(daysDiff / 7);

  // حساب السنوات/الشهور التفصيلي
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

  let yearsDiff = y;
  let monthsDiff = y * 12 + m;

  document.getElementById("years").textContent = yearsDiff.toLocaleString();
  document.getElementById("months").textContent = monthsDiff.toLocaleString();
  document.getElementById("weeks").textContent = weeks.toLocaleString();
  document.getElementById("days").textContent = daysDiff.toLocaleString();
  document.getElementById("hours").textContent = hours.toLocaleString();
  document.getElementById("minutes").textContent = minutes.toLocaleString();
  document.getElementById("seconds").textContent = seconds.toLocaleString();

  let gender = document.querySelector('input[name="gender"]:checked')?.value;
  let prefixText = "";

  if (gender === "male" && y < 4) {
    prefixText =
      '<span style="color:gold;">❤️🥰 الكتكوت الصغنن تم 🥰❤️</span><br>';
  } else if (gender === "female" && y < 4) {
    prefixText =
      '<span style="color:gold;">❤️🥰 الكتكوته الصغننه تمت 🥰❤️</span><br>';
  } else {
    prefixText = "عمرك ";
  }

  let ageText = "";
  if (y >= 1) {
    ageText = `${prefixText}${formatYears(y)}`;
    if (m > 0) ageText += ` و ${formatMonths(m)}`;
    if (d > 0) ageText += ` و ${formatDays(d)}`;
  } else if (m >= 1) {
    ageText = `${prefixText}${formatMonths(m)}`;
    if (d > 0) ageText += ` و ${formatDays(d)}`;
  } else {
    ageText = `${prefixText}${formatDays(d)}`;
  }

  document.getElementById("finalAge").innerHTML = `<h3>${ageText}</h3>`;

  // -------------------------------
  // حساب المدة المتبقية لعيد الميلاد القادم 🎂
  // -------------------------------
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  let diffToBday = nextBirthday.getTime() - now.getTime();

  let daysToBday = Math.round(
    (Date.UTC(
      nextBirthday.getFullYear(),
      nextBirthday.getMonth(),
      nextBirthday.getDate()
    ) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      MS_PER_DAY
  );

  function addMonthsKeepDay(date, months) {
    const d = new Date(date.getTime());
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() !== day) {
      d.setDate(0);
    }
    return d;
  }

  let monthsLeft = 0;
  let temp = new Date(today.getTime());
  while (true) {
    const nextStep = addMonthsKeepDay(temp, 1);
    const nextStepUTC = Date.UTC(
      nextStep.getFullYear(),
      nextStep.getMonth(),
      nextStep.getDate()
    );
    const nbUTC = Date.UTC(
      nextBirthday.getFullYear(),
      nextBirthday.getMonth(),
      nextBirthday.getDate()
    );
    if (nextStepUTC <= nbUTC) {
      monthsLeft++;
      temp = nextStep;
    } else {
      break;
    }
    if (monthsLeft > 120) break;
  }

  const daysLeft = Math.round(
    (Date.UTC(
      nextBirthday.getFullYear(),
      nextBirthday.getMonth(),
      nextBirthday.getDate()
    ) -
      Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate())) /
      MS_PER_DAY
  );

  let msg = "";
  let extraLine = "";

  if (y < 18) {
    extraLine = `❤️🥰 <span style="color:gold; font-weight:bold;">كل سنة وانتو طيبين</span> 🥰❤️<br>
    <span style="color:gold; font-weight:bold;">❤️🥰 و عقبال 100 سنه ان شاء الله 🥰❤️</span>`;
  } else {
    extraLine = "❤️ يا رب بارك لى فى عمرى ❤️";
  }

  // ✅ التعديل هنا
  if (
    daysToBday === 0 &&
    now.getDate() === birthDate.getDate() &&
    now.getMonth() === birthDate.getMonth()
  ) {
    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">❤️🥰 انهارده يوم مش عادى 🥰❤️</span><br>
    <span style="color:gold; font-weight:bold;">🎂🎉 انهارده عيد ميلادى 🎉🎂</span>`;
  } else if (diffToBday < MS_PER_DAY) {
    let hoursLeft = Math.floor(diffToBday / (1000 * 60 * 60));
    let minutesLeft = Math.floor((diffToBday % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((diffToBday % (1000 * 60)) / 1000);

    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">🎂🎉 فاضل على عيد ميلادك ساعات قليلة 🎉🎂</span><br>
    <span style="color:lightblue; font-weight:bold;">⌛ المدة المتبقية: ${hoursLeft} ساعة و ${minutesLeft} دقيقة و ${secondsLeft} ثانية</span>`;
  } else if (daysToBday <= 30) {
    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">🎂🎉 فاضل على عيد ميلادك ${formatDays(
      daysToBday
    )} 🎉🎂</span><br>
    <span style="color:lightblue; font-weight:bold;">⌛ المدة المتبقية: ${daysToBday} يوم</span>`;
  } else {
msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">🎂🎉 فاضل على عيد ميلادك ${formatMonths(
      monthsLeft
    )} و ${formatDays(daysLeft)} 🎉🎂</span><br>
    <span style="
      display: block;
      width: fit-content;
      margin: 5px auto;
      font-size: 12px;
      color: red;
      background-color: white;
      padding: 2px 5px;
      border-radius: 10px;
      font-weight: bold;
    ">⌛ المدة المتبقية: ${daysToBday} يوم</span>`;

  }

  document.getElementById("birthdayLeft").innerHTML = `<h5>${msg}</h5>`;
}
