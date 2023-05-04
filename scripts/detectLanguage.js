function isGreekOrLatin(lang) {
    return lang == "el" || lang == "la";
}

function detectLanguage(id, callback) {
    chrome.tabs.detectLanguage(id, lang => {
        console.log(`Detected page language ${lang}`);
        callback(isGreekOrLatin(lang));
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, response) {
    detectLanguage(sender.tab.id, response);
    return true;
});