/* eslint import/no-unresolved: ["off"] */
export {group, registerGroups, getRegisteredGroups} from './_doc/documentJs';

export {snippet, type, desc, param, returns, canThrow, examples, parts, authors}
    from './_doc/snippet/jsSnippetDocDecorators';

export {decorate} from './decorator/decorateWith';

export {JS_DOC_TYPE} from './_doc/snippet/jsDocTypes';

export {getVersions, getCurrentVersion, setCurrentVersion} from './_config/versions';
export {SETTING} from './_config/settings';