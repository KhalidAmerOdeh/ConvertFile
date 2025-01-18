// وظائف JavaScript

// عرض نافذة التأكيد عند النقر على زر التحويل
function convertFile() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    } else {
        console.error("عنصر confirmationModal غير موجود!");
    }
}

// تأكيد التحويل وإغلاق النافذة
function confirmConversion() {
    alert("تم التحويل بنجاح!");
    closeModal();
}

// إغلاق نافذة التأكيد
function closeModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
    } else {
        console.error("عنصر confirmationModal غير موجود!");
    }
}

// ضغط الملف
function compressFile() {
    alert("تم الضغط بنجاح!");
}

// تنزيل الملف تلقائيًا وتخزينه
function downloadFile(fileUrl, fileName) {
    fetch(fileUrl) // جلب الملف من الرابط
        .then(response => response.blob()) // تحويل الملف إلى Blob
        .then(blob => {
            const link = document.createElement('a'); // إنشاء عنصر <a>
            const url = URL.createObjectURL(blob); // إنشاء رابط مؤقت للـ Blob
            link.href = url; // تعيين الرابط المؤقت
            link.download = fileName; // تعيين اسم الملف
            document.body.appendChild(link); // إضافة العنصر إلى DOM
            link.click(); // تنشيط النقر لبدء التنزيل
            document.body.removeChild(link); // إزالة العنصر من DOM
            URL.revokeObjectURL(url); // تحرير الرابط المؤقت
            alert("تم تنزيل الملف وتخزينه بنجاح!");
        })
        .catch(error => {
            console.error("حدث خطأ أثناء تنزيل الملف:", error);
            alert("فشل تنزيل الملف. يرجى المحاولة مرة أخرى.");
        });
}

// التمرير السلس إلى أعلى الصفحة
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// إظهار أو إخفاء زر العودة للأعلى بناءً على موضع التمرير
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    } else {
        console.error("عنصر backToTop غير موجود!");
    }
};
