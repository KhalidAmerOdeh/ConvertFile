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

// فتح أو إنشاء قاعدة بيانات IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FileStorageDB', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('files')) {
                db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject('فشل فتح قاعدة البيانات');
        };
    });
}

// حفظ الملف في IndexedDB
function saveFileToDB(file) {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction('files', 'readwrite');
            const store = transaction.objectStore('files');
            const request = store.add(file);

            request.onsuccess = function () {
                resolve('تم حفظ الملف بنجاح');
            };

            request.onerror = function () {
                reject('فشل حفظ الملف');
            };
        }).catch(error => {
            reject(error);
        });
    });
}

// استرجاع جميع الملفات من IndexedDB
function getAllFilesFromDB() {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction('files', 'readonly');
            const store = transaction.objectStore('files');
            const request = store.getAll();

            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                reject('فشل استرجاع الملفات');
            };
        }).catch(error => {
            reject(error);
        });
    });
}

// تنزيل الملف وحفظه في IndexedDB
function downloadAndStoreFile(fileUrl, fileName) {
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], fileName, { type: blob.type });
            saveFileToDB(file).then(() => {
                alert("تم حفظ الملف في التطبيق بنجاح!");
                displayStoredFiles(); // عرض الملفات المحفوظة بعد الحفظ
            }).catch(error => {
                console.error("حدث خطأ أثناء حفظ الملف:", error);
                alert("فشل حفظ الملف. يرجى المحاولة مرة أخرى.");
            });
        })
        .catch(error => {
            console.error("حدث خطأ أثناء تنزيل الملف:", error);
            alert("فشل تنزيل الملف. يرجى المحاولة مرة أخرى.");
        });
}

// عرض الملفات المحفوظة
function displayStoredFiles() {
    getAllFilesFromDB().then(files => {
        const fileList = document.getElementById('savedFiles');
        fileList.innerHTML = ''; // مسح القائمة الحالية

        files.forEach(file => {
            const listItem = document.createElement('li');
            const fileUrl = URL.createObjectURL(file);

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = fileUrl;
                img.style.maxWidth = '100px';
                img.style.marginRight = '10px';
                listItem.appendChild(img);
            }

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = file.name;
            link.textContent = file.name;
            listItem.appendChild(link);

            fileList.appendChild(listItem);
        });
    }).catch(error => {
        console.error("حدث خطأ أثناء استرجاع الملفات:", error);
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

// عرض الملفات المحفوظة عند تحميل الصفحة
window.onload = displayStoredFiles;
