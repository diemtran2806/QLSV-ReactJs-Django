import React from "react";
import { useState } from "react";
import idstyle from "./ListTable.module.css";

const TableList = (props) => {
  const [datas, setDatas] = useState(props.data);
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [header,setHeader] = useState(Object.keys(datas[0]).map((key, index) => key))

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


  const renderTableData = () => {
    const header = Object.keys(datas[0])
    return datas.map((data, index) => {
      return (
        <tr key={data.id}>
          <td>
            <input value={data.id} type="checkbox" onChange={handleCheck} checked={checked.includes(data.id)}/>
          </td>
          {
            header.map((key, index)=>{
              return(
                <td>
                  {
                    data[key]
                  }
                </td>
              )
            })
          }
        </tr>
      )
    })
  };

  const renderTableHeader = () => {
    return (
        <>
          <th>
            <input type="checkbox" checked={datas.length === checked.length} onChange={handleCheckAll}/>
          </th>
          {
            header.map((key, index) => <th>{key.toUpperCase()}</th>)
          }
        </>
    )
  }

  
  return (
    <>
      <table>
        <tbody>
          {renderTableHeader()}
          {renderTableData()}
        </tbody>
      </table>
    </>
)
};

export default TableList;