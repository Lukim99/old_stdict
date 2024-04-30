allWords = [];
rawFile = new XMLHttpRequest();
rawFile.open("GET", "https://old-stdict-korean.kro.kr/allWords.txt", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4)
    {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
            allWords = rawFile.responseText.split("\n");
            allWords = [...(new Set(allWords))];
            allWords.forEach((e,i,a) => a[i] = e.trim());
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
    var count = 1;
    result.forEach(function(element, index, self) {
        self[index] = `
        <div class="count">${count}</div>
        <div class="word">${element}</div>`;
        count++;
    })
    output.innerHTML = "<h3>'" + save_query + "' 검색 결과 (" + result.length + "건)</h3><br><br>" + result.join("<br>");
}
