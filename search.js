function search() {
    var query = document.getElementById('query').value;
    alert(query + "에 대해 검색중입니다.");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "http://word.old-stdict-korean.kro.kr", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allWords = rawFile.responseText.split("\n");
                var result = [];
                var save_query = query;
                var output = document.getElementById('result');
                if(query.includes('?'))
                    query = query.replace(/\?/gi, "[가-힣ㄱ-ㅎ]{1}");
                if(query.includes('*')) {
                    if(query.split('*').length > 2) {
                        return alert("* 특수문자는 2개 이상 포함될 수 없습니다.");
                    }
                    else if(query.startsWith('*')) {
                        var condition = new RegExp(`${query.replace(/\*/i, "")}$`, 'gi');
                        result = allWords.filter(word => word.match(condition) != null);
                    }
                    else if(query.endsWith("*")) {
                        var condition = new RegExp(`^${query.replace(/\*/i, "")}`, 'gi');
                        result = allWords.filter(word => word.match(condition) != null);
                    }
                    else {
                        var condition = new RegExp(`(^${query.split("*")[0]})?(${query.split("*")[1]}$)`, 'gi');
                        result = allWords.filter(word => word.match(condition) != null);
                    }
                }
                if(save_query.includes('?') && ! save_query.includes('*')) {
                    var condition = new RegExp(query, 'gi');
                    result = allWords.filter(word => word.match(condition) != null && word.length == save_query.length);
                }
                if(! save_query.includes('?') && ! save_query.includes('*')) {
                    result = allWords.filter(word => word == query);
                }
                output.innerHTML = "짜잔";
            }
        }
    }
    rawFile.send(null);
}
