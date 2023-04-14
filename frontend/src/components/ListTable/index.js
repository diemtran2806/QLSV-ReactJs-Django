import React from "react";
import { useState } from "react";
import tableStyle from "./ListTable.module.css";

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
    return(
        datas.map((data, index) => {
          return (
              <tr key={data.id}>
                <td className={tableStyle.relative}>
                  <input className={tableStyle.center} value={data.id} type="checkbox" onChange={handleCheck} checked={checked.includes(data.id)}/>
                </td>
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
              </tr>
          )
        })
    )
  };

  const renderTableHeader = () => {
    return (
        <>
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={datas.length === checked.length} onChange={handleCheckAll}/>
              </th>
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
            </tr>
          </thead>
        </>
    )
  }

  return (
    <>
      <table className="tableStyle.data">
        {renderTableHeader()}
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </>
)
};

export default TableList;