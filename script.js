// وظائف JavaScript
function convertFile() {
    document.getElementById('confirmationModal').style.display = 'flex';
}

function confirmConversion() {
    alert("تم التحويل بنجاح!");
    closeModal();
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function compressFile() {
    alert("تم الضغط بنجاح!");
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('backToTop').style.display = 'block';
    } else {
        document.getElementById('backToTop').style.display = 'none';
    }
};