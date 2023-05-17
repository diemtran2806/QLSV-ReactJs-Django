import React from "react";
import { useSearchParams, useParams} from "react-router-dom";
import {  Skeleton , message} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import FacultyAddEdit from "../components/addEditFaculty/";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
const FacultyPage = (props) => {
  const [faculties, setFaculties] = useState([]);
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
    let url = null;
    if(searchValue){
      url = `http://127.0.0.1:8000/api/faculty?search=${searchValue}`;
    }else{
      url = `http://127.0.0.1:8000/api/faculty`;
    }
    axios.get(url)
      .then(response => {
        //data
        let data = [];
        console.log(response.data)
        response.data.map((item, index) => {
          const faculty = {
            "id": item.id_faculty,
            "Tên Khoa": item.name_faculty,
          }
          data.push(faculty);
        })
        setFaculties(data);
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
    let url = `http://127.0.0.1:8000/api/faculty/${id}/delete`
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
                <TableList key="admin" data={faculties}  create={handleCreateActive} update={handleUpdateActive} delete={handleDelete} deleteMul={handleDeleteMul} addButton={true} checkbox={true} detail={"/class"}  loadData={loadData} />:
                <TableList key="user" data={faculties} detail={"/class"}  loadData={loadData} />
              }
            </BodyBox>
            
              <FacultyAddEdit isAdd={isAdd} id={updateId} open={isModal} setOpen={setIsModal} loadData={loadData} />
          </> 
        }
         
  </>;
};

export default FacultyPage;
