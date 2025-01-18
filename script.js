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
