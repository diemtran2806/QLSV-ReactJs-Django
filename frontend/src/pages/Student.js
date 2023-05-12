import React from "react";
import style from "./Student.module.css"
import { useSearchParams, useParams} from "react-router-dom";
import {  Button, Modal, Skeleton, Space, message} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import StudentAddEdit from "./StudentAddEdit";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);
  const [studentIDURL, setStudentIDURL] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  const [searchParams] = useSearchParams();
  const {idClass} = useParams();//user of class
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isModal,setIsModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);// add/update
  const [updateId,setUpdateId] = useState();// id user update
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a prompt message for success, and it will disappear in 10 seconds',
      duration: 10,
    });
  };
  //get all user load table
  const loadData = () => {
    let url = null;
    if(idClass){
      console.log(idClass)
      url = `http://127.0.0.1:8000/api/student/class/${idClass}`;
    }else{
      url = `http://127.0.0.1:8000/api/student`;
    }
    axios.get(url)
      .then(response => {
        //data
        let data = [];
        response.data.map((student, index) => {
          const user = student.id_user;
          const stu = {
            id: user.id,
            mssv: user.mssv,
            Tên: user.name,
            "Lớp SH": student.id_class.class_name,
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
      });
  }
  
  useEffect(loadData, []);

  const handleUpdateActive = (id) => {
    setUpdateId(id);
    setIsAdd(false);
    setIsModal(true);
  }

  const handleCreateActive = () => {
    setIsAdd(true);
    setUpdateId(null);
    setIsModal(true);
  }
  
  const handleDelete = (id)=>{
    console.log("delete:",id);
    const accessToken = user?.accessToken;
    let url = `http://127.0.0.1:8000/api/student/${id}/delete`
    axios(
      {
        method: 'delete',
        url:url, 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'            
        }
      }
    )
    .then((response) => {
      message.success('Xóa thành công!');
      loadData();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleDeleteMul = (listDel) => {
    console.log("hihihi")
      listDel.map((item)=>{
        handleDelete(item)
        loadData()
      })
  }
  return <>
        {
          loading?<BodyBox><Skeleton/><Loading/></BodyBox>:
          <>
            <BodyBox>
              
              {
                isAdmin?
                <TableList key="admin" data={students}  create={handleCreateActive} update={handleUpdateActive} delete={handleDelete} deleteMul={handleDeleteMul} checkbox={true}/>:
                <TableList key="user" data={students}/>
              }
            </BodyBox>
            
              <StudentAddEdit isAdd={isAdd} id={updateId} open={isModal} setOpen={setIsModal} loadData={loadData}/>
          </> 
        }
         
  </>;
};

export default StudentsPage;


  // useEffect(() => {
  //   setIsAdmin(props.admin);
  // }, [props.admin]);

  // const [searchParams] = useSearchParams();
  // const [id, setId] = useState(Number(searchParams.get("id")) || 1);
  // const [isModal,setIsModal] = useState(false);
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
