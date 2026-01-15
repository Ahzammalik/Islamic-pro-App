let quranData = [];

// Data load karne ka function
async function fetchQuran() {
    try {
        const res = await fetch('quran.json');
        quranData = await res.json();
    } catch (e) { console.error("Data load nahi ho saka"); }
}

// Quran Section dikhane ka function
function openQuran() {
    let content = document.getElementById('content');
    let html = '<div class="card"><h3>Surah List</h3><ul class="surah-list">';
    
    quranData.forEach((surah, index) => {
        html += `<li onclick="showSurah(${index})">${surah.id}. ${surah.name}</li>`;
    });
    
    html += '</ul><button onclick="location.reload()" class="btn-main">Back</button></div>';
    content.innerHTML = html;
}

function showSurah(index) {
    let surah = quranData[index];
    let html = `<div class="card"><h3>${surah.name}</h3>`;
    
    surah.verses.forEach(v => {
        html += `<p class="arabic">${v.ar}</p><p class="translation">${v.en}</p><hr>`;
    });
    
    html += '<button onclick="openQuran()" class="btn-main">Back to List</button></div>';
    document.getElementById('content').innerHTML = html;
}

// Page load par data fetch karein
window.onload = fetchQuran;
// Search Feature ke liye logic
function searchSurah() {
    let input = document.getElementById('surahSearch').value.toLowerCase();
    let filtered = quranData.filter(s => s.name.toLowerCase().includes(input));
    renderSurahList(filtered);
}

function renderSurahList(data) {
    let html = `
        <div class="card">
            <input type="text" id="surahSearch" onkeyup="searchSurah()" placeholder="Surah dhoondein (e.g. Fatiha)..." class="search-input">
            <ul class="surah-list">`;
    
    data.forEach((surah) => {
        html += `<li onclick="showSurahById(${surah.id})">
                    <span class="surah-num">${surah.id}</span> 
                    ${surah.name} 
                    <span class="arabic-name">${surah.transliteration}</span>
                 </li>`;
    });
    
    html += '</ul></div>';
    document.getElementById('content').innerHTML = html;
}

// 1. Real-time Digital Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelector('.status-bar').innerText = timeString;
}
setInterval(updateClock, 1000);

// 2. Accurate Compass & Qibla
const QIBLA_KABBA_LAT = 21.4225;
const QIBLA_KABBA_LNG = 39.8262;

function getQiblaDirection() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const qiblaAngle = calculateQibla(latitude, longitude);
            startCompass(qiblaAngle);
        });
    }
}

function calculateQibla(lat, lng) {
    const phiK = QIBLA_KABBA_LAT * Math.PI / 180;
    const lambdaK = QIBLA_KABBA_LNG * Math.PI / 180;
    const phi = lat * Math.PI / 180;
    const lambda = lng * Math.PI / 180;
    
    const y = Math.sin(lambdaK - lambda);
    const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
    let qibla = Math.atan2(y, x) * 180 / Math.PI;
    return (qibla + 360) % 360;
}

function startCompass(targetAngle) {
    window.addEventListener('deviceorientationabsolute', (e) => {
        let heading = e.alpha; // North se angle
        if (heading !== null) {
            // Compass ko North ki taraf rotate karein
            const compass = document.getElementById('compassBody');
            compass.style.transform = `rotate(${-heading}deg)`;
            
            // Qibla needle logic (Agar aap alag needle use kar rahe hain)
            document.querySelector('.degree-text').innerText = `Qibla: ${Math.round(targetAngle)}° | Heading: ${Math.round(heading)}°`;
        }
    }, true);
}
