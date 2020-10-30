/* 
|   manageMaxVh is a soft fix for the viewHeight
|   measurement issues caused by resizeable browser
|   UI on most mobile devices.
*/

function manageMaxVh() {
    
    /* Return function */
    let maxVh = () => window.innerHeight;

    /* Detect portrait-primary devices */
    const isPortraitDevice = (() => {
        const orientation = 
            screen.orientation || 
            screen.mozOrientation || 
            screen.msOrientation;
    
        if (
            orientation === 'portrait-primary' || 
            orientation.type === 'portrait-primary'
        ) {
            return true;
        };
    })();

    /* Manage maxVh if device is portrait-primary */
    isPortraitDevice && (() => {
        const rootStyle = document.documentElement.style;
        const getOrientation = () => screen.orientation.type || screen.orientation;
    
        let currentHeight = window.innerHeight;
        let currentWidth = window.innerWidth;
        let currentOrientation = getOrientation();

        function checkResize() {
            if (currentWidth === window.innerWidth) {
                return;
            } else if (currentOrientation !== getOrientation()) {
                currentHeight = window.innerHeight;
                currentWidth = window.innerWidth;
                currentOrientation = getOrientation();
                rootStyle.setProperty('--max-vh', currentHeight + 'px');
                maxVh = () => currentHeight;
                return;
            };
    
            /* Release 100vh back to browser on a valid width resize */
            rootStyle.setProperty('--max-vh', '100vh');
            maxVh = () => window.innerHeight;
            window.removeEventListener('resize', checkEvent);
        };
    
        /* Hard set 100vh with the current window.innerHeight */
        rootStyle.setProperty('--max-vh', currentHeight + 'px');
        maxVh = () => currentHeight;

        /* Check for non-orientation width resize */
        window.addEventListener('resize', checkResize);
    })();

    return maxVh;
};

/* THEME */
const rootEl = document.documentElement;

function setInitialTheme() {
    const savedTheme = sessionStorage.getItem('theme');
    savedTheme && rootEl.setAttribute("data-theme", savedTheme);
    rootEl.setAttribute("data-theme-loaded", true);
};

function manageTheme() {
    const themeButton = document.querySelector('button.theme');

    const changeTheme = () => {
        const currTheme = rootEl.getAttribute("data-theme");
        const nextTheme = !currTheme || currTheme === 'light' ? 'dark' : 'light';
        rootEl.setAttribute("data-theme", nextTheme);
        sessionStorage.setItem('theme', nextTheme);
    };

    themeButton.addEventListener('click', changeTheme);
};

/* WATCH HOVER */
function watchForHover() {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0;

    function enableHover() {
        if (new Date() - lastTouchTime < 500) return;
        document.body.classList.add('hasHover');
    };

    function disableHover() {
        document.body.classList.remove('hasHover');
    };

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    };

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

/* INITIATLISE */
(() => {
    manageMaxVh();
    setInitialTheme();
})();

window.addEventListener('DOMContentLoaded', () => {
    watchForHover();
    manageTheme();
});