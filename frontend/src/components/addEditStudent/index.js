import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import style from "./AddEdit.module.css"
import classnames from 'classnames';
import axios from "axios";
import { Select, Space, Button, message, Modal} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/index";
const StudentAddEdit = (props) => {
    const [loading, setLoading] = useState(true);
    const [formValue, setFormValue] = useState();
    const isAdd = props.isAdd;// add/update
    const updateId = props.id;// id user update
    const [classes, setClasses] = useState();

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'This is a prompt message for success, and it will disappear in 10 seconds',
        duration: 10,
      });
    };

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

    //get all class
    useEffect(()=>{
        // Gọi API để lấy dữ liệu
        const accessToken = user?.accessToken;
        console.log("token nè", accessToken)
        axios.get('http://127.0.0.1:8000/api/class', {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const res = response.data;
            console.log(res)
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
        loadData()
    },[isAdd])

    useEffect(()=>{
        loadData()
    },[props.id])

    useEffect(()=>{
        if(isAdd){
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
                avatar:"https://tinyurl.com/2l59av9t"
            }
            setFormValue(form);
            setLoading(false);
        }
    },[props.open])

    const loadData = () =>{
        if(!props.isAdd){
            const accessToken = user?.accessToken;
            axios({
                method: "get",
                url: `http://127.0.0.1:8000/api/student/${updateId}`,
                headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/json",
                },
            })
            .then(response => {
            //data
                const data = response.data;
                let form = {
                    id: data.id_user.id,
                    mssv : data.id_user.mssv,
                    name : data.id_user.name,
                    phone : data.id_user.phone,
                    email : data.id_user.email,
                    score : data.avg_score,
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
        }
    };


    const handleAddUpdate = () => {
        const accessToken = user?.accessToken;
        let url = ""
        if(isAdd){
            url = `http://127.0.0.1:8000/api/student/create` 
        }else{
            url = `http://127.0.0.1:8000/api/student/${updateId}/update` 
        }
        const data = {
            "avg_score": parseFloat(formValue.score),
            "id_class": formValue.classId,
            "id_user":
            {
                "mssv": formValue.mssv,
                "name": formValue.name,
                "email": formValue.email,
                "phone": formValue.phone,
                "gender": formValue.gender,
                "cccd": formValue.cccd,
                "dob": formValue.dob,
                "address": formValue.address,
                "avatar": formValue.avatar
            }
        }
        if(isAdd){
            data['id_user']['password'] = formValue.password
        }

        console.log(data);
        axios(
            {
                method: isAdd?'post':'put',
                url:url, 
                data:data,
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'            
                }
            }
            
        )
        .then((response) => {
            console.log(response.status)
            if(response.status==200||response.status==201){
                props.loadData()
                props.setOpen(false)
                if(isAdd){
                    message.success('Thêm thành công!');
                }
                else{
                    message.success('Cập nhật thành công!');
                }
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return(
            <>
                <Modal
                centered
                open={props.open}
                onCancel={() => props.setOpen(false)}
                width={1000}
                footer={null}
                okText={isAdd?"Tạo mới":"Cập nhật"}
                okButtonProps = {{style:{backgroundColor: '#283c4e'}}}
                closable = {false}
                >
                {
                    loading?<Loading/>:
                    <>
                        <div>
                            <div className={style.rel}></div>
                            <div className={style['model-header']}>Cập nhật sinh viên</div>
                        </div>
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
                        {
                            props.isAdd?
                            <div className={classnames(style['input-item'])}>
                                Mật khẩu
                                <Input
                                    label="Tài khoản"
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    value={formValue.password}
                                    onChange={handleInputChange}
                                />
                            </div>:<></>
                        }
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
                                        value={formValue.classId}
                                        style={{ width: 120 }}
                                        onChange={(value)=>handleSelect(value,"classId")}
                                        options={classes}
                                    />
                                </Space>
                        </div>

                        <div className={ classnames(style['input-item'])}>
                            Điểm trung bình
                            <Input
                                label="Điểm trung bình"
                                type="text"
                                name="score"
                                id="avg"
                                value={formValue.score}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={style.buttonWrap}>
                            <Space wrap>
                                <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
                                <Button 
                                    onClick={handleAddUpdate}
                                    style={{ backgroundColor: '#283c4e', borderColor: '#283c4e', color: "white" }}>
                                    {isAdd?'Thêm mới':'Cập nhật'}
                                </Button>
                            </Space>    
                        </div>
                    </>
                }
                
            </Modal>

            </>
    )
}

export default StudentAddEdit;