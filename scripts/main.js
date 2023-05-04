function openLogeion(word) {
    window.open(`https://logeion.uchicago.edu/${word}`, "_blank");
}

function isGreekOrLatin(lang) {
    return lang == "el" || lang == "la";
}

let pageIsClassicsLanguage = false;
chrome.runtime.sendMessage(
    { type: "detectLanguage", request: ""},
    function(reply) {
        pageIsClassicsLanguage = reply;
    }
);

// Disable Perseus classic word links
if (window.location.href.includes("perseus.tufts.edu/hopper/text")) {
    const links = document.querySelectorAll("a.text");
    links.forEach(link => link.replaceWith(...link.childNodes));
}

document.onmouseup = (event) => {
    const selection = document.getSelection().toString();
    // Only look up single words
    if (selection && selection.split(" ").length == 1) {
        const clean = selection.replace(/[|&;$%@"<>()+,]/g, "");
        if (pageIsClassicsLanguage) {
            openLogeion(clean);
        } else {
            chrome.i18n.detectLanguage(clean, langs => {
                langs.languages.forEach(lang => {
                    console.log(`Word: ${clean} guessed as ${lang.language} pct ${lang.percentage}`)
                    if (isGreekOrLatin(lang.language) && lang.percentage > 10) {
                        openLogeion(clean);
                    }
                })
            });
        }
    }
}