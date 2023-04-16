import React from "react";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import ClassPage from "./Class";
import BodyBox from "../components/BodyBox";

const FacultyPage = (props) => {
  const Faculty = [
    {id: 1, "Tên Khoa":"Khoa CNTT"},
    {id: 2, "Tên Khoa":"Khoa QLDA"},
    {id: 3, "Tên Khoa":"Khoa Điện"},
    {id: 4, "Tên Khoa":"Khoa Kiến trúc"},
  ]

  const [isAdmin, setIsAdmin] = useState(props.admin);
  
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  return (
    <>
      {
        isAdmin?
          <BodyBox><TableList key="admin" data={Faculty} update={true} detail={"/class"}/></BodyBox>:
          <BodyBox><TableList key="user" data={Faculty} detail={"/class"}/></BodyBox>
      }
    </>
  );
};

export default FacultyPage;
