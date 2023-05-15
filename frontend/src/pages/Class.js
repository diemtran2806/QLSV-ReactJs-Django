import React from "react";
import { useSearchParams, useParams} from "react-router-dom";
import {  Button, Modal, Skeleton, Space, message} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import ClassAddEdit from "../components/addEditClass/";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
const ClassPage = (props) => {
  const [classs, setClass] = useState([]);
  const [classIDURL, setClassIDURL] = useState();
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
    // if(idClass){
    //   console.log(idClass)
    //   url = `http://127.0.0.1:8000/api/class/class/${idClass}`;
    // }else{
      url = `http://127.0.0.1:8000/api/class/`;
    // }
    console.log(url)
    axios.get(url)
      .then(response => {
        //data
        let data = [];
        console.log(response.data)
        response.data.map((item, index) => {
          const clas = {
            "id": item.id_class,
            "Tên Lớp": item.class_name,
            "Giáo viên chủ nhiệm":item.id_lecturer,
            "Khoa quản lý": item.id_faculty
          }
          data.push(clas);
        })
        setClass(data);
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
    let url = `http://127.0.0.1:8000/api/class/${id}/delete`
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
                <TableList key="admin" data={classs}  create={handleCreateActive} update={handleUpdateActive} delete={handleDelete} deleteMul={handleDeleteMul} checkbox={true}/>:
                <TableList key="user" data={classs}/>
              }
            </BodyBox>
            
              <ClassAddEdit isAdd={isAdd} id={updateId} open={isModal} setOpen={setIsModal} loadData={loadData}/>
          </> 
        }
         
  </>;
};

export default ClassPage;