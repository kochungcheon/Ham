<<<<<<< HEAD
import React, { useState, useRef } from "react";
=======
import React, {useState, useRef} from "react";
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authSlice";
import Header from "./../../../components/Header";
import { GiAchievement } from "react-icons/gi";
<<<<<<< HEAD
import DiaryEditor from "./../../../components/GuestBook/DiaryEditor";
import DiaryList from "./../../../components/GuestBook/DiaryList";
import "../../../styles/Profile.css";

const Profile = () => {
  const user = localStorage.getItem("nickname");
=======
import DiaryEditor from './../../../components/GuestBook/DiaryEditor';
import DiaryList from './../../../components/GuestBook/DiaryList';
import '../../../styles/Profile.css'



const Profile = () => {
  const user = useSelector(selectCurrentUser);
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352

  // 방명록 리스트
  const [data, setData] = useState([]);

  // 방명록 id
<<<<<<< HEAD
  const dataId = useRef(1);
=======
  const dataId = useRef(1)
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352

  // 방명록 생성
  const onCreate = (author, content) => {
    // const created_date = new Date().getTime()
<<<<<<< HEAD

    let today = new Date();
    console.log(today.getMonth());
    let created_date =
      today.getFullYear() +
      "." +
      (today.getMonth() + 1 < 9
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "." +
      (today.getDate() < 9 ? "0" + today.getDate() : today.getDate());
=======
    
    let today = new Date();
    console.log(today.getMonth())
    let created_date = today.getFullYear() + 
    '.' + ((today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1)) +
    '.' + ((today.getDate()) < 9 ? "0" + (today.getDate()) : (today.getDate()))
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352
    const newItem = {
      author,
      content,
      created_date,
<<<<<<< HEAD
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  // 방명록 삭제
  const onDelete = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };
=======
      id: dataId.current
    };
    dataId.current += 1
    setData([newItem, ...data])
  }

  // 방명록 삭제
  const onDelete = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId
    )
    setData(newDiaryList)
  }
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352

  // 방명록 수정
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <>
      <Header data={user} type={"profile"} />
      <div className="MyBody">
        <div className="UserName">
<<<<<<< HEAD
          {/* {user}'s Profile(USERNAME) */}
     
=======
          {user}'s Profile(USERNAME)
          <div className="HamAchievement">
            <GiAchievement size={"40"} color={"orange"} />
            <b>500000</b>
          </div>
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352
        </div>
        <div className="MyBody2">
          <div className="HamGrad">
            <div className="HamSlot">
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
            </div>
            <div className="HamSlot">
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
            </div>
            <div className="HamSlot2">
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
              <div className="HamSlotSlot">
                <img src="hamzzi.png" style={{ width: "100%" }} alt="" />
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div className="GuestBook">
            <DiaryEditor onCreate={onCreate} />
            <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
          </div>
=======
          <div className="GuestBook"><DiaryEditor onCreate={onCreate}/><DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit}/></div>
>>>>>>> d71fbd50837b97bd096f25692dba0e251672d352
        </div>
      </div>
    </>
  );
};

export default Profile;
