import React from "react";
import style from "./Student.module.css"
import { useSearchParams } from "react-router-dom";
import {  Button, Modal, Skeleton, Space} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import StudentAddEdit from "./StudentAddEdit";
import { IoIosAddCircle } from "react-icons/io";
import { ImBin2 } from "react-icons/im";
import Loading from "../components/Loading";
const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);
  const [studentIDURL, setStudentIDURL] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  const [searchParams] = useSearchParams();
  const [idClass, setIdClass] = useState(Number(searchParams.get("id")));//user of class

  const [isModal,setIsModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);// add/update
  const [updateId,setUpdateId] = useState();// id user update

  //get all user load table
<<<<<<< HEAD
  const loadData = () => {
    axios.get("http://127.0.0.1:8000/api/student/")
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
=======
  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/student/")
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
>>>>>>> f661503b5bf511809b9a67fe96619bd70aa6a90a
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
  
  const handleUpdateSubmit = ()=>{
    
  }

  return <>
        {
          loading?<BodyBox><Skeleton/><Loading/></BodyBox>:
          <>
            <BodyBox>
              <div className={style['head-button']}>
              <Space wrap>
                        
                <Button onClick={handleCreateActive} type="primary">Thêm SV<IoIosAddCircle/> </Button>
                <Button type="primary" danger>Xóa<ImBin2/></Button>
                </Space> 
              </div>
              {
                isAdmin?
                <TableList key="admin" data={students} update={handleUpdateActive} del={true} checkbox={true}/>:
                <TableList key="user" data={students}/>
              }
            </BodyBox>
            <Modal
              centered
              open={isModal}
              onCancel={() => setIsModal(false)}
              width={1000}
              footer={null}
              okText={isAdd?"Tạo mới":"Cập nhật"}
              okButtonProps = {{style:{backgroundColor: '#283c4e'}}}
              closable = {false}
            >
              <div>
                <div className={style.rel}></div>
                <div className={style['model-header']}>Cập nhật sinh viên</div>
              </div>
              <StudentAddEdit isAdd={isAdd} id={updateId} setIsModal={setIsModal} loadData={loadData}/>
            </Modal>
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
