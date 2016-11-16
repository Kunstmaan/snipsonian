import JsDocBuilder from './snippet/JsDocBuilder';
import JsPropBuilder from './prop/JsPropBuilder';

export const snippet = (jsSnippet) =>
    JsDocBuilder.snippet(jsSnippet);

export const prop = () => ({
    bool: () => JsPropBuilder.bool(),
    func: () => JsPropBuilder.func(),
    numb: () => JsPropBuilder.numb(),
    obj: () => JsPropBuilder.obj(),
    str: () => JsPropBuilder.str(),
    any: () => JsPropBuilder.any(),
    custom: () => JsPropBuilder.custom()
});