import 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';

import toggle from './toggle';
import scrollTo from './scroll-to';
import easings from './easings';

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollTo();
    easings();
});
