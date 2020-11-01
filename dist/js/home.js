/* MOUSE INTERACTIONS */

function listenProficiencyClick() {
    /* Document Vars */
    const proficiencyButton = document.querySelector('button.proficiencies');
    const mode = proficiencyButton.querySelector('.mode');
    const arrow = proficiencyButton.querySelector('.arrow');
    const techList = document.querySelector('button.proficiencies ~ .tech-list');

    /* Internal Vars */
    let toggled = false;
    const refreshListHeight = function () { techList.style.maxHeight = techList.scrollHeight + 'px'; };

    /* Assign Event Listener */
    proficiencyButton.addEventListener('click', function() {
        if (toggled) {
            mode.innerHTML = 'See';
            arrow.innerHTML = '&#9660;';
            techList.style.maxHeight = 0;
            window.removeEventListener('resize', refreshListHeight);
        } else {
            mode.innerHTML = 'Hide';
            arrow.innerHTML = '&#9650;';
            refreshListHeight();
            window.addEventListener('resize', refreshListHeight);
        };

        toggled = !toggled;
    });
};

function listenTileMouseOvers() {
    /* Document Var */
    const overTriggers = document.querySelectorAll('.over-trigger');

    /* Assign Event Listeners */
    overTriggers.forEach(function(trigger) {
        const group = trigger.closest('.group');

        trigger.addEventListener('mouseover', function() {
            group.classList.add('focussed');
        });

        trigger.addEventListener('mouseleave', function() {
            group.classList.remove('focussed');
        });
    });
};

function listenProjectLink() {
    /* Document Var */
    const projLinks = document.querySelectorAll('.proj-link');

    /* Assign Event Listeners */
    projLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const target = e.currentTarget;
            const scrollToTop = function() {
                window.scrollTo({top: 0, behavior: 'smooth'});
            };
            const changePage = function() {
                window.location.href = target.href;
            };

            /* Change page when all scrolling stops */
            let scrollTimeout;

            window.addEventListener('scroll', function() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(changePage, 50);
            });

            /* Override user scroll during transition */
            window.addEventListener('wheel', function(wheelE) {
                wheelE.preventDefault();
                scrollToTop();
            });

            /* Initiate scroll */
            window.pageYOffset > 0 ? scrollToTop() : changePage();
        });
    });
};

/* SCROLL INTERACTIONS */

function observeTilePositions() {
    /* Document Var */
    const tiles = document.querySelectorAll('.tile');

    /* Add Focus When Center is Higher Than 50% Viewport */
    function checkDocumentPosition(el) {
        const group = el.closest('.group');
        const isFocussed = group.classList.contains('focussed');

        const measures = el.getBoundingClientRect();
        const height = measures.height;
        const top = measures.top;

        const pageHeight = window.innerHeight;
        const shouldFocus = top <= pageHeight/2 - height/2;

        if (isFocussed && !shouldFocus) {
            group.classList.remove('focussed');
        } else if (!isFocussed && shouldFocus) {
            group.classList.add('focussed');
        };
    };

    tiles.forEach(function (tile) {
        checkDocumentPosition(tile);
        window.addEventListener('scroll', function() { checkDocumentPosition(tile) });
    });
};

/* INITIATLISE */

(function() {
    const supportsHover = !(matchMedia('(hover: none)').matches);
    
    listenProficiencyClick();
    listenProjectLink();
    supportsHover ? listenTileMouseOvers() : observeTilePositions();
})();