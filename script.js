function updateTime() {
    const now = new Date();
    
    const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    document.getElementById('date-display').innerText = now.toLocaleDateString('en-US', dateOptions).toUpperCase();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('time-display').innerHTML = `${hours}<span class="colon">:</span>${minutes}<span class="colon">:</span>${seconds}`;
}

setInterval(updateTime, 1000);
updateTime();
