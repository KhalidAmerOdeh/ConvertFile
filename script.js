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
