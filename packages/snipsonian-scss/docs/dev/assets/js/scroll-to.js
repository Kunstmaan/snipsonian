const CLASS_NAME = 'js-scroll-to';

export default function init() {
    const elements = document.querySelectorAll(`.${CLASS_NAME}`);
    const { hash } = location;

    if (hash) {
        setTimeout(() => {
            location.hash = '';
            location.hash = hash;
        }, 50);
    }

    elements.forEach((element) => {
        element.addEventListener('click', handleClick);
    });
}

function handleClick(e) {
    e.preventDefault();

    console.log('click');

    const CONTENT = document.querySelector('.ss-docs-main');

    const targetString = e.target.getAttribute('data-scroll-to') || false;
    let target = null;
    let scrollTo = null;

    if (targetString) {
        if (targetString[0] === '#') {
            target = document.getElementById(targetString.slice(1));
            scrollTo = target.offsetTop - 115;
        } else if (targetString === 'top') {
            target = CONTENT;
            scrollTo = 0;
        }
    }

    CONTENT.scrollTop = scrollTo;
}
