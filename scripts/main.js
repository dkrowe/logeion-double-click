// Disable Perseus word links
if (window.location.href.includes("perseus.tufts.edu/hopper/text")) {
    const links = document.querySelectorAll("a.text");
    links.forEach(link => link.replaceWith(...link.childNodes));
}

document.onmouseup = (event) => {
    const selection = document.getSelection().toString();
    // Only look up single words
    if (selection && selection.split(" ").length == 1) {
        const clean = selection.replace(/[|&;$%@"<>()+,]/g, "");
        window.open(`https://logeion.uchicago.edu/${clean}`, "_blank");
    }
}