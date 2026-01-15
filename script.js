// Global variable to store list
let allSurahs = [];

// 1. Navigation Tab Logic
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    if(tabName === 'quran') {
        loadSurahList();
    }
}

// 2. Fetch All Surahs List from API
async function loadSurahList() {
    const listContainer = document.getElementById('surah-list');
    listContainer.innerHTML = '<div class="loader">Quran Pak Load ho raha hai...</div>';

    try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        allSurahs = data.data;

        let listHtml = '';
        allSurahs.forEach((surah) => {
            listHtml += `
                <div class="surah-item" onclick="fetchSurahDetail(${surah.number})">
                    <span class="surah-num">${surah.number}</span>
                    <div style="flex:1">
                        <b>${surah.englishName}</b><br>
                        <small>${surah.englishNameTranslation}</small>
                    </div>
                    <div style="text-align:right">
                        <span class="arabic-text" style="font-size:18px">${surah.name}</span>
                    </div>
                </div>`;
        });
        listContainer.innerHTML = listHtml;
    } catch (error) {
        listContainer.innerHTML = '<p style="color:red">Internet connection check karein.</p>';
    }
}

// 3. Fetch Complete Ayats of Selected Surah
async function fetchSurahDetail(surahNumber) {
    const listContainer = document.getElementById('surah-list');
    listContainer.innerHTML = '<div class="loader">Ayats load ho rahi hain...</div>';

    try {
        // Arabic text aur Urdu translation dono aik sath fetch ho rahi hain
        const resArabic = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const resUrdu = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ur.jalandhry`);
        
        const dataAr = await resArabic.json();
        const dataUr = await resUrdu.json();

        let vHtml = `
            <button onclick="loadSurahList()" class="btn-gold" style="width:100%; margin-bottom:15px">
                <i class="fas fa-arrow-left"></i> Back to List
            </button>
            <div class="card" style="text-align:center">
                <h2>${dataAr.data.name}</h2>
                <p>${dataAr.data.englishNameTranslation}</p>
            </div>`;

        dataAr.data.ayahs.forEach((ayah, index) => {
            vHtml += `
                <div class="card" style="text-align:right">
                    <span class="surah-num" style="float:left">${ayah.numberInSurah}</span>
                    <p class="arabic-text" style="font-size:24px; margin-bottom:10px">${ayah.text}</p>
                    <p style="text-align:left; color:#555; font-size:14px; direction:ltr">
                        ${dataUr.data.ayahs[index].text}
                    </p>
                </div>`;
        });
        listContainer.innerHTML = vHtml;
    } catch (error) {
        listContainer.innerHTML = '<p>Ayat load karne mein masla hua.</p>';
    }
}

// Clock logic
setInterval(() => {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}, 1000);

// Compass Start
document.body.addEventListener('click', () => {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientationabsolute', (e) => {
            if(e.alpha) document.getElementById('compassDisk').style.transform = `rotate(${-e.alpha}deg)`;
        }, true);
    }
}, {once: true});
