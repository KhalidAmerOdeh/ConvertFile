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

            // إضافة زر الحذف
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.onclick = () => deleteFileFromDB(file.id);
            listItem.appendChild(deleteButton);

            // إضافة زر التحرير
            const editButton = document.createElement('button');
            editButton.textContent = 'تحرير';
            editButton.onclick = () => editFile(file.id);
            listItem.appendChild(editButton);

            // إضافة زر المشاركة
            const shareButton = document.createElement('button');
            shareButton.textContent = 'مشاركة';
            shareButton.onclick = () => shareFile(file.id);
            listItem.appendChild(shareButton);

            fileList.appendChild(listItem);
        });
    }).catch(error => {
        console.error("حدث خطأ أثناء استرجاع الملفات:", error);
    });
}

// تنزيل الملفات المحفوظة
function downloadFileFromDB(fileId) {
    getFileFromDB(fileId).then(file => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }).catch(error => {
        console.error("حدث خطأ أثناء تنزيل الملف:", error);
    });
}

// حذف الملفات المحفوظة
function deleteFileFromDB(fileId) {
    openDB().then(db => {
        const transaction = db.transaction('files', 'readwrite');
        const store = transaction.objectStore('files');
        const request = store.delete(fileId);

        request.onsuccess = function () {
            alert("تم حذف الملف بنجاح!");
            displayStoredFiles(); // تحديث القائمة بعد الحذف
        };

        request.onerror = function () {
            console.error("فشل حذف الملف");
        };
    }).catch(error => {
        console.error("حدث خطأ أثناء فتح قاعدة البيانات:", error);
    });
}

// تحرير أو تعديل الملفات
function editFile(fileId) {
    getFileFromDB(fileId).then(file => {
        // عرض الملف في واجهة تحرير
        const fileUrl = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = fileUrl;
        document.body.appendChild(img);

        // إضافة أدوات تحرير (مثل اقتصاص الصور)
        // ...
    }).catch(error => {
        console.error("حدث خطأ أثناء استرجاع الملف:", error);
    });
}

// مشاركة الملفات
function shareFile(fileId) {
    getFileFromDB(fileId).then(file => {
        if (navigator.share) {
            navigator.share({
                title: file.name,
                files: [file],
            }).then(() => {
                console.log("تمت المشاركة بنجاح!");
            }).catch(error => {
                console.error("حدث خطأ أثناء المشاركة:", error);
            });
        } else {
            alert("المشاركة غير مدعومة في هذا المتصفح.");
        }
    }).catch(error => {
        console.error("حدث خطأ أثناء استرجاع الملف:", error);
    });
}

// البحث والتصفية
function searchFiles(query) {
    getAllFilesFromDB().then(files => {
        const filteredFiles = files.filter(file => file.name.includes(query));
        displayFilteredFiles(filteredFiles); // عرض الملفات المصفاة
    }).catch(error => {
        console.error("حدث خطأ أثناء البحث:", error);
    });
}

// تصدير الملفات
function exportFiles() {
    getAllFilesFromDB().then(files => {
        const zip = new JSZip(); // استخدام مكتبة JSZip لإنشاء أرشيف
        files.forEach(file => {
            zip.file(file.name, file);
        });

        zip.generateAsync({ type: "blob" }).then(content => {
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'files.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }).catch(error => {
        console.error("حدث خطأ أثناء التصدير:", error);
    });
}

// النسخ الاحتياطي
function backupFiles() {
    getAllFilesFromDB().then(files => {
        const backupData = JSON.stringify(files);
        localStorage.setItem('backup', backupData); // حفظ النسخة الاحتياطية في localStorage
        alert("تم إنشاء نسخة احتياطية بنجاح!");
    }).catch(error => {
        console.error("حدث خطأ أثناء إنشاء النسخة الاحتياطية:", error);
    });
}

// استعادة النسخة الاحتياطية
function restoreBackup() {
    const backupData = localStorage.getItem('backup');
    if (backupData) {
        const files = JSON.parse(backupData);
        openDB().then(db => {
            const transaction = db.transaction('files', 'readwrite');
            const store = transaction.objectStore('files');

            files.forEach(file => {
                store.put(file);
            });

            alert("تم استعادة النسخة الاحتياطية بنجاح!");
            displayStoredFiles(); // تحديث القائمة بعد الاستعادة
        }).catch(error => {
            console.error("حدث خطأ أثناء فتح قاعدة البيانات:", error);
        });
    } else {
        alert("لا توجد نسخة احتياطية محفوظة.");
    }
}

// وظائف مساعدة (افتراضية)
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
                reject(request.error);
            };
        }).catch(error => {
            reject(error);
        });
    });
}

function getFileFromDB(fileId) {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction('files', 'readonly');
            const store = transaction.objectStore('files');
            const request = store.get(fileId);

            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                reject(request.error);
            };
        }).catch(error => {
            reject(error);
        });
    });
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FileStorage', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('files')) {
                db.createObjectStore('files', { keyPath: 'id' });
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

// عرض الملفات المصفاة
function displayFilteredFiles(files) {
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
}
