// Offline Quran Data Load Karne Ka Function
async function loadQuran() {
    try {
        const response = await fetch('quran.json');
        const data = await response.json();
        console.log("Quran Data Loaded:", data);
        
        // Example: Pehli Surah ki pehli ayat dikhana
        document.querySelector('.arabic').innerText = data[0].ayat[0].arabic;
        document.querySelector('.translation').innerText = data[0].ayat[0].urdu;
    } catch (error) {
        console.log("Error loading offline data:", error);
    }
}

// App start hote hi data load karein
window.onload = loadQuran;
