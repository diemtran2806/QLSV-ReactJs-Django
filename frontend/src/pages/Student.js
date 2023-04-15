import React from "react";
import { useState } from "react";
import TableList from "../components/ListTable";
const StudentsPage = (props) => {
  const students = [
    { id: 1, Tên: 'Wasif', Tuổi: 21, email: 'wasif@email.com',hihi: 'wasif@email.com'},
    { id: 6, Tên: 'Ali', Tuổi: 19, email: 'ali@email.com',hihi: 'wasif@email.com'},
    { id: 3, Tên: 'Saad', Tuổi: 16, email: 'saad@email.com',hihi: 'wasif@email.com'},
    { id: 4, Tên: 'Asad', Tuổi: 25, email: 'asad@email.com',hihi: 'wasif@email.com'},
  ]
  
  const [isAdmin, setIsAdmin] = useState(props.admin);

  return <>
        {
          isAdmin?
            <TableList data={students} update={true} del={true} checkbox={true}/>
          :
            <TableList data={students}/>
        }
  </>;
};

export default StudentsPage;


