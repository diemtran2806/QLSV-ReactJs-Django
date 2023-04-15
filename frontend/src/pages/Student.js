import React from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
const StudentsPage = (props) => {
  // const students = [
  //   { id: 1, Tên: 'Wasif', Tuổi: 24, email: 'wasif@email.com',hihi: 'wasif@email.com'},
  //   { id: 6, Tên: 'Ali', Tuổi: 19, email: 'ali@email.com',hihi: 'wasif@email.com'},
  //   { id: 3, Tên: 'Saad', Tuổi: 16, email: 'saad@email.com',hihi: 'wasif@email.com'},
  //   { id: 4, Tên: 'Asad', Tuổi: 25, email: 'asad@email.com',hihi: 'wasif@email.com'},
  // ]
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  useEffect(() => {
    setIsAdmin(props.admin);
  }, [props.admin]);

  const [searchParams] = useSearchParams();
  const [id, setId] = useState(Number(searchParams.get("id")) || 1);

  useEffect(() => {
     if (id) {
      // lấy data sinh viên theo lớp
      axios.get(`https://reqres.in/api/users?page=${id}`)
        .then(response => {
          console.log(response.data.data)
          setStudents(response.data.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    } else {
      // nếu không có thì lấy tất cả sinh viên 
      axios.get("https://reqres.in/api/users")
        .then(response => {
          setStudents(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);
  
  return <>
        {
          loading ? (
            <p>Loading..{id}</p>
          ):
          (
            isAdmin?
              <TableList key="admin" data={students} update={true} del={true} checkbox={true}/>:
              <TableList key="user" data={students}/>
          )
        }
  </>;
};

export default StudentsPage;


