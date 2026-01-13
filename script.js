function showSection(section) {
    // Abhi ke liye simple alert, baad mein navigation logic add karenge
    console.log("Switching to: " + section);
}

// Qibla Compass Logic (Simulation for Browser)
window.addEventListener('deviceorientation', function(event) {
    if (event.alpha !== null) {
        // 'alpha' is the compass heading in degrees
        let compass = document.getElementById('compass-arrow');
        compass.style.transform = `translateX(-50%) rotate(${event.alpha}deg)`;
    }
});
