document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = `&copy; ${currentYear} Exelita. All rights reserved.`;
    }
});