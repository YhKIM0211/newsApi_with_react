const buttonEl = document.querySelector(".search-btn");

buttonEl.addEventListener("click", (event) => {
  const inputBoxEl = document.querySelector("#input-bar");
  let keyword = inputBoxEl.value.toUpperCase();

  if(keyword === '')
    return alert('검색어를 입력하세요');
  //console.log(keyword)
  searching(keyword);
});

function searching(keyword) {

  let date = new Date(); //코드 추가
  let today = date.toLocaleDateString().replace(/\s/g,'').replace(/\./g,'-');
  //console.log(today);

  var url = 'https://newsapi.org/v2/everything?' +
          `q=${keyword}&` +
          `from=${today}&` +
          'sortBy=popularity&' +
          'apiKey=04324f28976e49bd84feaeb33b93ff3d';

  var req = new Request(url);  

  fetch(req)
    .then(function(res) {
        return res.json()
    })
    .then( (res) => {
      console.log(res);

      showArticle(res);
    })
}

function showArticle(res) {
  const aEl = document.querySelector('.sectionAnchor');
  const imgEl = document.querySelector('img');
  const authorEl = document.querySelector('small');
  const dateEl = document.querySelector('section > span');
  //console.log(dateEl)
  //console.log(typeof res.articles[0].publishedAt)
  const titleEl = document.querySelector('h2');
  const contentEl = document.querySelector('section > p');

  const articleLists = document.querySelector('.article-lists')
  
  aEl.href = res.articles[0].url
  imgEl.src = res.articles[0].urlToImage
  authorEl.textContent = res.articles[0].author
  dateEl.textContent = res.articles[0].publishedAt.substr(0,10);
  titleEl.textContent = res.articles[0].title
  contentEl.textContent = res.articles[0].description

  // console.log(cdLink);
  // console.log(cdInfo);

  for(i=1; i<res.articles.length; i++) {
    //에러처리
    let author = res.articles[i].author
    if (author === null){
      author = 'author: undefined'
    }
    if(/@/g.test(author)){
      author = 'author: undefined'
    }

    const cdLink = document.createElement( 'a' );
    const cdDiv = document.createElement( 'div' );
    const cdAuthor = document.createElement( 'small' );
    const cdDate = document.createElement( 'span' );
    const cdTitle = document.createElement( 'h2' );
    const cdContent = document.createElement( 'p' );
    const cdImg = document.createElement( 'img' );
    
    cdLink.classList.add('card-article');
    cdLink.appendChild(cdImg);
    const cdInfo = cdLink.appendChild( cdDiv );
    cdInfo.appendChild(cdAuthor);
    cdInfo.appendChild(cdDate);
    cdInfo.appendChild( cdTitle );
    cdInfo.appendChild( cdContent );

    cdLink.href = res.articles[i].url
    cdImg.src = res.articles[i].urlToImage
    cdAuthor.textContent = author
    cdDate.textContent = res.articles[i].publishedAt.substr(0,10);
    cdTitle.textContent = res.articles[i].title
    cdContent.textContent = res.articles[i].description

    console.log(cdLink)
    articleLists.appendChild(cdLink);
  }
}

