import React,{ useEffect, useState} from 'react';
import {ShowAritcleDiv}  from '../style/newsStyle';
import axios from 'axios';

const News = ({newskeyword}) => {//App에서 받은 prop
  const [searchData, setSearchData] = useState({ //검색된 데이터 관리
    data:[]
  }); //{}대신 []로는 넘겨받질 못합니다 ..

  //검색 조건 설정
  let keyword = newskeyword; //App에서 받은 prop
  const date = new Date(); 
  const today = date.toLocaleDateString().replace(/\s/g,'').replace(/\./g,'-');
  
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://newsapi.org/v2/everything',{
          params: { //axios공식문서 참조
            q : keyword,
            from : today,
            sortBy : 'popularity',
            language : 'en',
            apiKey : '04324f28976e49bd84feaeb33b93ff3d'
          }
        });
  
        if (res.status !== 200) {  //응답 성공X 에러처리 (ft:팀장님 코드)
          throw new Error("Can't find news");
        }
        console.log("AA",res);
        console.log("dd",res.data.articles)//데이터 형태: [{}가 20개]

        setSearchData({
          data : res.data.articles //[{}가 20개]
        });//위의 초기값과 같은 형태로 맞춰준다. 

      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  },[keyword, today]);
  
  console.log("bb",searchData);
  
  //ShowAritcle(searchData);
  return (
    <>
    <ShowAritcleDiv>
    { 
      (searchData.data).map((data) => {
        return (
          <>
              <a key={data.url} href={data.url} className="card-article">
                <img src={data.urlToImage} alt=""/>
                <div>
                <small>{data.author}<span className="date">{data.publishedAt.substr(0,10)}</span></small> 
                <h2 className="card-title">{data.title}</h2>
                <p className="content">{data.description}</p>
                </div>
              </a>
          </>
        );
      })
    }
    </ShowAritcleDiv>
    </>
  );
};

export default News;