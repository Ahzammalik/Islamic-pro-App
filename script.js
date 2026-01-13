// Qibla Rotation Simulation
window.addEventListener('deviceorientation', function(event) {
    let alpha = event.alpha; // Z-axis rotation
    if (alpha !== null) {
        let compass = document.getElementById('compassBody');
        // Qibla angle usually around 295 for Pakistan
        compass.style.transform = `rotate(${-alpha}deg)`;
    }
});

console.log("Islamic Pro App Loaded Successfully!");
