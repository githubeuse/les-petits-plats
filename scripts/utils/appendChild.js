export function appendChild(parentSelector, childElement) {
    const parent = document.querySelector(parentSelector);
    parent.appendChild(childElement);
}