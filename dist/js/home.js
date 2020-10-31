/* MOUSE INTERACTIONS */

function listenProficiencyClick() {
    /* Document Vars */
    const proficiencyButton = document.querySelector('button.proficiencies');
    const mode = proficiencyButton.querySelector('.mode');
    const arrow = proficiencyButton.querySelector('.arrow');
    const techList = document.querySelector('button.proficiencies ~ .tech-list');

    /* Internal Vars */
    let toggled = false;
    const refreshListHeight = () => techList.style.maxHeight = techList.scrollHeight + 'px';

    proficiencyButton.addEventListener('click', () => {
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
    const overTriggers = document.querySelectorAll('.over-trigger');

    overTriggers.forEach(trigger => {
        const group = trigger.closest('.group');

        trigger.addEventListener('mouseover', () => {
            group.classList.add('focussed');
        });

        trigger.addEventListener('mouseleave', () => {
            group.classList.remove('focussed');
        });
    });
};

/* SCROLL INTERACTIONS */

function observeTilePositions() {
    /* Document Var */
    const tiles = document.querySelectorAll('.tile');

    /* Add Focus When Higher Than 50% Viewport */
    function checkDocumentPosition(el) {
        const group = el.closest('.group');
        const isFocussed = group.classList.contains('focussed');

        const { height, top } = el.getBoundingClientRect();
        const pageHeight = window.innerHeight;
        const shouldFocus = top <= pageHeight/2 - height/2;

        if (isFocussed && !shouldFocus) {
            group.classList.remove('focussed');
        } else if (!isFocussed && shouldFocus) {
            group.classList.add('focussed');
        };
    };

    tiles.forEach(tile => {
        checkDocumentPosition(tile);
        window.addEventListener('scroll', () => checkDocumentPosition(tile))
    });
};

/* INITIATLISE */

(() => {
    const supportsHover = !(matchMedia('(hover: none)').matches);
    
    listenProficiencyClick();
    supportsHover ? listenTileMouseOvers() : observeTilePositions();
})();