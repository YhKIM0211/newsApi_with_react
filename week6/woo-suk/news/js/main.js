// NEWS API
const NEWS_API_KEY = '574be9e95f0845e682cdeba35bcf0eab';
const NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}`;

// DOM
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const main = document.querySelector('.main');

// EventListen
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') newsHandler(event);
});
searchBtn.addEventListener('click', (event) => {
  newsHandler(event);
});

async function newsHandler(event) {
  const newsJson = await searchNews();
  if (newsJson === undefined) return;
  if (newsJson.totalResults === 0) {
    renderEmpty();
  } else {
    renderNews(newsJson.articles);
  }
}

// 뉴스 검색
async function searchNews() {
  const today = toStringByFormatting(new Date());
  const word = searchInput.value.trim();

  if (word.length === 0) {
    alert('검색어를 입력 후 검색해주세요.');
    searchInput.value = '';
    searchInput.focus();
    return;
  }

  try {
    const searchUrl = `${NEWS_API_URL}&q=${word}&from=${today}&to=${today}&sortBy=popularity&language=en`;
    const res = await fetch(searchUrl);
    if (res.status !== 200) {
      throw new Error("Can't find news");
    }
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

// 날짜 포맷 변경
function toStringByFormatting(date, delimiter = '-') {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());
  return [year, month, day].join(delimiter);
}

// 10 미만 일,월 포맷 변경
function leftPad(value) {
  return value >= 10 ? value : `0${value}`;
}

function renderEmpty() {
  main.innerHTML = `
    <div class="no-article">
      Can't find articles corresponding to the search word...
    </div>
  `;
}

function renderNews(newsList) {
  const news = newsList.reduce((prev, news, idx) => {
    let articleStartTag = '';
    if (idx === 0) {
      articleStartTag = `<a class="article highlight-article" href=${news.url}>`;
    } else {
      articleStartTag = `<a class="article" href=${news.url}>`;
    }
    return (
      prev +
      `
        ${articleStartTag}
          <div class="article-image">
            <img src="${news.urlToImage}" alt="news image">
          </div>
          <div class="article-content">
            <div class="article-info">
              <span class="article-author">${news.author ? news.author : 'anonymous'}</span>
              <span class="article-date">${toStringByFormatting(new Date(news.publishedAt))}</span>
            </div>
            <header class="article-headline">
              ${news.title}
            </header>
            <p class="article-description">
              ${news.description}
            </p>
          </div>
        </a>
      `
    );
  }, '');
  main.innerHTML = news;
}
