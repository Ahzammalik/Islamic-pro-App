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
