import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tableStyle from "./ListTable.module.css";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { Image } from "antd";

const TableList = (props) => {
  const [data, setData] = useState(props.data);
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [header, setHeader] = useState([]);
  const [update, setUpdate] = useState(typeof props.update === "function");

  const [del, setDel] = useState(props.del);
  const [checkbox, setCheckbox] = useState(props.checkbox);
  const [detail, setDetail] = useState(props.detail);
  const [avatar, setAvatar] = useState(false);
  const [notShow, setNotShow] = useState(["id", "avatar"]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (data[0]) {
      const header = Object.keys(data[0]).map((key, index) => key);
      setHeader(header);
    }
  }, [data]);

  useEffect(() => {
    const hasAvatar = data.some((item) => item.hasOwnProperty("avatar"));
    setAvatar(hasAvatar);
  }, [data]);

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
    props.update(id);
  };

  const renderTableHeader = () => {
    return (
      <>
        <thead>
          <tr>
            {checkbox ? (
              <th>
                <input
                  type="checkbox"
                  checked={data.length === checked.length}
                  onChange={handleCheckAll}
                />
              </th>
            ) : (
              <></>
            )}
            {avatar ? <th>ẢNH</th> : <></>}

            {header.map((key, index) => {
              if (!notShow.includes(key)) {
                return <th key={index}>{key.toUpperCase()}</th>;
              }
            })}

            {update ? <th>CẬP NHẬT</th> : <></>}

            {del ? <th>XÓA</th> : <></>}

            {detail ? <th>CHI TIẾT</th> : <></>}
            {/* })} */}

            {update ? <th>Cập nhật</th> : <></>}

            {del ? <th>Xóa</th> : <></>}

            {detail ? <th>Chi tiết</th> : <></>}
          </tr>
        </thead>
      </>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {data.map((data, index) => {
          return (
            <tr key={data.id}>
              {checkbox ? (
                <td className={tableStyle.textcenter}>
                  <input
                    value={data.id}
                    type="checkbox"
                    onChange={handleCheck}
                    checked={checked.includes(data.id)}
                  />
                </td>
              ) : (
                <></>
              )}

              {avatar ? (
                <td className={tableStyle.textcenter}>
                  <img
                    className={tableStyle.avatar}
                    src={
                      data.avatar ||
                      "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=blIOUfZoi4EAX-l182P&_nc_ht=scontent.fhan3-1.fna&oh=00_AfD-rSsRpHTWGNKgzAlsN1Djrz-oyfuo5KVY1Qng3C-LQw&oe=646FE778"
                    }
                    alt="Logo"
                  />
                </td>
              ) : (
                <></>
              )}

              {header.map((key, index) => {
                if (!notShow.includes(key)) {
                  return <td key={index}>{data[key]}</td>;
                }
              })}

              {update ? (
                <td className={tableStyle.textcenter}>
                  <button onClick={() => handleUpdate(data.id)}>
                    <HiPencilSquare />
                  </button>
                </td>
              ) : (
                <></>
              )}

              {del ? (
                <td className={tableStyle.textcenter}>
                  <button onClick={() => handleDelete(data.id)}>
                    <RiDeleteBinFill />
                  </button>
                </td>
              ) : (
                <></>
              )}

              {detail ? (
                <td className={tableStyle.textcenter}>
                  <Link
                    to={`${detail}?id=${data.id}`}
                    className="header-icon tick"
                  >
                    <FaInfoCircle />
                  </Link>
                </td>
              ) : (
                <></>
              )}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return data ? (
    <>
      <table className="tableStyle.data">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  ) : (
    <></>
  );
};

export default TableList;
