import classes from "./Card.module.css";
import Input from "../Input";
const Card = (props) => {
  return (
    <div className={`${classes.wapperLogin} ${classes.sizeWrapper}`}>
      <div className={`${classes.container} ${classes.login}`}>
        <header className={classes.modalHeader}>{props.header}</header>
        <div className={classes.body}>
          <div className={classes.form}>
            <form method="post">{props.children}</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
