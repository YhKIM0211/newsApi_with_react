/*API KEY*/
const keyValue = '2c6a16d84bbb4f1387f78194e6f68f67'
let keyWord;
/*Event Listen*/
const inputWord = document.querySelector('input');
inputWord.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        inputCheck();
        inputWord.blur();
    }
})
const searchButton = document.querySelector('button');
searchButton.addEventListener('click', inputCheck)

/*검색어 검사*/
function inputCheck() {
    keyWord = inputWord.value.trimStart()
    keyWord ? getNewsData(keyWord) : alert("검색어를 입력하세요.")
    inputWord.value = '';
}
/* data 가져오기 */
async function getNewsData() {
    const ori = await fetch(`https://newsapi.org/v2/everything?q=${keyWord}&sortBy=popularity&apiKey=${keyValue}`)
    if (ori.status !== 200) {
        throw new Error("Can't Search News");
    } 
    const newsData = await ori.json();

    return newsHandle(newsData);
}

/* newsdata handle */
function newsHandle(newsData) {
    if (newsData.articles.length === 0){
        alert(`${keyWord}에 대한 검색결과가 없습니다.`)
    } else {
        render(newsData.articles);
    }
}

/*html에 뿌리기*/
function render(data) {
    /*이전 결과 초기화*/
    const ulList = document.querySelector('ul');
    ulList.innerHTML='';

    const repeat = data.length <= 20 ? data.length : 20;
    const resultNumber = document.querySelector('.result-number');
    resultNumber.innerHTML=`About ${repeat} results`


    const resultKey = document.querySelector('.result-key')
    resultKey.innerHTML = `Result about ${keyWord}`;


    /*결과 출력*/
    for(i=0; i<repeat; i++){
        let newLi = document.createElement('li')
        newLi.innerHTML =
        `
        <a href="${data[i].url}">
            <img style="width: 80px;" 
                src="${data[i].urlToImage}" 
                onerror="this.src = './images/noimage.webp'"/>
        </a>
        <div class="info">
            <span class="title">
                <a href="${data[i].url}">
                    ${data[i].title}
                </a>
            </span>
            <span class="author">${data[i].author}</span>
            <span class="publishedAt">${data[i].publishedAt}</span>
        </div>
        `
        ulList.appendChild(newLi);
    }
    
}