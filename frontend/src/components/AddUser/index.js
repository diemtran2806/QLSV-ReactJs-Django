import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import style from "../../components/addEditStudent/AddEdit.module.css";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format } from 'date-fns'
import { Select, Space } from "antd";
import { Button, Modal } from "antd";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
const AddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [updateId, setUpdateId] = useState(props.id); // id user update
  const user = useSelector((state) => state.auth.login.currentUser);
  const [startDate, setStartDate] = useState(new Date());

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleCancel();
  };

  useEffect(() => {
    setUpdateId(props.id);
    console.log("id", updateId);
    if (updateId !== null) {
      getUserUpdate();
    }
  }, [props.id]);

  const [formValue, setFormValue] = useState({
    // id: "",
    mssv: "",
    password: "123456",
    name: "",
    phone: "",
    email: "",
    cccd: "",
    gender: true,
    address: "",
    dob: "",
    id_role: 3,
    avatar:
      "https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-750x600.jpg",
  });

  // nhập
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

   //chọn trong option
  const handleSelect = (value,name) => {
      setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
      });
  };

  const addSubmitHandlerModal = () => {
    // console.log(formValue);
    // if (updateId !== null) {
    props.addSubmitHandler(formValue, updateId);
    // } else props.addSubmitHandler(formValue);
    setIsModalOpen(false);
    console.log(formValue);
  };

  const updateSubmitHandlerModal = () => {
    props.updateSubmitHandler(formValue, updateId);
    setIsModalOpen(false);
  };

  const getUserUpdate = async () => {
    const accessToken = user?.accessToken;
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/users/${updateId}`,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //data
        const data = response.data;
        let form = {
          id: data.id,
          id_role: data.id_role,
          mssv: data.mssv,
          name: data.name,
          phone: data.phone,
          email: data.email,
          cccd: data.cccd,
          gender: data.gender,
          address: data.address,
          dob: data.dob,
          avatar: data.avatar,
        };
        setFormValue(form);
        console.log("ava up:", form.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        centered
        open={isModalOpen}
        onOk={
          updateId !== null ? updateSubmitHandlerModal : addSubmitHandlerModal
        }
        onCancel={handleCancel}
        width={1000}
        okText="OK"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: "#283c4e" } }}
        closable={false}
      >
        <div>
          <div className={style.rel}></div>
          <div className={style["model-header"]}>Thêm admin</div>
        </div>
        <div className={style.avatarWrap}>
          <img className={style.avatar} src={formValue.avatar} alt="Logo" />
        </div>
        <input type="text" />
        <div className={style.row}>
          <div className={classnames(style["input-item"], style.col50)}>
            MS Admin
            <Input
              label="Tài khoản"
              type="text"
              name="mssv"
              id="mssv"
              value={formValue.mssv}
              onChange={handleInputChange}
            />
          </div>
          <div className={classnames(style["input-item"], style.col50)}>
            Tên
            <Input
              label="Tài khoản"
              type="text"
              name="name"
              id="name"
              value={formValue.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={style.row}>
          <div className={classnames(style["input-item"], style.col50)}>
            Số điện thoại
            <Input
              label="Tài khoản"
              type="text"
              name="phone"
              id="phone"
              value={formValue.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className={classnames(style["input-item"], style.col50)}>
            Email
            <Input
              label="Tài khoản"
              type="email"
              name="email"
              id="email"
              value={formValue.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={classnames(style["input-item"])}>
          CCCD
          <Input
            label="Tài khoản"
            type="text"
            name="cccd"
            id="cccd"
            value={formValue.cccd}
            onChange={handleInputChange}
          />
        </div>
        <div className={classnames(style["input-item"])}>
          <div>Giới tính</div>
          <Space wrap>
            <Select
              defaultValue={formValue.gender}
              style={{ width: 120 }}
              onChange={handleSelect}
              options={[
                { value: true, label: "Nam" },
                { value: false, label: "Nữ" },
              ]}
            />
          </Space>
        </div>
        <div className={classnames(style["input-item"])}>
          Địa chỉ
          <Input
            label="Tài khoản"
            type="text"
            name="address"
            id="address"
            value={formValue.address}
            onChange={handleInputChange}
          />
        </div>
        <div className={classnames(style["input-item"])}>
          Ngày sinh
          <DatePicker 
              className={style.dateTimePicker}   
              onChange={(date) => {
                  const datePick = format(date, 'yyyy-MM-dd')
                  handleSelect(datePick,"dob")
                  setStartDate(date)
              }}
              selected={startDate}             
              dateFormat="yyyy-MM-dd"
          />
        </div>
      </Modal>
      ;
    </>
  );
};

export default AddUser;
