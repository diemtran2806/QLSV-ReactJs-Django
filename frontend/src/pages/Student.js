import React from "react";
import style from "./Student.module.css"
import { useSearchParams } from "react-router-dom";
import {  Button, Modal  } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import StudentUpdatePage from "./StudentUpdate";

const getAllUserURL = "http://127.0.0.1:8000/api/student/"

const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  const [searchParams] = useSearchParams();
  const [id, setId] = useState(Number(searchParams.get("id")) || 1);
  const [isUpdate,setIsUpdate] = useState(false);
  const [updateId,setUpdateId] = useState(null);

  //get list student on server
  useEffect(() => {
      // nếu không có thì lấy tất cả sinh viên 
      axios.get(getAllUserURL)
        .then(response => {
          //data
          let data = [];
          response.data.map((student, index) => {
            const user = student.id_user;
            const stu = {
              id: user.id,
              mssv: user.mssv,
              Tên: user.name,
              email:user.email ,
              SĐT:user.phone ,
              "Giới tính":user.gender?"Nam":"Nữ" ,
              cccd:user.cccd ,
              "Ngày sinh":user.dob ,
              "Địa chỉ":user.address ,
              avatar:user.avatar,
              "Điểm trung bình": student.avg_score,
            }
            data.push(stu);
          })
          setStudents(data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
  }, []);

  const handleUpdateActive = (id) => {
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
            <StudentUpdatePage id={updateId}/>
          </Modal>
        }
  </>;
};

export default StudentsPage;


  // useEffect(() => {
  //   setIsAdmin(props.admin);
  // }, [props.admin]);

  // const [searchParams] = useSearchParams();
  // const [id, setId] = useState(Number(searchParams.get("id")) || 1);
  // const [isUpdate,setIsUpdate] = useState(false);
  // const [updateId,setUpdateId] = useState(null);

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
  //     axios.get("http://127.0.0.1:8000/api/student/")
  //       .then(response => {
  //         setStudents(response.data);
  //         console.log("huhu",response.data);
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   }
  // }, [id]);
