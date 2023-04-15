import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.menu}>
        <div className={classes.wrapperButton}>
          <NavLink to="/" className={classes.text} end>
            Trang chủ
          </NavLink>
        </div>
        <div className={classes.wrapperButton}>
          <NavLink to="/faculty" className={classes.text}>
            Khoa
          </NavLink>
        </div>
        <div className={classes.wrapperButton}>
          <NavLink to="/class" className={classes.text}>
            Lớp Sinh Hoạt
          </NavLink>
        </div>
        <div className={classes.wrapperButton}>
          <NavLink to="/student" className={classes.text}>
            Sinh Viên
          </NavLink>
        </div>
        <div className={classes.wrapperButton}>
          <NavLink to="/lecture" className={classes.text}>
            Giảng Viên
          </NavLink>
        </div>
      </div>
      <div className="menu">
        <div className="wrapper-button">
          <div className={classes.wrapperButton}>
            <NavLink to="/login" className={classes.text}>
              Đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
    </div>

    // <header className={classes.header}>
    //   <nav>
    //     <ul className={classes.list}>
    //       <li>
    //         <NavLink
    //           to="/"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //           end
    //         >
    //           Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/events"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //         >
    //           Events
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/newsletter"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //         >
    //           Newsletter
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
}

export default MainNavigation;
