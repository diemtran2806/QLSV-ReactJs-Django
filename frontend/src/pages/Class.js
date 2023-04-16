import React from "react";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";

const ClassPage = (props) => {
  const Class = [
    {id: 1, "Khoa quản lý":"Khoa Công nghệ thông tin", "Tên Lớp":"20T2", "Số lượng":33},
    {id: 2, "Khoa quản lý":"Khoa Công nghệ thông tin", "Tên Lớp":"20T1", "Số lượng":32},
    {id: 3, "Khoa quản lý":"Khoa Điện",                "Tên Lớp":"20D1", "Số lượng":20},
    {id: 4, "Khoa quản lý":"Kiến trúc",                "Tên Lớp":"20KT", "Số lượng":25},
    {id: 5, "Khoa quản lý":"Khoa Cầu đường",           "Tên Lớp":"20VLXD", "Số lượng":36},
  ]

  const [isAdmin, setIsAdmin] = useState(props.admin);
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  return (
    <>
      {
        isAdmin?
          <TableList key="admin" data={Class} update={true} detail={"/student"}/>
        :
          <TableList key="user" data={Class} detail={"/student"}/>
      }
    </>
  );
};

export default ClassPage;
