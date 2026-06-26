// Data Pertanyaan Kuis (Silakan ubah sesuai materi HMI Anda)
const quizData = [
    { question: "Apa kepanjangan dari HMI?", options: ["Himpunan Mahasiswa Islam", "Himpunan Masyarakat Islam", "Himpunan Mahasiswa Indonesia", "Himpunan Muda Islam"], correct: 0 },
    { question: "Kapan HMI didirikan?", options: ["5 Februari 1947", "17 Agustus 1945", "28 Oktober 1928", "10 November 1945"], correct: 0 },
    { question: "Siapakah pemrakarsa berdirinya HMI?", options: ["Soekarno", "Lafran Pane", "Mohammad Hatta", "Jenderal Sudirman"], correct: 1 },
    { question: "Apa pedoman dasar dan moral kompas kader hmi?", options: ["NDP", "Pancasila", "UUD 1945", "Peraturan Organisasi"], correct: 0 },
    { question: "Pertanyaan Level 5 (Ubah disini)", options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], correct: 1 },
    { question: "Pertanyaan Level 6 (Ubah disini)", options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], correct: 2 },
    { question: "Pertanyaan Level 7 (Ubah disini)", options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], correct: 3 },
    { question: "Pertanyaan Level 8 (Ubah disini)", options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], correct: 0 },
    { question: "Pertanyaan Level 9 (Ubah disini)", options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], correct: 1 },
    { question: "Pertanyaan Level 10 (Ubah disini)", options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], correct: 2 }
];

let currentLevel = 0;
const totalLevels = quizData.length;

// Mengambil elemen DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const levelTitle = document.getElementById("level-title");
const car = document.getElementById("car");
const markersContainer = document.getElementById("markers");

// Inisialisasi Game
function initGame() {
    createMarkers();
    loadQuestion();
    updateCarPosition();
}

// Membuat penanda nomor di jalan
function createMarkers() {
    for (let i = 1; i <= totalLevels; i++) {
        const marker = document.createElement("div");
        marker.classList.add("marker");
        marker.innerText = i;
        markersContainer.appendChild(marker);
    }
}

// Memuat pertanyaan berdasarkan level saat ini
function loadQuestion() {
    if (currentLevel >= totalLevels) {
        gameWin();
        return;
    }

    const currentQuiz = quizData[currentLevel];
    levelTitle.innerText = `Level ${currentLevel + 1} dari ${totalLevels}`;
    questionText.innerText = currentQuiz.question;
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Cek Jawaban
function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentLevel].correct;

    if (selectedIndex === correctIndex) {
        // Jawaban Benar -> Lanjut level
        currentLevel++;
        updateCarPosition();
        loadQuestion();
    } else {
        // Jawaban Salah -> Mengulang ke awal (Sesuai logika game strategi)
        alert("Jawaban Salah! Game diulang ke Level 1.");
        currentLevel = 0;
        updateCarPosition();
        loadQuestion();
    }
}

// Menggerakkan posisi mobil (CSS Left property)
function updateCarPosition() {
    // Menghitung persentase posisi berdasarkan level (dari 2% awal hingga 85% di akhir)
    const position = 2 + (currentLevel * (83 / (totalLevels - 1 || 1)));
    car.style.left = `${position}%`;
}

// Logika Menang
function gameWin() {
    levelTitle.innerText = "Selamat!";
    questionText.innerText = "Anda telah menyelesaikan semua level dengan benar!";
    optionsContainer.innerHTML = `<button class="option-btn" onclick="location.reload()" style="grid-column: span 2; background: #f1c40f;">Main Lagi</button>`;
}
// ... (Kode pertanyaan kuis dan logika game Anda yang sebelumnya tetap di atas sini)

// =========================================
// LOGIKA LOADING SCREEN & PROGRESS BAR
// =========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    let progress = 0;
    
    // Simulasi proses memuat data dari 0% hingga 100%
    const loadingInterval = setInterval(() => {
        // Menambah persentase secara acak antara 5% hingga 15%
        progress += Math.floor(Math.random() * 10) + 5; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval); // Hentikan hitungan
            
            // Perbarui tampilan ke 100%
            progressBar.style.width = progress + '%';
            progressText.innerText = progress + '%';
            
            // Beri jeda 0.5 detik di angka 100% sebelum layar memudar
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        } else {
            // Perbarui tampilan lebar bar dan teks angka
            progressBar.style.width = progress + '%';
            progressText.innerText = progress + '%';
        }
    }, 150); // Kecepatan update setiap 150 milidetik
});
// Mulai
initGame();