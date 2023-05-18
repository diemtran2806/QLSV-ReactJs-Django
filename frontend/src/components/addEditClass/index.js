import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import style from "./AddEdit.module.css"
import classnames from 'classnames';
import axios from "axios";
import { Select, Space, Button, message, Modal} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/index";
const ClassAddEdit = (props) => {
    const [loading, setLoading] = useState(true);
    const [formValue, setFormValue] = useState();
    const isAdd = props.isAdd;// add/update
    const updateId = props.id;// id user update
    const [lecturer, setLecturer] = useState();
    const [faculty, setFaculty] = useState();
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'This is a prompt message for success, and it will disappear in 10 seconds',
        duration: 10,
      });
    };

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

    //get all lecturer
    useEffect(()=>{
        // Gọi API để lấy dữ liệu
        axios.get('http://127.0.0.1:8000/api/lecturer', {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const res = response.data;
            const newLecturer = res.map(({id,id_user})=>{
                return {value:id, label:id_user.name}
            })
            console.log("newlecturer",newLecturer)
            setLecturer(newLecturer);
        })
        .catch((error) => {
          console.log(error);
        });
    },[]);

    //get all faculty
    useEffect(()=>{
        // Gọi API để lấy dữ liệu
        const accessToken = user?.accessToken;
        axios.get('http://127.0.0.1:8000/api/faculty', {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const res = response.data;
            const newFaculaty = res.map(({id_faculty,name_faculty})=>{
                return {value:id_faculty, label:name_faculty}
            })
            setFaculty(newFaculaty);
        })
        .catch((error) => {
          console.log(error);
        });
    },[]);

    const loadData = () =>{
        if(!props.isAdd && props.id){
            axios.get(`http://127.0.0.1:8000/api/class/${updateId}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
            //data
                const data = response.data;
                let form = {
                    id_class: data.id_class,
                    class_name: data.class_name,
                    id_faculty:data.id_faculty.id_faculty,
                    id_lecturer: data.id_lecturer.id
                }
                setFormValue(form);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
        }
    };

    // useEffect(()=>{
    //     loadData()
    // },[isAdd])

    useEffect(()=>{
        if(isAdd){
            let form = {
                id_class: "",
                class_name: "",
                id_faculty:"",
                id_lecturer: ""
            }
            setFormValue(form);
            setLoading(false);
        }
    },[props.open])

    useEffect(()=>{
        loadData()
    },[props.id])

    const handleAddUpdate = () => {
        const accessToken = user?.accessToken;
        let url = ""
        if(isAdd){
            url = `http://127.0.0.1:8000/api/class/create` 
        }else{
            url = `http://127.0.0.1:8000/api/class/${updateId}/update` 
        }
        console.log(url)
        const data = {
            class_name: formValue.class_name,
            id_faculty: formValue.id_faculty,
            id_lecturer: formValue.id_lecturer
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
                            <div className={style['model-header']}>Cập nhật lớp học</div>
                        </div>
                        
                        <div className={style.row}>
                            <div className={classnames(style['input-item'], style.col50)}>
                                Tên
                                <Input
                                    label="Tài khoản"
                                    type="text"
                                    name="class_name"
                                    id="class_name"
                                    value={formValue.class_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        
                       
                        <div className={ classnames(style['input-item'])}>
                            <div>
                                Khoa
                            </div>
                            <Space wrap>
                                <Select
                                name="id_faculty"
                                value={formValue.id_faculty}
                                style={{ width: 120 }}
                                onChange={(value)=>handleSelect(value,"id_faculty")}
                                options={faculty}
                                />
                            </Space>
                        </div>
                       
                       
                        <div className={ classnames(style['input-item'])}>
                            <div>Giáo viên chủ nhiệm</div>
                                <Space wrap>
                                    <Select
                                        name="id_lecturer"
                                        value={formValue.id_lecturer}
                                        style={{ width: 120 }}
                                        onChange={(value)=>handleSelect(value,"id_lecturer")}
                                        options={lecturer}
                                    />
                                </Space>
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

export default ClassAddEdit;