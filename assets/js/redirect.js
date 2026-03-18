document.addEventListener('DOMContentLoaded', async () => {
    // get slug
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const slug = pathSegments[pathSegments.length - 1];

    const uiContainer = document.getElementById('redirect-ui');
    const errorContainer = document.getElementById('error-404');
    document.title = "404 - Not Found"; 

    // no slug
    if (!slug) {
        errorContainer.style.display = 'flex';
        return;
    }

    try {
        const response = await fetch('/redirects.json');
        
        if (!response.ok) throw new Error("JSON File Not Found");
        
        const redirects = await response.json();
        const data = redirects[slug];

        // not active or not found
        if (!data || data.is_active === false) {
            errorContainer.style.display = 'flex';
            return;
        }
        
        if (data.auto_redirect && data.delay_ms === 0) {
    document.title = "Redirecting...";
    window.location.replace(data.target_url);
    return;
}

        // fill the ui
        uiContainer.style.display = 'flex';
        
        const titleEl = document.getElementById('ui-title');
        titleEl.innerText = data.title.toUpperCase();
        titleEl.setAttribute('data-text', data.title.toUpperCase());

        document.getElementById('ui-desc').innerText = data.desc;
        document.getElementById('ui-url').innerText = data.target_url;
        document.getElementById('ui-btn').href = data.target_url;

        // fill the meta tags
        document.title = data.title + " | Arda Akıncı";
        document.getElementById('meta-desc').content = data.desc;
        document.getElementById('og-title').content = data.title;
        document.getElementById('og-desc').content = data.desc;

        // autoredirect
        if (data.auto_redirect) {
            let timeLeft = Math.ceil(data.delay_ms / 1000);
            const countdownEl = document.getElementById('ui-countdown');

            if (timeLeft > 0) {
                document.getElementById('ui-subtitle').innerText = "REDIRECTING";
                countdownEl.innerText = `You will be automatically redirected within ${timeLeft} seconds.`;

                const timer = setInterval(() => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        countdownEl.innerText = `You will be automatically redirected within <b>${timeLeft}</b> seconds.`;
                    } else {
                        clearInterval(timer);
                        window.location.replace(data.target_url); // no url history
                    }
                }, 1000);
            } else {
                window.location.replace(data.target_url);
            }
        } else {
            document.getElementById('ui-subtitle').innerText = "LINK READY";
        }

    } catch (e) {
        console.error("Redirect error:", e);
        errorContainer.style.display = 'flex';
    }
});
