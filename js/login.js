// Password yang benar: tanggal lahir Aisyah Hanan (contoh: 15072003)
const correctPassword = "210109";

function checkPassword() {
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');
  const lockScreen = document.getElementById('lockScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (passwordInput.value === correctPassword) {
    // Password benar
    lockScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Tambahkan efek transisi
    mainContent.classList.add('animate__animated', 'animate__fadeIn');
    
    // Simpan status login di localStorage
    localStorage.setItem('aisyahLoggedIn', 'true');
    localStorage.setItem('aisyahLoginTime', new Date().getTime());
  } else {
    // Password salah
    errorMessage.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
    
    // Tambahkan efek shake pada input
    passwordInput.classList.add('animate__animated', 'animate__shakeX');
    setTimeout(() => {
      passwordInput.classList.remove('animate__animated', 'animate__shakeX');
    }, 1000);
  }
}

function initLoginPage() {
  const passwordInput = document.getElementById('passwordInput');
  
  if (passwordInput) {
    // Memungkinkan untuk menekan Enter untuk submit password
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkPassword();
      }
    });
    
    // Fokus ke input password saat halaman dimuat
    passwordInput.focus();
  }
  
  // Cek jika sudah login
  const isLoggedIn = localStorage.getItem('aisyahLoggedIn');
  const lockScreen = document.getElementById('lockScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (isLoggedIn === 'true' && lockScreen && mainContent) {
    // Cek jika sesi masih valid (24 jam)
    const loginTime = localStorage.getItem('aisyahLoginTime');
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (currentTime - loginTime < twentyFourHours) {
      lockScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
      mainContent.classList.add('animate__animated', 'animate__fadeIn');
    } else {
      // Sesi expired, hapus data login
      localStorage.removeItem('aisyahLoggedIn');
      localStorage.removeItem('aisyahLoginTime');
    }
  }
}

// Panggil fungsi inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initLoginPage);