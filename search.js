var allWords = "";
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "https://word.old-stdict-korean.kro.kr", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4)
    {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
            var allWords = rawFile.responseText.split("\n");
            allWords = [...(new Set(allWords))];
        }
    }
}
rawFile.send(null);

function search() {
    var query = document.getElementById('query').value;
    
    var result = [];
    var save_query = query;
    var output = document.getElementById('result');
    query = query.replace(/\?/gi, ".").replace(/\*/g, ".*");
    result = allWords.filter(word => word.match(RegExp(query)) == word);
    output.innerHTML = "<h3>'" + save_query + "' 검색 결과 (" + result.length + "건)</h3><br><br>" + result.join("<br>");
}
