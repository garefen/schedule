module.exports = {
    showLoader() {
        document.getElementById('loader-wrapper').classList.add('active');
    },
    hideLoader() {
        document.getElementById('loader-wrapper').classList.remove('active');
    }
    
}