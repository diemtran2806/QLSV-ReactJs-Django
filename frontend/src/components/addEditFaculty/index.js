import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import style from "./AddEdit.module.css"
import classnames from 'classnames';
import axios from "axios";
import { Select, Space, Button, message, Modal} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/index";
const FacultyAddEdit = (props) => {
    const [loading, setLoading] = useState(true);
    const [formValue, setFormValue] = useState();
    const isAdd = props.isAdd;// add/update
    const updateId = props.id;// id user update
    const [lecturer, setLecturer] = useState();
    const [faculty, setFaculty] = useState();

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

    const loadData = () =>{
        if(!props.isAdd && props.id){
            const accessToken = user?.accessToken;
            axios({
                method: "get",
                url: `http://127.0.0.1:8000/api/faculty/${updateId}`,
                headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/json",
                },
              })
            .then(response => {
            //data
                const data = response.data;
                let form = {
                    id_faculty: data.id_faculty,
                    faculty_name: data.name_faculty,
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
                id_faculty: "",
                faculty_name: "",
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
            url = `http://127.0.0.1:8000/api/faculty/create` 
        }else{
            url = `http://127.0.0.1:8000/api/faculty/${updateId}/update` 
        }
        console.log(url)
        const data = {
            name_faculty: formValue.faculty_name,
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
                        
                        <div className={classnames(style['input-item'])}>
                            Tên
                            <Input
                                label="Tài khoản"
                                type="text"
                                name="faculty_name"
                                id="faculty_name"
                                value={formValue.faculty_name}
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

export default FacultyAddEdit;