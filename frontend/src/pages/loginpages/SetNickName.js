import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../styles/Modal.css";

const SetNickName = () => {
  const [nickName, SetNickName] = useState("");
  const [text, setText] = useState("");
  const [modal, setModal] = useState(true);
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem("user"));
  console.log(typeof nickName, nickName);
  const handleChange = (e) => {
    setText(e.target.value);
    SetNickName(e.target.value);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // 요청 주소 수정 예정
      .put(
        `http://3.35.88.23:8080/api/user/nickname?nickname=${nickName}&email=${email}`
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("nickname", nickName);
        navigate("/petName");
      })
      .catch((err) => {
        console.log(err);
        SetNickName("");
        setText("");
        alert("사용할 수 없는 이름입니다!");
      });
  };
  return (
    <>
      <div className="Modal">
        <div className="modalBody">
          <h1>환영합니다!</h1>
          <h2>닉네임을 설정해 주세요</h2>
          <p>설정하신 닉네임은 다시 바꿀 수 없습니다</p>
          <form onSubmit={handleSubmit}>
            <input
              name="nickname"
              placeholder="닉네임입력"
              onChange={handleChange}
              value={text}
            />
            <button type="submit"> 설정하기</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetNickName;
