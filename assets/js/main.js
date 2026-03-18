// date-time handler
function updateTime() {
    const now = new Date();
    
    // date
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        dateDisplay.innerText = now.toLocaleDateString('en-US', dateOptions).toUpperCase();
    }
    
    // blinking time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeHtml = `${hours}<span class="colon">:</span>${minutes}<span class="colon">:</span>${seconds}`;


    const timeDisplay = document.getElementById('time-display');
    const systemTime = document.getElementById('system-time');

    if (timeDisplay) timeDisplay.innerHTML = timeHtml;
    if (systemTime) systemTime.innerHTML = timeHtml;
}

setInterval(updateTime, 1000);
updateTime();


// share buttons
document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (navigator.share) {
                navigator.share({
                    title: 'Arda AKINCI',
                    text: 'Arda AKINCI: ',
                    url: window.location.origin
                }).catch(err => console.log('Sharing cancelled.', err));
            } else {
                alert("Your browser does not support sharing.");
            }
        });
    }
});
