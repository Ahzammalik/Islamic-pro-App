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
