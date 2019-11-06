const SELECTORS = {
    GROUP: '.js-ease',
    TOGGLE: '.js-ease-toggle',
};

const MODIFIER = 'snip-easing-group--move';

export default function easings() {
    const EASING_GROUPS = Array.prototype.slice.call(document.querySelectorAll(SELECTORS.GROUP));

    if (EASING_GROUPS) {
        EASING_GROUPS.forEach((group) => {
            const TOGGLE = group.querySelector(SELECTORS.TOGGLE);

            TOGGLE.addEventListener('click', (e) => {
                e.preventDefault();

                if (group.classList.contains(MODIFIER)) {
                    group.classList.remove(MODIFIER);
                } else {
                    group.classList.add(MODIFIER);
                }
            });
        });
    }
}
