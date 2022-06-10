import { createSlice } from "@reduxjs/toolkit"; //리덕스 툴킷으로 리듀서를 하나만들기 위해 임포트 

export const userSlice = createSlice ({ 
  //userSlice라는 이름으로 creatSlice라는 도구로 redux toolkit용 reducer 로직을 하나생성
  name: "user", //리듀서의 이름
  initialState: { //초기 상태
      id: '',
      password: ''
  },
  reducers: { //리듀서의 로직 - 액션정의 (여기서 액션을 정의해주면 내부적으로 액션 크리에이터를 생성??)
      logIn: (state, action) => { //액션의 타입
        state.value = action.payload; //액션의 전달값 payload
      },
      logOut: (state) => {
        //state.value = initialState;
           console.log(state.value);
      }
  },
});



//contextuse - 전역 상태 관리  -> 특징: store가 여러개 
//단점 : 전역 상태 객체로 한번에 전달하기 때문에 프로퍼티가 많아지면 "여러번" 감싸줘야한다.....!

//redux : 모든 전역 state를 "하나의 거대한 object에 모두 담음"
//flux : 액션 디스패치 스토어 액션(다시 디스패치로 들어감) -> 데이터의 단방향성, 전역 상태관리 가능
//redux -> reducer + flux => 모아놓은 리듀서, store가 1개 
//리듀서: 1. 현재 state와 들어온 action을 이용하여 다음 state를 결정하는 순수함수
//2. 상태를 update한다면 대입 연산이 아닌 다음 state를 반환. (immutable)

// 디스패치,겟스테이트  - 디스패치 액션 --> 액션을 전달, sotre의 상태값을 가져옴
// 


//react-redux
//react 컴포넌트 내에서 context 를 통해 store에 접근 가능해짐 
//본인이 consume하고 있는 state가 바뀌었을 때
//(shallow compare) 만 re-render -> react state와 유사

//react-redux -> 액션 크리에이터, 서브스크라이브 등 제공 
//리액트 리덕스 세팅: context-api 방식으로 우리가 만들 store를 전달! -> index.js에 가서 provider컴포넌트 함수로 App컴포넌트를 감싸고 
//store파일을 import해서 임포트한 store를 전달 
//어 그러면 Context랑 같은거 아닌가요?
//-> store는 reference type이며 update하지않을것 (리렌더 X 

//reudx tool kit : (크리에이트 슬라이스로 리듀서는 여러개 파일 분래헤서 생성), 여러 라이브러리 제공


//리덕스의 액션 : 객체 type을 가짐, 액션크리에이터 : 함수표현식으로 작성해서 액션을 호출가능하게??? 정의
// (리덕스에 action 타입을 상수로 만든다. actioncreator로 액션자체를 함수표현식으로 정의해서 함수로 만든다.)

//리액트 리덕스 : 다양한 기능이 포함되어 있는데 
//subscribe(리듀서로 변경된 상태값을 뷰로 전달) / action creator (리듀서 안에 액션이 정의되어 있으면 액션크리에이터를 자동으로 생성해줌)
//리덕스 툴킷 : 리액트 리덕스, 리덕스 thunk(미들웨어 라이브러리) 등 다양한 라이브러리들을 모은 도구


export const { logIn, logOut } = userSlice.actions; //작성한 리듀서의 로직을 액션으로 내보냄 
export default userSlice.reducer; //유저슬라이서 자체를 리듀서로 내보내서 store파일로 가서 여러 리듀서와 합치도록 한다.

