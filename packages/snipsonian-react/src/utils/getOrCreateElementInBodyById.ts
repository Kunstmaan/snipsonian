export default function getOrCreateElementInBodyById(id: string): HTMLElement {
    if (!document) {
        return null;
    }
    const el = document.getElementById(id);
    if (!el) {
        const newEl = document.createElement('div');
        newEl.setAttribute('id', id);
        document.body.appendChild(newEl);
        return newEl;
    }
    return el;
}
