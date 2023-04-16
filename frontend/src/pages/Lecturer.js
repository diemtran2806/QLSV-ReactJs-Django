import React from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
const LecturerPage = (props) => {
  const [lecturers, setLecturers] = useState([
    { id: 1, "Tên": 'sdfsd', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
    { id: 2, "Tên": 'sdfwer', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
    { id: 3, "Tên": 'Wavbcvbsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
    { id: 4, "Tên": 'Wasfghif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
    { id: 5, "Tên": 'Wajkljif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
    { id: 6, "Tên": 'Waqưesif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
    { id: 7, "Tên": 'Wavvbvbnsif', "Số điện thoại": "0378945213", "email": 'wasif@email.com',"CCCD": 'wasif@email.com', "Giới tính":"Nam","Ngày sinh":"19/05/2002","Khoa":"Khoa Công nghệ thông tin", avatar:"https://img.com/sdfsdf"},
  ])

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  const [searchParams] = useSearchParams();
  const [id, setId] = useState(Number(searchParams.get("id")) || 1);

  // useEffect(() => {
  //    if (id) {
  //     // lấy data sinh viên theo lớp
  //     axios.get(`https://reqres.in/api/users?page=${id}`)
  //       .then(response => {
  //         if(response.data.data){
  //           setLecturers(response.data.data);
  //         }
  //         else{
  //           setLecturers([]);
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
  //         setLecturers(response.data);
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   }
  // }, [id]);
  
  return <>
        {
          loading ? (
            <p>Loading..{id}</p>
          ):
          (
            isAdmin?
              <BodyBox><TableList key="admin" data={lecturers} update={true} checkbox={true}/></BodyBox>:
              <BodyBox><TableList key="user" data={lecturers}/></BodyBox>
          )
        }
  </>;
};

export default LecturerPage;


