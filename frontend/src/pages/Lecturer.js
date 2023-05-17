import React from "react";
import { useSearchParams, useParams} from "react-router-dom";
import {  Button, Modal, Skeleton, Space, message} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import LecturerAddEdit from "../components/addEditLecturer/";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
const LecturersPage = (props) => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isAdmin, setIsAdmin] = useState(user?(user.user.id_role==3?true:false):false);
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
  const loadData = (searchValue=null) => {
    let url = null
    if(searchValue){
      url = `http://127.0.0.1:8000/api/lecturer?search=${searchValue}`;
    }else{
      url = `http://127.0.0.1:8000/api/lecturer`;
    }
    axios.get(url)
      .then(response => {
        //data
        let data = [];
        console.log(response.data)
        response.data.map((item, index) => {
          let lecturer = item.id_user;
          const lect = {
            "id": lecturer.id,
            "msgv": lecturer.mssv,
            "Tên": lecturer.name,
            "email": lecturer.email,
            "SĐT": lecturer.phone,
            "Giới tính": lecturer.gender?"Nam":"Nữ" ,
            "cccd": lecturer.cccd,
            "Ngày sinh": lecturer.dob,
            "Địa chỉ": lecturer.address,
            "Khoa": item.id_faculty.name_faculty,
            "avatar": lecturer.avatar
          }
          data.push(lect);
        })
        setLecturers(data);
        setLoading(false);
      })
      .catch(error => {
        console.log("lỗi rùi",error);
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
    let url = `http://127.0.0.1:8000/api/lecturer/${id}/delete`
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
                <TableList key="admin" data={lecturers}  create={handleCreateActive} update={handleUpdateActive} delete={handleDelete} deleteMul={handleDeleteMul} addButton={true} checkbox={true}  loadData={loadData}/>:
                <TableList key="user" data={lecturers}  loadData={loadData}/>
              }
            </BodyBox>
            
              <LecturerAddEdit isAdd={isAdd} id={updateId} open={isModal} setOpen={setIsModal} loadData={loadData}/>
          </> 
        }
         
  </>;
};

export default LecturersPage;