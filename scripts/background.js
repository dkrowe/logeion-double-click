function isGreekOrLatin(lang) {
    return lang == "el" || lang == "la";
}

async function detectLanguage(id) {
    const lang = await chrome.tabs.detectLanguage(id);
    console.log(`Detected page language ${lang}`);
    return isGreekOrLatin(lang);
}

async function queryWordNetAPI(word) {
    const response = await fetch(`https://latinwordnet.exeter.ac.uk/lemmatize/${word}/`, {
        method: "GET",
        cache: "default",
        cors: "no-cors",
        headers: {
            "Accept": "application/json"
        }
    });
    if (!response.ok) {
        console.log("WordNet API request failed");
        return false;
    }
    const jsonResponse = await response.json();
    jsonResponse.forEach(ob => {
        console.log(`WordNet API response: ${JSON.stringify(ob)}`);
    });
    return jsonResponse.length > 0;
}

chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.type == "detectLanguage") {
        detectLanguage(sender.tab.id).then(response);
    } else if (message.type == "queryWordNetAPI") {
        queryWordNetAPI(message.request).then(response);
    }
    return true;
});