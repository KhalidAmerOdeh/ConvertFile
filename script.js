// دالة للكشف عن الأجهزة المحمولة
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// دالة لفتح الموقع داخل iframe
function openSiteInIframe() {
    if (isMobileDevice()) {
        // إنشاء iframe
        const iframe = document.createElement('iframe');
        iframe.src = "https://khalidamerodeh.github.io/ConvertFile";
        iframe.style.width = "100%";
        iframe.style.height = "100vh"; // ارتفاع كامل للشاشة
        iframe.style.border = "none";

        // إضافة iframe إلى body
        document.body.innerHTML = ''; // مسح محتوى الصفحة الحالي
        document.body.appendChild(iframe);
    } else {
        alert("هذه الميزة متاحة فقط للأجهزة المحمولة.");
    }
}

// دالة لتحويل صيغ الفيديو
function convertVideoFormat(file, targetFormat) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const videoBlob = new Blob([event.target.result], { type: file.type });
        const videoUrl = URL.createObjectURL(videoBlob);

        // هنا يمكنك استخدام مكتبة مثل FFmpeg.js لتحويل الفيديو
        // مثال: ffmpeg.ffmpeg(videoUrl, targetFormat, function(convertedVideo) {
        //     // معالجة الفيديو المحول
        // });

        console.log(`تم تحميل الفيديو: ${file.name}`);
        console.log(`الصيغة المستهدفة: ${targetFormat}`);
        console.log(`رابط الفيديو: ${videoUrl}`);
    };
    reader.readAsArrayBuffer(file);
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
button.addEventListener('click', openSiteInIframe);

// إضافة الزر إلى body الصفحة
document.body.appendChild(button);

// إضافة نص توضيحي
const message = document.createElement('p');
message.textContent = 'اضغط على الزر أعلاه إذا كنت تستخدم هاتفًا محمولًا.';
message.style.marginTop = '10px';
document.body.appendChild(message);

// إضافة عنصر input لتحميل الفيديو
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'video/*';
fileInput.style.marginTop = '20px';
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const targetFormat = 'mp4'; // يمكن تغيير الصيغة المستهدفة هنا
        convertVideoFormat(file, targetFormat);
    }
});
document.body.appendChild(fileInput);
