import { configureStore } from '@reduxjs/toolkit'; //redux toolkit 사용에서 store를 하나 생성
import userSlice from './userSlice' //userSlice를 해당 파일에서 import 

export default configureStore({
  reducer : { //여러 리듀서를 등록해서 하나의 리듀서로 동작하도록 모으는 곳
    user: userSlice //user라는 이름으로 userSlice 리듀서를 등록.
  },
});