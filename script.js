// دالة للكشف عن الأجهزة المحمولة
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// دالة لإعادة التوجيه إلى الموقع المطلوب
function redirectToSite() {
    if (isMobileDevice()) {
        window.location.href = "https://khalidamerodeh.github.io/ConvertFile";
    } else {
        alert("هذه الميزة متاحة فقط للأجهزة المحمولة.");
    }
}

// إنشاء زر "حمل الملف" ديناميكيًا
const button = document.createElement('button');
button.textContent = 'حمل الملف';
button.style.backgroundColor = '#007bff';
button.style.color = '#fff';
button.style.padding = '10px 20px';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.margin = '20px';

// إضافة حدث النقر على الزر
button.addEventListener('click', redirectToSite);

// إضافة الزر إلى body الصفحة
document.body.appendChild(button);

// إضافة نص توضيحي
const message = document.createElement('p');
message.textContent = 'اضغط على الزر أعلاه إذا كنت تستخدم هاتفًا محمولًا.';
message.style.marginTop = '10px';
document.body.appendChild(message);
