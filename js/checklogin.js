// Fungsi untuk memeriksa status login di halaman lain
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('aisyahLoggedIn');
  
  if (isLoggedIn !== 'true') {
    // Jika belum login, redirect ke halaman utama
    alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
    window.location.href = 'index.html';
    return false;
  }
  
  // Cek jika sesi masih valid (24 jam)
  const loginTime = localStorage.getItem('aisyahLoginTime');
  const currentTime = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  
  if (currentTime - loginTime > twentyFourHours) {
    // Sesi expired
    alert('Sesi login telah berakhir. Silakan login kembali.');
    logout();
    return false;
  }
  
  return true;
}

// Fungsi untuk logout
function logout() {
  localStorage.removeItem('aisyahLoggedIn');
  localStorage.removeItem('aisyahLoginTime');
  window.location.href = 'index.html';
}

// Jalankan pengecekan saat halaman dimuat
function initProtectedPage() {
  // Cek jika halaman saat ini bukan index.html
  const currentPage = window.location.pathname.split('/').pop();
  const isIndexPage = currentPage === 'index.html' || currentPage === '';
  
  if (!isIndexPage) {
    const isLoggedIn = checkLoginStatus();
    
    // Tambahkan event listener untuk tombol logout
    const logoutButtons = document.querySelectorAll('[onclick*="logout"]');
    logoutButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
      });
    });
    
    // Tambahkan event listener untuk tombol logout dengan class/id
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
      });
    }
    
    return isLoggedIn;
  }
}

// Panggil fungsi inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initProtectedPage);