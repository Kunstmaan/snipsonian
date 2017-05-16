/**
 * Only exports generic snippets.
 * This is to prevent that you get/bundle all snippets if you just need a few.
 */

import is from './generic/is';
import assert from './generic/assert';

export default {is, assert};
