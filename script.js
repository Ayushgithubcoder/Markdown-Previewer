const input = document.getElementById("markdown-input");
const preview = document.getElementById("markdown-preview");




function parseMarkdown(text) {
    text = text.replace(/^###### (.*$)/gm, '<h6>$1</h6>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        .replace(/`{3}([\s\S]*?)`{3}/g, '<pre><code>$1</code></pre>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;">')
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/(\n|^)---(\n|$)/g, '<hr>')
        .replace(/(\n|^)\*\*\*(\n|$)/g, '<hr>')
        .replace(/^- \[ \] (.*$)/gm, '<input type="checkbox"> $1')
        .replace(/^- \[x\] (.*$)/gm, '<input type="checkbox" checked> $1');

    text = text.replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
        .replace(/^(\d+)\. (.*$)/gm, '<ol><li>$2</li></ol>');

    text = text.replace(/(<ul>\s*<li>.*?<\/li>\s*)+<\/ul>/gs, match => `<ul>${match.replace(/<\/ul>|<ul>/g, '')}</ul>`)
        .replace(/(<ol>\s*<li>.*?<\/li>\s*)+<\/ol>/gs, match => `<ol>${match.replace(/<\/ol>|<ol>/g, '')}</ol>`);

    return text;
}


function updatePreview() {
    preview.innerHTML = parseMarkdown(input.value);
}


function clearText() {
    input.value = "";
    preview.innerHTML = "";
}

input.addEventListener("input", updatePreview);
