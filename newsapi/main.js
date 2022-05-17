/*API KEY*/
const keyValue = '2c6a16d84bbb4f1387f78194e6f68f67'

/*Event Listen*/
const inputWord = document.querySelector('input');
inputWord.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        search();
        inputWord.blur();
    }
})
const searchButton = document.querySelector('button');
searchButton.addEventListener('click', search)
const ulList = document.querySelector('ul');

function search(){
    const keyWord = inputWord.value.trimStart()
    keyWord ? getNewsData(keyWord) : alert("검색어를 입력하세요.")
    inputWord.value = '';
    const resultKey = document.querySelector('.result-key')
    resultKey.innerHTML = `Result about '${keyWord}'`;
}

/* data 가져오기 */
async function getNewsData(keyWord) {
    const word = keyWord;
    const ori = await fetch(`https://newsapi.org/v2/everything?q=${word}&sortBy=popularity&apiKey=${keyValue}`)
    if (ori.status !== 200) {
        throw new Error("Can't Search News");
    } 
    const newsData = await ori.json();
    if (newsData.articles.length === 0){
        alert(`${word}에 대한 검색결과가 없습니다.`)
    } else {
        dataProcess(newsData.articles);
    }
}

/* 항목별 분류 */
function dataProcess(data) {
    let authorList = [];
    let titleList = [];
    let urlList = [];
    let urlToImageList = [];
    let publishedAtList = [];

    data.forEach(el =>{
        authorList.push(el.author);
        titleList.push(el.title);
        urlList.push(el.url);
        urlToImageList.push(el.urlToImage);
        publishedAtList.push(el.publishedAt.slice(0,10));
    });
    render(authorList, titleList, urlList, urlToImageList, publishedAtList);
}

/*html에 뿌리기*/
function render(authorList, titleList, urlList, urlToImageList, publishedAtList) {
    let repeat;
    ulList.innerHTML='';
    /*Error prevention*/
    const resultNumber = document.querySelector('.result-number');
    try {
        const showResult = document.querySelector('.result');
        showResult.className = 'result-show';
    } catch{}

    authorList.length <= 20 ? repeat = authorList.length : repeat = 20;

    for(i=0; i<repeat; i++){
        let newLi = document.createElement('li')
        newLi.innerHTML =
        `
        <a href="${urlList[i]}">
            <img style="width: 80px;" 
                src="${urlToImageList[i]}" 
                onerror="this.src = './images/noimage.webp'"/>
        </a>
        <div class="info">
            <span class="title">
                <a href="${urlList[i]}">
                    ${titleList[i]}
                </a>
            </span>
            <span class="author">${authorList[i]}</span>
            <span class="publishedAt">${publishedAtList[i]}</span>
        </div>
        `
        ulList.appendChild(newLi);
    }
    resultNumber.innerHTML=`About ${repeat} results`
}