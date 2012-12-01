// ==UserScript==
// @name Clean Le Monde
// @namespace http://userscripts.org/users/abustany
// @description Removes various useless elements from lemonde.fr
// @include http://www.lemonde.fr/*
// ==/UserScript==
function removeElement(e) {
    if (e.parentNode)
        e.parentNode.removeChild(e);
}

var selectorsToRemove = ['header#header', 'div.position_pub', '#appel_jelec', '#bandeau_bas', 'section.services', 'section.audience', 'section.bloc_groupe', 'div.footer_gratuit', 'div.immostreet'];

for (var i in selectorsToRemove) {
    var elements = document.querySelectorAll(selectorsToRemove[i]);
    for (var j in elements) {
        removeElement(elements[j]);
    }
}
