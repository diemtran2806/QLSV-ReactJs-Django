import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import classes from "./Admin.module.css";
// import { Select, Space } from 'antd';
import { Button, Modal } from "antd";
const AdminPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [admins, setAdmins] = useState([]);

  //   useEffect(() => {
  //     const getAdmins = async () => {
  //       const response = await fetch(
  //         "https://react-http-e3a5b-default-rtdb.firebaseio.com/meals.json"
  //       );

  //       if (!response.ok) {
  //         throw new Error("Something went wrong!");
  //       }

  //       const responseData = await response.json(); //vì nó vẫn trả về promise nên phải có await

  //       const loadedMeals = [];
  //       for (const key in responseData) {
  //         loadedMeals.push({
  //           id: key,
  //           name: responseData[key].name,
  //           description: responseData[key].description,
  //           price: responseData[key].price,
  //         });
  //       }

  //       setMeals(loadedMeals);
  //       setIsLoading(false);
  //     };
  //     fetchMeals().catch((error) => {
  //       setIsLoading(false);
  //       setHttpError(error.message);
  //     });
  //   }, []);

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
        <TableList key="admin" data={admin} update={true} addButton={true} checkbox={true} />
      </BodyBox>
      {
        <Modal
          centered
          open={isUpdate}
          onOk={() => setIsUpdate(false)}
          onCancel={() => setIsUpdate(false)}
          width={1000}
          okText="Cập nhật"
          cancelText="Hủy"
          okButtonProps={{ style: { backgroundColor: "#283c4e" } }}
          closable={false}
        >
          <div>
            <div className={classes.rel}></div>
            <div className={classes["model-header"]}>Cập nhật sinh viên</div>
          </div>
          {/* <StudentUpdatePage id={adminId} /> */}
        </Modal>
      }
    </>
  );
};

export default AdminPage;
