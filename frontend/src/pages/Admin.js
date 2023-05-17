import { useState, useEffect } from "react";
import TableList from "../components/ListTable";
import BodyBox from "../components/BodyBox";
import classes from "./Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "../components/addEditClass/AddEdit.module.css";
import AddUser from "../components/AddUser";
import { message } from "antd";

import { IoIosAddCircle } from "react-icons/io";
import { ImBin2 } from "react-icons/im";
// import { Select, Space } from 'antd';
import { Button, Modal } from "antd";
const AdminPage = () => {
  //const [isUpdate, setIsUpdate] = useState(false);
  //const [updateId, setUpdateId] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [isAdd, setIsAdd] = useState(false); // add/update
  const [updateId, setUpdateId] = useState(); // id user update

  const [messageApi, contextHolder] = message.useMessage();
  const [mess, showMess] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
      const accessToken = user?.accessToken;
      const handleCancelModal = () => {
    setShowModal(false);
    setShowModalUpdate(false);
  };

  //get all admins load table
  const getAllAdmin = async (searchValue=null) => {
    let url = null;
    if(searchValue){
      url = `http://127.0.0.1:8000/api/users/admin?search=${searchValue}`
    }else{
      url = "http://127.0.0.1:8000/api/users/admin"
    }
    axios({
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //data
        console.log(response);
        let data = [];
        response.data.map((admin, index) => {
          // const user = admin.id_user;
          const ad = {
            id: admin.id,
            // mssv: admin.mssv,
            Tên: admin.name,
            email: admin.email,
            SĐT: admin.phone,
            "Giới tính": admin.gender ? "Nam" : "Nữ",
            cccd: admin.cccd,
            "Ngày sinh": admin.dob,
            "Địa chỉ": admin.address,
            avatar: admin.avatar,
          };
          data.push(ad);
        });
        setAdmins(data);
        //setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllAdmin();
  }, []);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleCreateActive = () => {
    setShowModal(true);
    setUpdateId(null);
  };

  const addSubmitHandler = async (admin) => {
    try {
      // Gọi API để thêm user xuống server
      console.log("admin ne:", admin);
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/register",
        {
          method: "POST",
          body: JSON.stringify(admin),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      localStorage.setItem("modal", "false");
      // showModal(false);
      setAdmins([...admins, admin]);
      getAllAdmin();
      showMess(true);
    } catch (error) {
      console.error(error);
    }
  };

  //update
  const handleUpdateActive = (id) => {
    setUpdateId(id);
    setShowModalUpdate(true);
  };

  useEffect(() => {
    if (mess) {
      message.success("Successfully!");
    }
  }, [mess, messageApi]);

  const deleteSubmitHandler = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,

          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Xóa user khỏi danh sách bằng cách tạo một danh sách mới chỉ chứa những user khác với user đã xóa
      const updatedAdmins = admins.filter((admin) => admin.id !== id);
      setAdmins(updatedAdmins);
      showMess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMul = (listDel) => {
    console.log("hihihi");
    listDel.map((item) => {
      deleteSubmitHandler(item);
      getAllAdmin();
      //loadData();
    });
    showMess(true);
  };

  const updateSubmitHandler = async (admin, id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(admin),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,

          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedAdmin = await response.json();

      setAdmins((prevAdmins) => {
        const index = prevAdmins.findIndex((admin) => admin.id === id);
        const newAdmins = [...prevAdmins];
        newAdmins[index] = updatedAdmin;
        console.log(newAdmins);
        return newAdmins;
      });
      getAllAdmin();
      showMess(true);
    } catch (error) {
      console.error(error);
    }
  };

  // const getAdminDetail = async (adminId) => {
  //   const response = await fetch(`/api/amdib/${adminId}`);
  //   const data = await response.json();
  //   return data;
  // };

  // const handleUpdateAdmin = async (adminId) => {
  //   const data = await getAdminDetail(adminId);
  //   setSelectedAdmin(data);
  // };
  console.log("modal: ", localStorage.getItem("modal"));
  return (
    <>
      <BodyBox>
        {/* <div className={style["head-button"]}>
          <Button onClick={addAdmin} type="primary">
            Thêm SV
            <IoIosAddCircle />{" "}
          </Button>
          <Button type="primary" danger>
            Xóa
            <ImBin2 />
          </Button>
        </div> */}
        <TableList
          key="admin"
          data={admins}
          create={handleCreateActive}
          update={handleUpdateActive}
          checkbox={true}
          del={true}
          addButton={true}
          delete={deleteSubmitHandler}
          deleteMul={handleDeleteMul}
          loadData={getAllAdmin}
        />
      </BodyBox>
      {showModal && (
        <AddUser
          id={null}
          addSubmitHandler={addSubmitHandler}
          handleCancel={handleCancelModal}
        />
      )}
      {showModalUpdate && (
        <AddUser
          updateSubmitHandler={updateSubmitHandler}
          handleCancel={handleCancelModal}
          id={updateId}
        />
      )}{" "}
    </>
  );
};

export default AdminPage;
