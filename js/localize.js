"use strict";

var localizeLang = undefined;
var localizeElements = [];
var originalTexts = {};
var localizedTexts = {};

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementsByClassName) {
        var elems = document.getElementsByClassName("localize");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].id === "" || elems[i].id === undefined) {
                console.error("MISSING LOCALIZATION ID!!");
                console.error(elems);
                continue;
            }
            localizeElements.push(elems[i].id);
            originalTexts[elems[i].id] = elems[i].textContent;
        }
    }

    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("localizeLang") != null) {
            localize(localStorage.getItem("localizeLang"));
        }
    }
});

function unlocalize() {
    localizeLang = undefined;
    for (var i = 0; i < localizeElements.length; i++) {
        var elem = document.getElementById(localizeElements[i]);
        elem.textContent = originalTexts[localizeElements[i]];
    }

    localStorage.removeItem("localizeLang");
}

function localize(lang) {
    localizeLang = lang;
    $.getJSON(`/lang/${lang}.json`, function(json) {
        localizedTexts = json;
        for (var i = 0; i < localizeElements.length; i++) {
            var elem = document.getElementById(localizeElements[i]);
            elem.textContent = json[localizeElements[i]];
        }
    });

    localStorage.setItem("localizeLang", lang);
}
