const CLASS_NAME = 'js-scroll-to';

export default function init() {
    const elements = document.querySelectorAll(`.${CLASS_NAME}`);

    elements.forEach((element) => {
        element.addEventListener('click', handleClick);
    });
}

function handleClick(e) {
    e.preventDefault();

    let targetString = e.target.getAttribute('data-scroll-to') || false;
    let target = null;

    if (targetString) {
        if (targetString[0] === '#') {
            target = document.getElementById(targetString.slice(1));
        } else if (targetString === 'top') {
            target = document.body;
        }
    }

    document.body.scrollTop = target.offsetTop;
    document.documentElement.scrollTop = target.offsetTop;
}
