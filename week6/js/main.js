const buttonEl = document.querySelector(".search-btn");

buttonEl.addEventListener("click", () => {
  const inputBoxEl = document.querySelector("#input-bar");
  let keyword = inputBoxEl.value.toUpperCase();//대소문자 구분 없이 검색위해

  if(keyword === '')
    return alert('검색어를 입력하세요');
  
  search(keyword);
});

function search(keyword) {
  //날짜 데이터 객체 생성 
  const date = new Date(); 
  const today = date.toLocaleDateString().replace(/\s/g,'').replace(/\./g,'-');

  //'user가 검색한 키워드 + 오늘 날짜' 기준으로 정보검색         
  const searchObj = {
    q : keyword,
    from : today,
    sortBy : 'popularity'
  }

  const searchGenerator = () => {
    return `q=${searchObj.q}&from=${searchObj.from}&sortBy=${searchObj.sortBy}` 
  }
  
  let searchValue = searchGenerator(searchObj);

  var url = `https://newsapi.org/v2/everything?${searchValue}
            &apiKey=04324f28976e49bd84feaeb33b93ff3d`;
  var req = new Request(url);  

  try {
    fetch(req)
    .then((res) => {
              if (res.status !== 200) {  //응답 성공X 에러처리 (ft:팀장님 코드)
                throw new Error("Can't find news");
              }
              return res.json()
          }
    )
    .then(
          (resJSON) => showArticle(resJSON) //chaining 구문 달라지는 인자 값 구분
    )
  } catch (e) {
    console.error(e);
  }
  
}



function showArticle(resJSON) {
  const main = document.querySelector('.fixed-main');
  main.innerHTML=''; //초기화

  for(i=0; i<resJSON.articles.length; i++) {

    let author = resJSON.articles[i].author
    //에러처리 : author에 !(falsy값), @가 포함되어 있다 
    //-> 둘 중 하나가 참인 경우 -> 아래 실행문 실행  
    if (!author || /@/g.test(author) ){
      author = 'author: undefined'
    }
    
    let articleLink = resJSON.articles[i].url
    let articleImg = resJSON.articles[i].urlToImage
    let articleAuthor = resJSON.articles[i].author
    let articleDate = resJSON.articles[i].publishedAt.substr(0,10);
    let articleTitle = resJSON.articles[i].title
    let articleContent = resJSON.articles[i].description

    if(i===0) {
      //첫번째 정보인 경우   
      const firstArticle = 
      `<a href=${articleLink} class="sectionAnchor">
      <section class="first-article">
        <img src=${articleImg} alt="">
        <small>${articleAuthor}</small>
        <span>${articleDate}</span>
        <h2 class="first-title">${articleTitle}</h2>     
        <p class="content">${articleContent}</p>
      </section>
      </a>
      <div class="article-lists"></div>`

      main.innerHTML = firstArticle;
    }

    const articleLists = document.querySelector('.article-lists')
    let cardHtml =
      `<a href=${articleLink} class="card-article">
      <img src=${articleImg} alt=""/>
      <div>
      <small>${articleAuthor}<span class="date">${articleDate}</span></small> 
      <h2 class="card-title">${articleTitle}</h2>
      <p class="content">${articleContent}</p>
      </div>
      </a>`
    
    
    articleLists.innerHTML = articleLists.innerHTML + cardHtml;
  }
}


//var qs = require('qs');//qs 라이브러리 임포트
//js 이벤트 리스너: 1. 인라인 2. 쿼리셀렉터-addEventListener
//함수 네이밍-> 명령형(searching X -> search )
//참고: https://tecoble.techcourse.co.kr/post/2020-04-26-Method-Naming/ 
//클린코드? function 키워드 or 화살표 함수 중 하나의 패턴으로 통일