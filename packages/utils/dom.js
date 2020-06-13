export function hasClass (dom, cls) {
  return !!dom.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}

export function addClass (dom, cls) {
  hasClass(dom, cls) || (dom.className += ' ' + cls);
}

export function removeClass (dom, cls) {
  hasClass(dom, cls) && (dom.className = dom.className.indexOf(` ${cls}`) >= 0 ? dom.className.replace(new RegExp(`(\\s|^)${cls}(\\s|$)`), ' ') : dom.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ''));
}

export function addEvent (dom, name, fn) {
  dom.addEventListener ? dom.addEventListener(name, fn, !1) : dom.attachEvent('on' + name, fn)
}

export function removeEvent (dom, name, fn) {
  dom.removeEventListener ? dom.removeEventListener(name, fn, !1) : dom.detachEvent('on' + name, fn)
}
