function openLogeion(word) {
    window.open(`https://logeion.uchicago.edu/${word}`, "_blank");
}

function isGreekOrLatin(lang) {
    return lang == "el" || lang == "la";
}

// Logeion doesn't like squashed diphthongs or non-letters
function sanitizeWord(word) {
    let clean = word.replace(/[|&;$%@"<>()+,]/g, "");
    clean = clean.replace(/Æ/g, "AE");
    clean = clean.replace(/æ/g, "ae");
    clean = clean.replace(/Œ/g, "OE");
    clean = clean.replace(/œ/g, "oe");

    return clean;
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

if (!window.location.href.includes("logeion.uchicago.edu")) {
    document.onmouseup = (event) => {
        const selection = document.getSelection().toString();
        // Only look up single words
        const trimmed = selection.trim();
        if (trimmed && trimmed.split(" ").length == 1) {
            const clean = sanitizeWord(trimmed);
            if (pageIsClassicsLanguage) {
                openLogeion(clean);
            } else {
                chrome.i18n.detectLanguage(clean, langs => {
                    let openedPage = false;
                    langs.languages.forEach(lang => {
                        console.log(`Word: ${clean} guessed as ${lang.language} pct ${lang.percentage}`)
                        if (isGreekOrLatin(lang.language)) {
                            openLogeion(clean);
                            openedPage = true;
                            return;
                        }
                    });
                    if (openedPage) {
                        return;
                    }
                    // Finally, if we've failed all other checks, hit the Latin WordNet API to see if it might be Latin
                    chrome.runtime.sendMessage(
                        { type : "queryWordNetAPI", request: clean},
                        function(reply) {
                            if (reply) {
                                openLogeion(clean);
                            }
                        }
                    );
                });
            }
        }
    }
}