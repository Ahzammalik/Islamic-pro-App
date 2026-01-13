// Qibla Angle (For Pakistan/Karachi approx 258° - 260° from North)
const QIBLA_DEGREE = 258; 

function initCompass() {
    if (window.DeviceOrientationEvent) {
        // iOS devices ke liye permission mangna zaroori hai
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        window.addEventListener('deviceorientation', handler, true);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handler, true);
        }
    }
}

function handler(e) {
    let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    let compassBody = document.getElementById('compassBody');
    
    // Qibla direction ki calculation
    // Hum needle ko ghumayenge taake wo Kaaba ki taraf rahe
    let qiblaDirection = QIBLA_DEGREE - compass;
    compassBody.style.transform = `rotate(${-compass}deg)`;
    
    // Status update
    document.querySelector('.degree-text').innerText = `${Math.round(compass)}° ${getDirection(compass)}`;
}

function getDirection(deg) {
    if (deg >= 337.5 || deg < 22.5) return 'North';
    if (deg >= 247.5 && deg < 292.5) return 'West';
    // ... baki directions bhi add kar sakte hain
    return '';
}

// User jab screen par click kare tab compass start ho (Browser policy)
document.body.addEventListener('click', initCompass, {once: true});
