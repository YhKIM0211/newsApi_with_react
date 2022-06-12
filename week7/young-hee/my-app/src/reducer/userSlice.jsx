import { createSlice } from "@reduxjs/toolkit"; //리덕스 툴킷으로 리듀서를 하나만들기 위해 임포트 

export const userSlice = createSlice ({ 
  //userSlice라는 이름으로 creatSlice라는 도구로 redux toolkit용 reducer 로직을 하나생성
  name: "user", //리듀서의 이름
  initialState: { //초기 상태
      id: '',
      name: '',
      loginState : false
  },
  reducers: { //리듀서의 로직 - 액션정의 (여기서 액션을 정의해주면 내부적으로 액션 크리에이터를 생성??)
      logIn: (state, action) => { //액션 타입 : logIn
        return {
          ...action.payload,
          loginState : true
        }
      },
      logOut: (state) => {
        return {
          id: '',
          name: '',
          isLogin: false,
        }
      }
  },
});


export const { logIn, logOut } = userSlice.actions; //작성한 리듀서의 로직을 액션으로 내보냄 
export default userSlice.reducer; //유저슬라이서 자체를 리듀서로 내보내서 store파일로 가서 여러 리듀서와 합치도록 한다.

