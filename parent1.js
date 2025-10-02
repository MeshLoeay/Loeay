function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
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

  // ثواني، دقائق، ساعات محسوبة من الفرق الكامل (قد تتضمن جزء من اليوم الحالي)
  let seconds = Math.floor(diffMs / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // -------------------------------
  // حساب الأيام باستخدام الفرق بين التواريخ (UTC) لتجنب أخطاء الوقت داخل اليوم
  // -------------------------------
  // نحسب الفرق بناءً على منتصف الليل لكل تاريخ (UTC) - هذا يضمن أن "اليوم" محسوب كلياً وليس متأثرًا بالساعة
  let utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  let utcBirth = Date.UTC(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  let daysDiff = Math.floor((utcNow - utcBirth) / (1000 * 60 * 60 * 24)); // عدد الأيام الكاملة منذ الميلاد

  let weeks = Math.floor(daysDiff / 7);

  // -------------------------------
  // حساب السنوات/الشهور التفصيلي (سنة + شهر + يوم) كما كان في كودك
  // -------------------------------
  let y = now.getFullYear() - birthDate.getFullYear();
  let m = now.getMonth() - birthDate.getMonth();
  let d = now.getDate() - birthDate.getDate();

  if (d < 0) {
    m--;
    // عدد الأيام في الشهر السابق من now
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  // -------------------------------
  // للحصول على التوافق بين "الاجمالي" و "التفصيلي":
  // استخدم السنوات التفصيلية مباشرة، والشهور الإجمالية تحسب من y و m
  // -------------------------------
  let yearsDiff = y;
  let monthsDiff = y * 12 + m;

  // عرض الأرقام إجمالياً (الأرقام الكلية تحت)
  document.getElementById("years").textContent = yearsDiff.toLocaleString();
  document.getElementById("months").textContent = monthsDiff.toLocaleString();
  document.getElementById("weeks").textContent = weeks.toLocaleString();
  document.getElementById("days").textContent = daysDiff.toLocaleString();
  document.getElementById("hours").textContent = hours.toLocaleString();
  document.getElementById("minutes").textContent = minutes.toLocaleString();
  document.getElementById("seconds").textContent = seconds.toLocaleString();

  // صياغة النص المفصل (سنة + شهر + يوم) مع مراعاة استبدال البادئة حسب الجنس (لو مطلوب)
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
  // حساب المدة المتبقية لعيد الميلاد القادم 🎂 (دقيق تقويمياً)
  // -------------------------------
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // اليوم عند منتصف الليل (لتجنّب أخطاء الوقت داخل اليوم أو DST)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // تاريخ عيد الميلاد في سنة الحالية
  let nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // لو عيد الميلاد قبل اليوم -> نخليه السنة الجاية
  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  // الفرق بالمللي ثانية
  let diffToBday = nextBirthday.getTime() - now.getTime();

  // أيام متبقية محسوبة بدقة (نستخدم UTC للتأكد من تجنّب مشاكل DST)
  let daysToBday = Math.round(
    (Date.UTC(
      nextBirthday.getFullYear(),
      nextBirthday.getMonth(),
      nextBirthday.getDate()
    ) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      MS_PER_DAY
  );

  // دالة تضيف شهور مع الحفاظ على "يوم" إن أمكن، وإذا تجاوزت طول الشهر تصغر لآخر يوم في الشهر
  function addMonthsKeepDay(date, months) {
    const d = new Date(date.getTime());
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() !== day) {
      d.setDate(0); // آخر يوم من الشهر السابق
    }
    return d;
  }

  // نحسب الشهور التقويمية المتبقية (نعد خطوة بخطوة لحد ما نعدي nextBirthday)
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
    if (monthsLeft > 120) break; // حماية من حلقة لا نهائية
  }

  // بعد طرح الشهور التقويمية، نحسب الأيام المتبقية بدقة
  const daysLeft = Math.round(
    (Date.UTC(
      nextBirthday.getFullYear(),
      nextBirthday.getMonth(),
      nextBirthday.getDate()
    ) -
      Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate())) /
      MS_PER_DAY
  );

  // رسالة العرض
  let msg = "";
  let extraLine = "";

  if (y < 18) {
    extraLine = `❤️🥰 <span style="color:gold; font-weight:bold;">كل سنة وانتو طيبين</span> 🥰❤️<br>
    <span style="color:gold; font-weight:bold;">❤️🥰 و عقبال 100 سنه ان شاء الله 🥰❤️</span>`;
  } else {
    extraLine = "الواحد عايش بقاله كتير يا جدعان 😂😂";
  }

  // 🎂 الحالة 1: لو النهارده عيد ميلاده
  if (
    daysToBday === 0 &&
    now.getDate() === birthDate.getDate() &&
    now.getMonth() === birthDate.getMonth()
  ) {
    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">❤️🥰 انهارده يوم مش عادى 🥰❤️</span><br>
    <span style="color:gold; font-weight:bold;">🎂🎉 انهارده عيد ميلادى 🎉🎂</span>`;
  }
  // 🎂 الحالة 2: لو باقي أقل من يوم (countdown بالساعات والدقايق والثواني)
  else if (diffToBday < MS_PER_DAY) {
    let hoursLeft = Math.floor(diffToBday / (1000 * 60 * 60));
    let minutesLeft = Math.floor((diffToBday % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((diffToBday % (1000 * 60)) / 1000);

    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">🎂🎉 فاضل على عيد ميلادك ساعات قليلة 🎉🎂</span><br>
    <span style="color:lightblue; font-weight:bold;">⌛ المدة المتبقية: ${hoursLeft} ساعة و ${minutesLeft} دقيقة و ${secondsLeft} ثانية</span>`;
  }
  // 🎂 الحالة 3: لو ≤ 30 يوم → نعرض بالأيام
  else if (daysToBday <= 30) {
    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">🎂🎉 فاضل على عيد ميلادك ${formatDays(
      daysToBday
    )} 🎉🎂</span><br>
    <span style="color:lightblue; font-weight:bold;">⌛ المدة المتبقية: ${daysToBday} يوم</span>`;
  }
  // 🎂 الحالة 4: باقي شهور + أيام
  else {
    msg = `${extraLine}<br>
    <span style="color:gold; font-weight:bold;">🎂🎉 فاضل على عيد ميلادك ${formatMonths(
      monthsLeft
    )} و ${formatDays(daysLeft)} 🎉🎂</span><br>
    <span style="color:red; font-weight:bold;">⌛ المدة المتبقية: ${daysToBday} يوم</span>`;
  }

  document.getElementById("birthdayLeft").innerHTML = `<h5>${msg}</h5>`;
}
