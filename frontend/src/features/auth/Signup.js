import React, { useEffect, useState } from "react";
// import "../../css/Signup.css";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  // 회원가입 데이터(이메일, 비밀번호, 비밀번호확인, 닉네임, 이름, 성별, 전화번호)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  // 오류메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = React.useState("");

  // 검사
  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 검사
  const [passwordValid, setPasswordValid] = useState(false); // 비밀번호 유효성 검사
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false); // 닉네임 유효성 검사
  const [nameValid, setNameValid] = useState(false); // 이름 유효성 검사
  const [phoneValid, setPhoneValid] = useState(false); // 전화번호 유효성 검사

  const [emailCheck, setEmailCheck] = useState(false); // 중복 이메일 검사
  const [passwordCheck, setPasswordCheck] = useState(false); // 비밀번호, 비밀번호 확인 일치하는가

  const [notAllow, setNotAllow] = useState(true); // 회원가입 검사

  // 파이어 베이스 회원가입하기
  const [errorMsg, setErrorMsg] = useState(" ");

  const register = async () => {
    try {
      setErrorMsg(" ");
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(createdUser);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.code);
      switch (err.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다");
          break;
      }
    }
  };

  // 회원가입 버튼 활성화 체크
  useEffect(() => {
    if (
      emailValid &&
      passwordValid &&
      passwordConfirmValid &&
      nicknameValid &&
      nameValid &&
      phoneValid
    ) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [
    emailValid,
    passwordValid,
    passwordConfirmValid,
    nicknameValid,
    nameValid,
    phoneValid,
  ]);

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    console.log(email);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regex.test(e.target.value)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setEmailValid(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setEmailValid(true);
    }
  };

  // 비밀번호 유효성 검사
  const handlePw = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regex.test(e.target.value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setPasswordValid(false);
    } else {
      setPasswordMessage("");
      setPasswordValid(true);
    }
  };

  // 비밀번호 확인 유효성 검사
  const handlePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
      setPasswordConfirmValid(false);
    } else {
      setPasswordConfirmMessage("일치");
      setPasswordConfirmValid(true);
    }
  };

  // 닉네임 유효성 검사
  const handleNickname = (e) => {
    const currentName = e.target.value;
    setNickname(currentName);
    console.log(nickname);
    if (currentName.length < 2 || currentName.length > 5) {
      setNicknameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setNicknameValid(false);
    } else {
      setNicknameMessage("사용가능한 닉네임 입니다.");
      setNicknameValid(true);
    }
  };
  // 전화번호 유효성 검사
  const handlePhone = (e) => {
    const currentPhone = e;
    setPhone(currentPhone);
    const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regex.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setPhoneValid(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다:-)");
      setPhoneValid(true);
    }
  };

  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhone(currentNumber + "-");
      handlePhone(currentNumber + "-");
      console.log(currentNumber);
    } else {
      handlePhone(currentNumber);
    }
  };

  // 이름 유효성 검사
  const handleName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
      setNameValid(false);
    } else {
      setNameMessage("사용가능한 이름 입니다.");
      setNameValid(true);
    }
  };
  // 회원가입 검사

  // 중복 이메일 검사

  return (
    <div style={{ margin: "auto" }}>
      <div className="signuppage">
        <div className="siginup_titleWrap">HAMZZI</div>

        <div className="siginup_contentWrap">
          <div className="siginup_inputTitle">이메일 주소</div>
          <div className="siginup_inputWrap">
            <input
              className="siginup_input"
              type="text"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="siginup_errorMessageWrap">{emailMessage}</div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="siginup_inputWrap">
            <input
              className="siginup_input"
              type="password"
              value={password}
              onChange={handlePw}
            />
          </div>
          <div className="siginup_errorMessageWrap">{passwordMessage}</div>

          <div>비밀번호 확인</div>
          <div className="siginup_inputWrap">
            <input
              className="siginup_input"
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirm}
            />
          </div>
          <div className="siginup_errorMessageWrap">
            {passwordConfirmMessage}
          </div>

          <div>닉네임</div>
          <div className="siginup_inputWrap">
            <input
              className="siginup_input"
              type="text"
              value={nickname}
              onChange={handleNickname}
            />
          </div>
          <div className="siginup_errorMessageWrap">{nicknameMessage}</div>

          <div>이름</div>
          <div className="siginup_inputWrap">
            <input
              className="siginup_input"
              type="text"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="siginup_errorMessageWrap">{nameMessage}</div>

          <div>성별</div>
          <div className="siginup_inputWrap">
            <select className="siginup_pick_gender">
              <option value="제3의성">선택 안함</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>

          <div>전화번호</div>
          <div className="siginup_inputWrap">
            <input
              className="siginup_input"
              type="text"
              placeholder="010-0000-0000"
              onChange={addHyphen}
            />
          </div>
          <div className="siginup_errorMessageWrap">{phoneMessage}</div>
        </div>

        <div>
          <button
            onClick={register}
            disabled={notAllow}
            className="siginup_bottomButton"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
