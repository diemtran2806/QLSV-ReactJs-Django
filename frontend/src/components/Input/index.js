import classes from "./Input.module.css";
import { useState } from "react";

const Input = (props) => {
  const [focused, setFocused] = useState(false);
  const getBorderColor = () => {
    if (props.error) {
      return "red";
    }
    if (focused) {
      return "#ccc";
    } else {
      return "#ccc";
    }
  };
  return (
    <div className={classes.wrapperInput}>
      <label for={props.id} className={classes.label}>
        {props.label}
      </label>
      {/* <div className={classes.inputWrapper}> */}
      <input
        className={classes.input}
        style={{
          borderColor: getBorderColor(),
        }}
        type={props.type}
        required
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      {/* {props.icon && <div className={classes.icon}>{props.icon}</div>} */}
      {/* </div> */}
      {props.error && <div className={classes.error}>{props.error}</div>}
    </div>
  );
};

export default Input;
