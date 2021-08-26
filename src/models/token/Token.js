const jwt = require('jsonwebtoken');//로그인토큰
const bcrypt = require("bcrypt"); //패스워드 해쉬 암호화
require("dotenv").config(); //jwt 시크릿 key 랑 합쳐서 만들어짐

//토큰생성 함수
const CreateToken = (id, nickname) => { //토큰안에 아이디 , 닉네임 정보를 넣기위해서 인자를 받아옴
  return jwt.sign({ id, nickname }, 'lllllogincheecckkk', { //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
    expiresIn: "60m", // 토큰 유효시간 10분임
  });
};

//토큰 유효성 검사
const CheckToken = (token) => { //유효성 검사를 하기 위해서 토큰을 받아옴
  try {
    // 받아온 토큰과 비밀키를 사용하여 토큰 반환
    return { token : jwt.verify(token,'lllllogincheecckkk'),success:true};
  }
  // 인증 실패시
  catch (error) {
    console.log(error.name);
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
      return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
  }
};

module.exports = {
  CreateToken,
  CheckToken,
};