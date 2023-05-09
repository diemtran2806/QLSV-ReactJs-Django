import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import style from "./StudentUpdate.module.css"
import classnames from 'classnames';
import axios from "axios";
import { Select, Space, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
const StudentAddEdit = (props) => {
    const [loading, setLoading] = useState(true);
    const [formValue, setFormValue] = useState();
    const [isAdd, setIsAdd] = useState(true);// add/update
    const [updateId,setUpdateId] = useState(props.id);// id user update
    const [classes, setClasses] = useState();

    const user = useSelector((state) => state.auth.login.currentUser);
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


    useEffect(()=>{
        setUpdateId(props.id);
        setIsAdd(props.isAdd)
    },[props.id, props.isAdd]);

    //get all class
    useEffect(()=>{
        // Gọi API để lấy dữ liệu
        const accessToken = user?.accessToken;
        axios.get('http://127.0.0.1:8000/api/class/', {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log("lớp nè",response.data);
            const res = response.data;
            const newClass = res.map(({id_class, class_name})=>{
                return {value:id_class, label:class_name}
            })
            setClasses(newClass);
        })
        .catch((error) => {
          console.log(error);
        });
    },[]);

    

    useEffect(()=>{
        if(!isAdd){
            axios.get(`http://127.0.0.1:8000/api/student/${updateId}`)
            .then(response => {
            //data
                const data = response.data;
                let form = {
                    id: data.id_user.id,
                    mssv : data.id_user.mssv,
                    name : data.id_user.name,
                    phone : data.id_user.phone,
                    email : data.id_user.email,
                    cccd : data.id_user.cccd,
                    gender : data.id_user.gender,
                    address : data.id_user.address,
                    dob : data.id_user.dob,
                    classId : data.id_class.id_class,
                    avatar : data.id_user.avatar 
                }
                setFormValue(form);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
        }else{
            let form = {
                id:"",
                mssv:"",
                name:"",
                phone:"",
                email:"",
                cccd:"",
                gender:true,
                address:"",
                dob:"",
                classId:"",
                avatar:"https://scontent.fhan3-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=blIOUfZoi4EAX-l182P&_nc_ht=scontent.fhan3-1.fna&oh=00_AfD-rSsRpHTWGNKgzAlsN1Djrz-oyfuo5KVY1Qng3C-LQw&oe=646FE778"
            }
            setFormValue(form);
            setLoading(false);
        }
    },[updateId]);


    const handleAddUpdate = () => {
        axios.get(
            'http://127.0.0.1:8000/api/class/', 
            {
                headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
                }
            },
            {
                "avg_score": 8.5,
                "id_class": 2,
                "id_user":
                {
                    "mssv": "102200315",
                    "name": "Nguyen Thi F",
                    "email": "fafa@gmail.com",
                    "phone": "0120000715",
                    "gender": false,
                    "id_role": 1,
                    "cccd": "123000013",
                    "dob": "2000-01-01",
                    "address": "Hueee",
                    "avatar": "https://dthezntil550i.cloudfront.net/86/latest/861911302007288750002221253/05f85cab-dc3a-48e3-81ff-b7347d2e450b.png"
                }
            }
        )
        .then((response) => {
            console.log("lớp nè",response.data);
            const res = response.data;
            const newClass = res.map(({id_class, class_name})=>{
                return {value:id_class, label:class_name}
            })
            setClasses(newClass);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return(
            loading?<Loading/>:
            <>
                <div className={style.avatarWrap}>
                    <img className={style.avatar} src={formValue.avatar} alt="Logo" />
                </div>  
                <input type="text"/>
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
                    name="gender"
                    defaultValue="Chọn Giới Tính"
                    value={formValue.gender}
                    style={{ width: 120 }}
                    onChange={(value)=>handleSelect(value,"gender")}
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
                    <div>Lớp SH</div>
                        <Space wrap>
                            <Select
                                name="classId"
                                value={isAdd?"Chọn lớp":formValue.classId}
                                style={{ width: 120 }}
                                onChange={(value)=>handleSelect(value,"classId")}
                                options={classes}
                            />
                        </Space>
                </div>

                <div className={style.buttonWrap}>
                    <Space wrap>
                        <Button onClick={()=>props.setIsModal(false)}>Cancle</Button>
                        <Button 
                            onClick={handleAddUpdate}
                            style={{ backgroundColor: '#283c4e', borderColor: '#283c4e', color: "white" }}>
                            {isAdd?'Thêm mới':'Cập nhật'}
                        </Button>
                    </Space>    
                </div>
            </>
    )
}

export default StudentAddEdit;