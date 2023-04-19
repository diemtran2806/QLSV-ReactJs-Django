import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tableStyle from "./ListTable.module.css";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

const TableList = (props) => {
  const [data, setData] = useState(props.data);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [header,setHeader] = useState(Object.keys(data[0]).map((key, index) => key));
  const [update, setUpdate] = useState(typeof props.update === 'function');
  const [del, setDel] = useState(props.del);
  const [checkbox,setCheckbox] = useState(props.checkbox)
  const [detail,setDetail] = useState(props.detail)
  const [avatar, setAvatar] = useState(false);
  useEffect(()=>{
    const hasAvatar = data.some(item => item.hasOwnProperty('avatar'));
    setAvatar(hasAvatar);
  },[data])

  const handleCheck = (event) => {
    const checkboxValue = parseInt(event.target.value);
    if (event.target.checked) {
      setChecked([...checked, checkboxValue]);
    } else {
       setChecked(checked.filter((item) => item !== checkboxValue));
    }
  };

  const handleCheckAll = (event) => {
    const checkboxValue = parseInt(event.target.value);
    if (event.target.checked) {
      const allCheckboxValues = data.map((data) => data.id);
      setChecked(allCheckboxValues);
    } else {
      setChecked([]);
    }
  };

  const handleDelete = (id) => {
    console.log("del:", id);
  };

  const handleUpdate = (id) => {
    props.update(id)
  };
  
  const renderTableHeader = () => {
    return (
        <>
          <thead>
            <tr>
              {
                checkbox?
                  <th >
                    <input type="checkbox" checked={data.length === checked.length} onChange={handleCheckAll}/>
                  </th>
                :
                  <></>
              }

              {
                avatar?
                  <th>Ảnh</th>
                :
                  <></>
              }
              
              {
                header.map((key, index) => {
                    if(key !== 'avatar'){
                      return(
                        <th key={index}>{key.toUpperCase()}</th>
                      )
                    }
                  }
                )
              }
              
              {
                update?<th>Cập nhật</th>:<></>
              }
              
              {
                del?<th>Xóa</th>:<></>
              }

              {
                detail?<th>Chi tiết</th>:<></>
              }
            </tr>
          </thead>
        </>
    )
  }

  const renderTableData = () => {
    return(
        <tbody>
          {
            data.map((data, index) => {
              return (
                  <tr key={data.id}>
                        
                    {
                      checkbox?
                        <td className={tableStyle.textcenter}>
                          <input value={data.id} type="checkbox" onChange={handleCheck} checked={checked.includes(data.id)}/>
                        </td> 
                      :
                      <></>
                    }
    
                    {
                      avatar?
                        <td className={tableStyle.textcenter}>
                          <img className={tableStyle.avatar} src="https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-1/323095559_1323500548471151_6901010600181680926_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=d17eIQxN50oAX-KoxWE&_nc_ht=scontent.fhan3-2.fna&oh=00_AfB0bB4kGSlcypXCOlSoDeOXk-6GM2Sdw9IZz02AvxO5kw&oe=6440CAA1" alt="Logo" /> 
                        </td> 
                      :
                      <></>
                    }
                    
                    

                    {
                      header.map((key, index)=>{
                        if(key != 'avatar'){
                          return(
                            <td key={index}>
                              {
                                data[key]
                              }
                            </td>
                          )
                        }
                      })
                    }
    
                    {
                      update?
                        <td className={tableStyle.textcenter}>
                          <button onClick={()=>handleUpdate(data.id)}><HiPencilSquare/></button>
                        </td>
                      :<></>
                    }
    
                    {
                      del?
                        <td className={tableStyle.textcenter}>
                          <button onClick={()=>handleDelete(data.id)}><RiDeleteBinFill/></button>
                        </td>
                      :<></>
                    }
    
                    {
                      detail?
                        <td className={tableStyle.textcenter}>
                          <Link to={`${detail}?id=${data.id}`} className="header-icon tick">
                            <FaInfoCircle/>
                          </Link>
                        </td>
                      :<></>
                    }
                  </tr>
              )
            })
          }
        </tbody>
    )
  };

  return (
    <>
      <table className="tableStyle.data">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
)
};

export default TableList;