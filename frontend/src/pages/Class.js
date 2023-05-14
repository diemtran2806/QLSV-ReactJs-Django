import React from "react";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";

const ClassPage = (props) => {
  const Class = [
    {id: 1, "Tên Lớp":"20T2",   "Số lượng":33, "Khoa quản lý":"Khoa Công nghệ thông tin",  },
    {id: 2, "Tên Lớp":"20T1",   "Số lượng":32, "Khoa quản lý":"Khoa Công nghệ thông tin",  },
    {id: 3, "Tên Lớp":"20D1",   "Số lượng":20, "Khoa quản lý":"Khoa Điện",                 },
    {id: 4, "Tên Lớp":"20KT",   "Số lượng":25, "Khoa quản lý":"Kiến trúc",                 },
    {id: 5, "Tên Lớp":"20VLXD", "Số lượng":36, "Khoa quản lý":"Khoa Cầu đường",            },
  ]

  const [isAdmin, setIsAdmin] = useState(props.admin);
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  return (
    <>
      {
        isAdmin?
          <BodyBox>
            <TableList key="admin" data={Class} update={true} detail={"/student/class"}/>
          </BodyBox>
        :
          <BodyBox>
            <TableList key="user" data={Class} detail={"/student/class"}/>
          </BodyBox>
      }
    </>
  );
};

export default ClassPage;
