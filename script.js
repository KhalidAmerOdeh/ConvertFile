// عناصر واجهة المستخدم
const imageInput = document.getElementById('imageInput'); // عنصر إدخال الصورة
const uploadButton = document.getElementById('uploadButton'); // زر التحميل
const imagePreview = document.getElementById('imagePreview'); // عنصر لعرض الصورة
const imageLink = document.getElementById('imageLink'); // عنصر لعرض الرابط

// عند النقر على زر التحميل
uploadButton.addEventListener('click', () => {
    const file = imageInput.files[0]; // الحصول على الملف المحدد

    if (file && file.type.startsWith('image/')) {
        // تحويل الصورة إلى رابط مباشر
        const imageUrl = URL.createObjectURL(file);

        // عرض الصورة
        imagePreview.src = imageUrl;
        imagePreview.style.display = 'block';

        // عرض الرابط
        imageLink.href = imageUrl;
        imageLink.textContent = imageUrl;
        imageLink.style.display = 'block';

        // إضافة زر لنسخ الرابط
        const copyButton = document.createElement('button');
        copyButton.textContent = 'نسخ الرابط';
        copyButton.onclick = () => {
            navigator.clipboard.writeText(imageUrl).then(() => {
                alert("تم نسخ الرابط بنجاح!");
            }).catch(() => {
                alert("فشل نسخ الرابط. يرجى المحاولة يدويًا.");
            });
        };
        imageLink.parentNode.appendChild(copyButton);
    } else {
        alert("يرجى اختيار ملف صورة صالح.");
    }
});
