import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
const AdminPage = () => {
  const [admin, setAdmin] = useState([
    {
      id: 1,
      Tên: "sdfsd",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
    {
      id: 2,
      Tên: "sdfwer",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
    {
      id: 3,
      Tên: "Wavbcvbsif",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
    {
      id: 4,
      Tên: "Wasfghif",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
    {
      id: 5,
      Tên: "Wajkljif",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
    {
      id: 6,
      Tên: "Waqưesif",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
    {
      id: 7,
      Tên: "Wavvbvbnsif",
      "Số điện thoại": "0378945213",
      email: "wasif@email.com",
      CCCD: "wasif@email.com",
      "Giới tính": "Nam",
      "Ngày sinh": "19/05/2002",
      Khoa: "Khoa Công nghệ thông tin",
      avatar: "https://img.com/sdfsdf",
    },
  ]);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const getAdminDetail = async (adminId) => {
    const response = await fetch(`/api/amdib/${adminId}`);
    const data = await response.json();
    return data;
  };

  const handleUpdateAdmin = async (adminId) => {
    const data = await getAdminDetail(adminId);
    setSelectedAdmin(data);
  };

  return (
    <>
      <BodyBox>
        <TableList key="admin" data={admin} update={true} checkbox={true} />
      </BodyBox>
    </>
  );
};

export default AdminPage;
