import React from "react";
import style from "./Student.module.css"
import { useSearchParams } from "react-router-dom";
import {  Button, Modal  } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import StudentUpdatePage from "./StudentUpdate";

const StudentsPage = (props) => {
  const [students, setStudents] = useState([
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 7, "Tên": 'Wavvbvbnsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Lớp":"20T2", avatar:"https://img.com/sdfsdf"},
    
  ])
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  const [searchParams] = useSearchParams();
  const [id, setId] = useState(Number(searchParams.get("id")) || 1);
  const [isUpdate,setIsUpdate] = useState(false);
  const [updateId,setUpdateId] = useState(null);

  // useEffect(() => {
  //    if (id) {
  //     // lấy data sinh viên theo lớp
  //     axios.get(`https://reqres.in/api/users?page=${id}`)
  //       .then(response => {
  //         if(response.data.data){
  //           setStudents(response.data.data);
  //         }
  //         else{
  //           setStudents([]);
  //         }
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   } else {
  //     // nếu không có thì lấy tất cả sinh viên 
  //     axios.get("https://reqres.in/api/users")
  //       .then(response => {
  //         setStudents(response.data);
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   }
  // }, [id]);
  
  const handleUpdateActive = (id) => {
    console.log("huhuh toimetqua")
    setUpdateId(id);
    setIsUpdate(true);
  }

  return <>
        {
          loading ? (
            <p>Loading..{id}</p>
          ):
          (
            <BodyBox>
              {
                isAdmin?
                <TableList key="admin" data={students} update={handleUpdateActive} del={true} checkbox={true}/>:
                <TableList key="user" data={students}/>
              }
            </BodyBox>
          )
        }
        {
            <Modal
              centered
              open={isUpdate}
              onOk={() => setIsUpdate(false)}
              onCancel={() => setIsUpdate(false)}
              width={1000}
              okText="Cập nhật"
              cancelText="Hủy"
              okButtonProps = {{style:{backgroundColor: '#283c4e'}}}
              closable = {false}
            >
            <div >
              <div className={style.rel}></div>
              <div className={style['model-header']}>Cập nhật sinh viên</div>
            </div>
            <StudentUpdatePage id={updateId} data={students[1]}/>
          </Modal>
        }
  </>;
};

export default StudentsPage;


