import PersonIcon from "@mui/icons-material/Person";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../__redux/authSlice";
import { AppDispatch, RootState } from "../../../../app/store";

const HeaderUserMenu: FC = () => {
  // const { currentUser, logout } = useAuth();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  let currentUserName = auth?.userName;
  if (currentUserName) {
    currentUserName = currentUserName.split(" [")[0];
  }
  const firstName = currentUserName?.split(" ")[0];
  const lastName = currentUserName?.split(" ")[1];
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <span className="symbol-label bg-light-primary align-items-end">
              <PersonIcon style={{ fontSize: 40 }} />
            </span>
          </div>

          <div
            className="d-flex flex-column"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div className="fw-bolder d-flex align-items-center fs-5">
              {firstName} {lastName}
              {/* <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span> */}
            </div>
            <div className="fw-bold text-muted fs-7">{auth?.email}</div>

            {/* user role */}
            <div className="d-flex fs-7 text-muted g-10 mt-2">
              <span className="fw-bolder">Role: {auth?.userRole}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      {/* <div className="menu-item px-5">
        <Link to={"/crafted/pages/profile"} className="menu-link px-5">
          My Profile
        </Link>
      </div> */}

      {/* <div className="menu-item px-5">
        <a href="#" className="menu-link px-5">
          <span className="menu-text">My Projects</span>
          <span className="menu-badge">
            <span className="badge badge-light-danger badge-circle fw-bolder fs-7">3</span>
          </span>
        </a>
      </div> */}

      {/* <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start" data-kt-menu-flip="bottom">
        <a href="#" className="menu-link px-5">
          <span className="menu-title">My Subscription</span>
          <span className="menu-arrow"></span>
        </a>

        <div className="menu-sub menu-sub-dropdown w-175px py-4">
          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Referrals
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Billing
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Payments
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link d-flex flex-stack px-5">
              Statements
              <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="View your statements"></i>
            </a>
          </div>

          <div className="separator my-2"></div>

          <div className="menu-item px-3">
            <div className="menu-content px-3">
              <label className="form-check form-switch form-check-custom form-check-solid">
                <input className="form-check-input w-30px h-20px" type="checkbox" value="1" defaultChecked={true} name="notifications" />
                <span className="form-check-label text-muted fs-7">Notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="menu-item px-5">
        <a href="#" className="menu-link px-5">
          My Statements
        </a>
      </div> */}

      {/* <div className="separator my-2"></div> */}

      {/* <Languages /> */}

      {/* <div className="menu-item px-5 my-1">
        <Link to="/crafted/account/settings" className="menu-link px-5">
          Account Settings
        </Link>
      </div> */}

      <div className="menu-item px-5">
        <a
          onClick={() => {
            dispatch(logout());
          }}
          className="menu-link px-5"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
