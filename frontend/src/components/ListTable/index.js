import React from "react";
import { useState } from "react";
import tableStyle from "./ListTable.module.css";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

const TableList = (props) => {
  const [datas, setDatas] = useState(props.data);
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [header,setHeader] = useState(Object.keys(datas[0]).map((key, index) => key));
  const [update, setUpdate] = useState(props.update);
  const [del, setDel] = useState(props.del);
  const [checkbox,setCheckbox] = useState(props.checkbox)
  const [detail,setDetail] = useState(props.detail)


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
      const allCheckboxValues = datas.map((data) => data.id);
      setChecked(allCheckboxValues);
    } else {
      setChecked([]);
    }
  };

  const handleDelete = (id) => {
    console.log("del:", id);
  };

  const handleUpdate = (id) => {
    console.log("update", id);
  };
  
  const handleDetail = (id) => {
    console.log("detail:", id);
  };

  const renderTableHeader = () => {
    return (
        <>
          <thead>
            <tr>
              {
                checkbox?
                  <th>
                    <input type="checkbox" checked={datas.length === checked.length} onChange={handleCheckAll}/>
                  </th>
                :
                  <></>
              }
              
              {
                header.map((key, index) => {
                    if(key !== 'id'){
                      return(
                        <th>{key.toUpperCase()}</th>
                      )
                    }
                  }
                )
              }
              
              {
                update?<th>Cập nhật</th>:<></>
              }
              
              {
                update?<th>Xóa</th>:<></>
              }

              {
                detail?<th>Xóa</th>:<></>
              }
            </tr>
          </thead>
        </>
    )
  }

  const renderTableData = () => {
    return(
        datas.map((data, index) => {
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
                  header.map((key, index)=>{
                    if(key !== 'id'){
                      return(
                        <td>
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
                      <button onClick={()=>handleDetail(data.id)}><FaInfoCircle/></button>
                    </td>
                  :<></>
                }
              </tr>
          )
        })
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