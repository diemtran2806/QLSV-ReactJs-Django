import style from "./BodyBox.module.css"
const BodyBox = ({ children }) => {
    return (
      <div className={style.container}>
        <div className={style.border}>
            <div className={style.body_content}>{children}</div>
        </div>
      </div>
    );
  };
  
  export default BodyBox;
