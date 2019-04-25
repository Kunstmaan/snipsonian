const CLASS_NAME = 'js-toggle';
const CLASS_NAME_TRIGGER = 'js-toggle-trigger';

export default function init() {
    const elements = document.querySelectorAll(`.${CLASS_NAME}`);

    elements.forEach((element) => {
        initToggleElement(element);
    });
}

function initToggleElement(element) {
    const triggers = element.querySelectorAll(`.${CLASS_NAME_TRIGGER}`);
    const toggleClass = element.getAttribute('data-toggle-class');

    if (toggleClass) {
        triggers.forEach((trigger) => {
            trigger.addEventListener('click', handleClick);
        });
    }

    function handleClick() {
        element.classList.toggle(toggleClass);
    }
}
