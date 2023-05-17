import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdPassword } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../store/authSlice";
import { logoutUser } from "../../store/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";

function MainNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let id_role = 1;
  const user = useSelector((state) => state.auth.login.currentUser);
  const userAfterUpdate = useSelector((state) => state.user.userUpdate);
  const accessToken = user?.accessToken;
  const hasUserUpdated = localStorage.getItem("logined");
  console.log("hasUserUpdate:", hasUserUpdated);
  if (user !== null) {
    id_role = user?.user.id_role;
  }
  console.log(accessToken);
  console.log("MainNav user:", id_role);

  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  const handleLogout = () => {
    logoutUser(dispatch, navigate, accessToken, axiosJWT);
    localStorage.setItem("logined", "false");
    navigate("/");
  };

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
        {user === null && id_role !== 3 ? (
          <></>
        ) : (
          id_role === 3 && (
            <div className={classes.wrapperButton}>
              <NavLink to="/admin" className={classes.text}>
                Admin
              </NavLink>
            </div>
          )
        )}
      </div>
      <div className={classes.menu}>
        {user ? (
          <div className={classes.avata}>
            <img
              src={
                hasUserUpdated === "true"
                  ? userAfterUpdate.avatar
                  : user.user.avatar
              }
              alt="avata"
            />
            <div className={classes.nameUser}>
              {hasUserUpdated === "true"
                ? userAfterUpdate.name
                : user.user.name}
            </div>
            <ul className={classes.userMenu}>
              <li className={classes.userItem}>
                <div className={classes.wrapperUserItem}>
                  {/* <i class="icon-item fa-solid fa-user"></i> */}
                  <div className={classes.iconItem}>
                    <ImProfile />
                  </div>
                  <NavLink to="/myProfile">Trang Cá Nhân</NavLink>
                </div>
              </li>
              <li className={classes.userItem}>
                <div className={classes.wrapperUserItem}>
                  <div className={classes.iconItem}>
                    <MdPassword />
                  </div>
                  <NavLink to="/changePassword">Đổi Mật Khẩu</NavLink>
                </div>
              </li>
              <li className={classes.userItem}>
                <div className={classes.wrapperUserItem}>
                  <div className={classes.iconItem}>
                    <AiOutlineLogout />
                  </div>
                  <a onClick={handleLogout}>Đăng Xuất</a>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div className={classes.wrapperButton}>
            <NavLink to="/login" className={classes.text}>
              Đăng nhập
            </NavLink>
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
