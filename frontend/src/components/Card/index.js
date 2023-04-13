import classes from "./Card.module.css";
const Card = () => {
  return (
    <div className={`${classes.wapperLogin} ${classes.sizeWrapper}`}>
      <div>
        <header className={classes.modalHeader}>Đăng Nhập</header>
        <div class="modal-body">
          <div class="modal-form"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
