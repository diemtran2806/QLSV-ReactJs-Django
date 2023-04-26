import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import style from "./StudentUpdate.module.css"
import classnames from 'classnames';
import axios from "axios";
import { Select, Space } from 'antd';
const StudentUpdatePage = (props) => {
    const [idUpdate, setIdUpdate] = useState(props.id);
    const [studentIDURL, setStudentIDURL] = useState(`http://127.0.0.1:8000/api/student/${idUpdate}`);
    const [loading, setLoading] = useState(true);
    const [formValue, setFormValue] = useState();
    const [updateId,setUpdateId] = useState(props.id);

    useEffect(()=>{
      axios.get(studentIDURL)
      .then(response => {
        //data
        let data = response.data.id_user;
        
        let form = {
            id:data.id,
            mssv:data.mssv,
            name:data.name,
            phone:data.phone,
            email:data.email,
            cccd:data.cccd,
            gender:data.gender,
            address:data.address,
            dob:data.dob,
            classId:response.data.id_class.id_class
        }
        console.log("form nef",form)
        setFormValue(form);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
    },[]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
    };

    return(
            loading?<></>:
            <>
                <div className={style.row}>
                    <div className={classnames(style['input-item'], style.col50)}>
                        MSSV
                        <Input
                            label="Tài khoản"
                            type="text" 
                            name="mssv"
                            id="mssv"
                            value={formValue.mssv}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classnames(style['input-item'], style.col50)}>
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
                    <div className={classnames(style['input-item'], style.col50)}>
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
                    <div className={classnames(style['input-item'], style.col50)}>
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
                <div className={ classnames(style['input-item'])}>
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
                <div className={ classnames(style['input-item'])}>
                <div>
                    Giới tính
                </div>
                <Space wrap>
                    <Select
                    defaultValue={formValue.gender}
                    style={{ width: 120 }}
                    onChange={handleInputChange}
                    options={[
                        { value: true, label: 'Nam' },
                        { value: false, label: 'Nữ' },
                    ]}
                    />
                </Space>
                </div>
                <div className={ classnames(style['input-item'])}>
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
                <div className={ classnames(style['input-item'])}>
                    Ngày sinh
                    <Input
                        label="Tài khoản"
                        type="text"
                        name="dob"
                        id="dob"
                        value={formValue.dob}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={ classnames(style['input-item'])}>
                    Lớp
                    <Input
                        label="Tài khoản"
                        type="text"
                        name="className"
                        id="className"
                        value={formValue.classId}
                        onChange={handleInputChange}
                    />
                </div>
            </>
            
    )


}

export default StudentUpdatePage;