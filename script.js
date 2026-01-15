const quranData = [
    {id: 1, name: "Al-Fatiha", trans: "The Opening", verses: [{ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", ur: "Allah ke naam se shuru."}, {ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", ur: "Sab tareef Allah ke liye."}]},
    {id: 2, name: "Al-Baqarah", trans: "The Cow", verses: [{ar: "الٓمٓ", ur: "Alif Laam Meem"}]},
    // ... data can be expanded here
];

// List generation for 50 Surahs
const names = ["Al-Fatiha", "Al-Baqarah", "Aal-E-Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf"];

function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    // Find active icon logic
    if(tabName === 'quran') loadSurahList();
}

function loadSurahList() {
    let listHtml = '';
    names.forEach((name, i) => {
        listHtml += `
            <div class="surah-item" onclick="showVerses(${i})">
                <span class="surah-num">${i+1}</span>
                <div style="flex:1"><b>${name}</b></div>
                <i class="fas fa-chevron-right" style="color:#ccc"></i>
            </div>`;
    });
    document.getElementById('surah-list').innerHTML = listHtml;
}

function showVerses(index) {
    const surah = quranData[index] || {name: names[index], verses: [{ar: "Ayat loading...", ur: "Data adds soon"}]};
    let vHtml = `<button onclick="loadSurahList()" class="btn-gold" style="width:100%; margin-bottom:15px">Back</button><h3>${surah.name}</h3>`;
    surah.verses.forEach(v => {
        vHtml += `<div class="card"><p class="arabic-text">${v.ar}</p><p style="text-align:left; color:#666">${v.ur}</p></div>`;
    });
    document.getElementById('surah-list').innerHTML = vHtml;
}

// Clock
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}, 1000);

// Compass Hardware Start
document.body.addEventListener('click', () => {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientationabsolute', (e) => {
            if(e.alpha) document.getElementById('compassDisk').style.transform = `rotate(${-e.alpha}deg)`;
            document.getElementById('qibla-status').innerText = "Compass Active";
        }, true);
    }
}, {once: true});
