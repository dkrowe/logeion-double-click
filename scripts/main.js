// Disable Perseus word links
if (window.location.href.includes("perseus.tufts.edu/hopper/text")) {
    const links = document.querySelectorAll("a.text");
    links.forEach(link => link.replaceWith(...link.childNodes));
}

document.onmouseup = (event) => {
    const selection = document.getSelection().toString();
    if (selection && selection.split(" ").length == 1) {
        window.open(`https://logeion.uchicago.edu/${selection}`, "_blank");
    }
}