import Input from "antd/es/input/Input";
import { useState } from "react";
import style from "./StudentUpdate.module.css"
import classnames from 'classnames';
const StudentUpdatePage = (props) => {
    const [formValue, setFormValue] = useState(props.data);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
    };

    const { name, phone, email, cccd, gender, address, dob, className} = formValue;
    
    return(
        <>
            <div className={style.row}>
                <div className={classnames(style['input-item'], style.col50)}>
                    MSSV
                    <Input
                        label="Tài khoản"
                        type="text" 
                        name="mssv"
                        id="mssv"
                        value={props.id}
                        onChange={handleChange}
                    />
                </div>
                <div className={classnames(style['input-item'], style.col50)}>
                    Tên
                    <Input
                        label="Tài khoản"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
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
                        value={phone}
                        onChange={handleChange}
                    />
                </div>
                <div className={classnames(style['input-item'], style.col50)}>
                    Email
                    <Input
                        label="Tài khoản"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
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
                    value={cccd}
                    onChange={handleChange}
                />
            </div>
            <div className={ classnames(style['input-item'])}>
                Giới tính
                <Input
                    label="Tài khoản"
                    type="text"
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={handleChange}
                />
            </div>
            <div className={ classnames(style['input-item'])}>
                Địa chỉ
                <Input
                    label="Tài khoản"
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={handleChange}
                />
            </div>
            <div className={ classnames(style['input-item'])}>
                Ngày sinh
                <Input
                    label="Tài khoản"
                    type="text"
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={handleChange}
                />
            </div>
            <div className={ classnames(style['input-item'])}>
                Lớp
                <Input
                    label="Tài khoản"
                    type="text"
                    name="className"
                    id="className"
                    value={className}
                    onChange={handleChange}
                />
            </div>
            
        </>
    )


}

export default StudentUpdatePage;