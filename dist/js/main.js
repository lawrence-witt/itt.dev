/* 
|   manageMaxVh is a soft fix for the viewHeight
|   measurement issues caused by resizeable browser
|   UI on most mobile devices.
*/

function manageMaxVh() {
    
    /* Return function */
    let maxVh = function() { return window.innerHeight };

    /* Detect portrait-primary devices */
    const isPortraitDevice = (function() {
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
    isPortraitDevice && (function() {
        const rootStyle = document.documentElement.style;
        const getOrientation = function() { return screen.orientation.type || screen.orientation; };
    
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
                maxVh = function() { return currentHeight; };
                return;
            };
    
            /* Release 100vh back to browser on a valid width resize */
            rootStyle.setProperty('--max-vh', '100vh');
            maxVh = function() { return window.innerHeight; };
            window.removeEventListener('resize', checkEvent);
        };
    
        /* Hard set 100vh with the current window.innerHeight */
        rootStyle.setProperty('--max-vh', currentHeight + 'px');
        maxVh = function() { return currentHeight; };

        /* Check for non-orientation width resize */
        window.addEventListener('resize', checkResize);
    })();

    return maxVh;
};

/* THEME */

const rootEl = document.documentElement;

function confirmTheme() {
    const rootTheme = rootEl.getAttribute("data-theme");
    const themeCookie = document.cookie.split('; ').find(function (row) { return row.startsWith('theme') });
    const parsedTheme = themeCookie ? themeCookie.split('=')[1] : null;

    window.requestAnimationFrame(function() {
        if (parsedTheme && parsedTheme !== rootTheme) {
            rootEl.setAttribute("data-theme", parsedTheme);
        };
        window.requestAnimationFrame(function() {
            rootEl.setAttribute("data-theme-loaded", true);
        });
    });
};

function manageTheme() {
    const themeButton = document.querySelector('button.theme');

    const changeTheme = function() {
        const sunDisplay = getComputedStyle(document.querySelector('.sun')).display;
        const nextTheme = sunDisplay === 'none' ? 'dark' : 'light';

        rootEl.setAttribute("data-theme", nextTheme);
        document.cookie = 'theme='+nextTheme+';SameSite=Lax';
    };

    themeButton.addEventListener('click', changeTheme);
};

/* SCROLL RESTORE */

function restoreScroll() {
    const savedScrolls = JSON.parse(sessionStorage.getItem('savedScrolls'));
    if (savedScrolls) {
        const record = savedScrolls.find(function (scroll) { 
            return scroll.location === window.location.href;
        });
        record && window.scrollTo({top: document.getElementById(record.target).offsetTop, behavior: 'smooth'});
        const newScrolls = savedScrolls.filter(function (scroll) { 
            return scroll.location !== window.location.href;
        });
        sessionStorage.setItem('savedScrolls', JSON.stringify(newScrolls));
    }
};

function clearScroll() {
    const savedScrolls = JSON.parse(sessionStorage.getItem('savedScrolls'));
    if (savedScrolls) {
        const newScrolls = savedScrolls.filter(function (scroll) { 
            return scroll.location !== window.location.href 
        });
        sessionStorage.setItem('savedScrolls', JSON.stringify(newScrolls));
    }
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

(function() {
    manageMaxVh();
})();

window.addEventListener('load', function() {
    clearScroll();
});

window.addEventListener('pageshow', function() {
    confirmTheme();
    restoreScroll();
});

window.addEventListener('DOMContentLoaded', function() {
    watchForHover();
    manageTheme();
});