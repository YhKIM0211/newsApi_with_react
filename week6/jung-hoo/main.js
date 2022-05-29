// 필요한 요소들을 가져온다.
const searchGroupEl = document.querySelector(".search-group");
const resBoxEl = document.querySelector(".result-box");
const filterEl = document.querySelector(".search-filter");
const inputEl = document.querySelector(".search-input");

searchGroupEl.addEventListener("submit", doSubmit); // 검색어 입력 후 제출 시 이벤트리스너 추가

function doSubmit(event) {
  event.preventDefault(); // 새로고침을 막는다.
  resBoxEl.innerHTML = ""; // 결과를 탐색하기 전 결과물을 다 지운다.
  const inputValue = inputEl.value.toUpperCase().trim();
  // 검색결과는 대소문자를 상관하지 않기때문에 입력값을 우선 대문자로 바꾼다.
  // 그 후, 문자열 시작과 끝에 공백을 제거한다.

  if (inputValue.length > 0) {
    getArticleData(inputValue); // 기사를 가져온 후 저장한다.
  } else {
    // 검색어가 입력되지 않았으면
    alert("검색어를 입력하세요!");
  }
}

function revealArticle(data, targetEl) {
  targetEl.innerHTML += `<h3>${data.title}</h3>
                    <div>${data.content}<br/>
                    <a href="${data.url}">See more</a></div>`;
}

function convertString(string) {
  return string.toUpperCase();
  // 대소문자를 구분하지 않기 위해서 잠시 대문자로 바꾼다.
}

async function getArticleData(searchKeyword) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${searchKeyword}&sortBy=popularity&apiKey=2c157850e4c64fd99aaf77d60228d630`
  );
  const newsData = await res.json();
  console.log(newsData);

  if (newsData.articles.length === 0) {
    // 아예 기사를 못가져왔을 경우
    alert("검색결과가 없습니다!"); // 경고창을 띄운다.
  }

  for (let i = 0; i < newsData.articles.length; ++i) {
    // 가져온 기사의 갯수만큼 반복문으로 비교를 실행한다.
    if (filterEl.value === "제목") {
      // 검색 조건이 제목이라면...
      if (
        convertString(newsData.articles[i].title).includes(searchKeyword)
        // 키워드가 포함되어 있는지 알아본다.
        // 그래서 입력한 값이 기사의 제목에 포함되어 있다면...
      ) {
        // true 값을 반환한 i번째 기사의 제목과 내용, url를 표시한다.
        revealArticle(newsData.articles[i], resBoxEl);
      }
    } else if (filterEl.value === "내용") {
      // 검색 조건이 내용이라면...
      if (
        // 입력한 값이 기사의 내용에 포함되어 있다면...
        convertString(newsData.articles[i].content).includes(searchKeyword)
        // 키워드가 포함되어 있는지 알아본다.
        // 그래서 입력한 값이 기사의 내용에 포함되어 있다면...
      ) {
        // true 값을 반환한 i번째 기사의 제목과 내용, url를 표시한다.
        revealArticle(newsData.articles[i], resBoxEl);
      }
    }

    if (i === newsData.articles.length - 1) {
      // 마지막 탐색을 마친 후
      if (resBoxEl.innerHTML === "") {
        // 가져온 기사들 중 조건에 부합하는 기사가 없다면...
        alert("검색결과가 없습니다!"); // 경고창을 띄운다.
      }
    }
  }
}
