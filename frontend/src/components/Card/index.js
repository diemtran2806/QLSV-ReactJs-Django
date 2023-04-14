import classes from "./Card.module.css";
import Input from "../Input";
const Card = ({ onChange, onSubmit, form, errors }) => {
  return (
    <div className={`${classes.wapperLogin} ${classes.sizeWrapper}`}>
      <div className={`${classes.container} ${classes.login}`}>
        <header className={classes.modalHeader}>Đăng Nhập</header>
        <div className={classes.body}>
          <div className={classes.form}>
            <form method="post">
              <Input
                label="Tài khoản"
                type="text"
                name="username"
                id="username"
                placeholder="Nhập tên tài khoản"
                onChange={(event) => {
                  onChange({ name: "username", value: event.target.value });
                }}
                error={errors.username}
              />
              <Input
                label="Mật khẩu"
                type="password"
                name="password"
                id="password"
                placeholder="Nhập mật khẩu"
                onChange={(event) => {
                  onChange({ name: "password", value: event.target.value });
                }}
                error={errors.password}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
