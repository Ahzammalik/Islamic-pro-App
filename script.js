// 1. Navigation Logic
function switchTab(tabId, el) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId + '-section').classList.add('active');
    
    // Update Nav Icons
    if(el) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        el.classList.add('active');
    }
}

// 2. Real-Time Clock
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('live-clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }, 1000);
}

// 3. Hardware Compass Logic
function initCompass() {
    if (window.DeviceOrientationEvent) {
        // iOS Permission Check
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then(state => {
                if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation);
            });
        } else {
            window.addEventListener('deviceorientationabsolute', handleOrientation);
            window.addEventListener('deviceorientation', handleOrientation);
        }
    }
}

function handleOrientation(event) {
    let alpha = event.webkitCompassHeading || event.alpha;
    if (alpha !== null) {
        const disk = document.getElementById('compassDisk');
        disk.style.transform = `rotate(${-alpha}deg)`;
        document.getElementById('qibla-status').innerText = "Heading: " + Math.round(alpha) + "°";
    }
}

// Initializations
window.onload = () => {
    startClock();
    // Start compass on first click (Browser Policy)
    document.body.addEventListener('click', initCompass, {once: true});
};
// Nav Tab Switch
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId + '-section').classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if(el) el.classList.add('active');

    if(tabId === 'quran') loadSurahList();
}

// Load Surah List
function loadSurahList() {
    const container = document.getElementById('surah-list-container');
    let html = '<div style="display:grid; gap:10px;">';
    
    quranData.forEach((surah) => {
        html += `
            <div class="surah-item" onclick="showSurah(${surah.id - 1})" 
                 style="background:white; padding:15px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <span style="background:var(--primary); color:white; width:25px; height:25px; border-radius:50%; display:flex; justify-content:center; align-items:center; font-size:10px;">${surah.id}</span>
                <div style="flex:1; margin-left:15px; text-align:left;">
                    <b style="color:var(--primary);">${surah.name}</b><br>
                    <small style="color:#888;">${surah.trans}</small>
                </div>
                <i class="fas fa-chevron-right" style="color:#ccc;"></i>
            </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Show Verses
function showSurah(index) {
    const container = document.getElementById('surah-list-container');
    const surah = quranData[index];
    
    let html = `<button onclick="loadSurahList()" class="btn-primary" style="margin-bottom:15px; width:100%;">Back to List</button>`;
    html += `<div class="card"><h3>${surah.name}</h3>`;
    
    surah.verses.forEach(v => {
        html += `
            <div style="border-bottom:1px solid #eee; padding:15px 0;">
                <p class="arabic-text" style="font-size:24px; direction:rtl;">${v.ar}</p>
                <p style="text-align:left; color:#666; font-size:14px;">${v.ur}</p>
            </div>`;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}
