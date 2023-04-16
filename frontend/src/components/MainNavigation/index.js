import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";

function MainNavigation() {
  const user = true;
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
      <div className={classes.menu}>
        {user ? (
          <div className={classes.wrapperButton}>
            <NavLink to="/login" className={classes.text}>
              Đăng nhập
            </NavLink>
          </div>
        ) : (
          <div className={classes.avata}>
            <img src={defaultAvatar} alt="avata" />
            <div className={classes.nameUser}>Diem Tran</div>
            <ul className={classes.userMenu}>
              <li className={classes.userItem}>
                <div className={classes.wrapperUserItem}>
                  {/* <i class="icon-item fa-solid fa-user"></i> */}
                  <NavLink to="/myProfile">Trang Cá Nhân</NavLink>
                </div>
              </li>
              <li className={classes.userItem}>
                <div className={classes.wrapperUserItem}>
                  {/* <i class="icon-item fa-solid fa-lock"></i> */}
                  <a>Đổi Mật Khẩu</a>
                </div>
              </li>
              <li className={classes.userItem}>
                <div className={classes.wrapperUserItem}>
                  {/* <i class="icon-item fa-solid fa-right-from-bracket"></i> */}
                  <a>Đăng Xuất</a>
                </div>
              </li>
            </ul>
          </div>
        )}
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
