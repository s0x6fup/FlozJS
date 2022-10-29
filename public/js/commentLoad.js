const submit = document.getElementById('submit');

function encodeHTMLEntities(rawStr) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, ((i) => `&#${i.charCodeAt(0)};`));
}

submit.addEventListener('click', (e) => {
    console.log(comment.value);
});
