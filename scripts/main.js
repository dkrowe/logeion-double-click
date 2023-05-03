document.onmouseup = (event) => {
    let selection = document.getSelection().toString();
    if (selection && selection.split(" ").length == 1) {
        window.open(`https://logeion.uchicago.edu/${selection}`, "_blank");
    }
}

document.onselectionchange = (event) => {
};