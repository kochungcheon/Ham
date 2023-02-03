import React, { useState, useEffect, useRef } from "react";
import Friends from "./boardpages/Friends";
import Profile from "./boardpages/Profile";
import Quests from "./boardpages/Quests";
import Todos from "./boardpages/Todos";
import Guild from "./boardpages/Guild";
import axios from "axios";
import "../../styles/Board.css";

const Board = () => {
  const [show, setShow] = useState({
    todoShow: true,
    questShow: false,
    guildShow: false,
    friendShow: false,
    profileShow: false,
  });
  const email = JSON.parse(localStorage.getItem("user"));

  const onClickTodo = () => {
    setShow({
      questShow: false,
      guildShow: false,
      friendShow: false,
      profileShow: false,
      todoShow: true,
    });
  };

  const onClickQuest = () => {
    setShow({
      todoShow: false,

      guildShow: false,
      friendShow: false,
      profileShow: false,
      questShow: true,
    });
  };

  const onClickGuild = () => {
    setShow({
      todoShow: false,
      questShow: false,

      friendShow: false,
      profileShow: false,
      guildShow: true,
    });
  };

  const onClickFriend = () => {
    setShow({
      todoShow: false,
      questShow: false,
      guildShow: false,

      profileShow: false,
      friendShow: true,
    });
  };

  const onClickProfile = () => {
    setShow({
      todoShow: false,
      questShow: false,
      guildShow: false,
      friendShow: false,
      profileShow: true,
    });
  };
  const getProfile = () => {
    axios
      .get(`http://3.35.88.23:8080/api/user/mypage?email=${email}`)
      .then((res) => {
        console.log(res.data.nickname);
        localStorage.setItem("nickname", res.data.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {show.todoShow && <Todos />}
      {show.questShow && <Quests />}
      {show.guildShow && <Guild />}
      {show.friendShow && <Friends />}
      {show.profileShow && <Profile />}

      {/* 보드 하단 버튼 리스트 */}
      <div className="BoardButton">
        <button
          onClick={onClickTodo}
          style={{ borderRight: "3px solid black" }}
        >
          Todo
        </button>
        <button
          onClick={onClickQuest}
          style={{ borderRight: "3px solid black" }}
        >
          Quest
        </button>
        <button
          onClick={onClickGuild}
          style={{ borderRight: "3px solid black" }}
        >
          Guild
        </button>
        <button
          onClick={onClickFriend}
          style={{ borderRight: "3px solid black" }}
        >
          Friend
        </button>
        <button onClick={onClickProfile} style={{ borderRadius: "50%" }}>
          Profile
        </button>
      </div>
    </>
  );
};

export default Board;
