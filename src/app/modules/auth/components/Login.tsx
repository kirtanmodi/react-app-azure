import { useMsal } from "@azure/msal-react";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../../../../__redux/authSlice";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { AppDispatch } from "../../../store";
import axios from "axios";
import { Role } from "../../../constants/constants";

export function Login() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    setLoading(true);
    const loginRequest = {
      scopes: [import.meta.env.VITE_APP_FUNC_EXPOSED_API],
    };

    instance
      .loginPopup(loginRequest)
      .then((response) => {
        if (response.accessToken) {
          console.log("Access Token: ", response.accessToken)
          const userRole = (response?.idTokenClaims as { roles: string[] })?.roles?.[0] ?? Role.Default;
          const userAccount = response?.account;
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.accessToken}`;
          dispatch(
            saveAuth({
              apiToken: response.accessToken,
              userName: userAccount?.name as string,
              email: userAccount?.username as string,
              userRole: userRole,
            })
          );
          navigate("/dashboard");
        } else {
          setError("No access token received");
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
        setError("Login failed: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        {/* begin::Heading */}
        {/* begin::Heading */}

        {/* begin::Login options */}
        {/* <div className="g-3 mb-9 d-flex align-items-end"> */}
        {/* <div className="col-md-12"> */}
        {/* <div className="outline-slate-50 border-4 place-content-center items-end"> */}
        {/* <img alt="Logo" src={toAbsoluteUrl("media/misc/azure.png")} className="h-40px me-3" /> */}
        {/* <span className="fs-2 text-gray-900">Sign in with Azure</span> */}
        {/* </div> */}
        {/* </div> */}

        {/* <div className="col-md-6">
          <a href="#" className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
            <img alt="Logo" src={toAbsoluteUrl("media/svg/brand-logos/apple-black.svg")} className="theme-light-show h-15px me-3" />
            <img alt="Logo" src={toAbsoluteUrl("media/svg/brand-logos/apple-black-dark.svg")} className="theme-dark-show h-15px me-3" />
            Sign in with Apple
          </a>
        </div> */}
        {/* </div> */}
        {/* end::Login options */}

        {/* begin::Separator */}
        {/* <div className="separator separator-content my-14">
        <span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
      </div> */}
        {/* end::Separator */}

        {/* {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : (
        <div className="mb-10 bg-light-info p-8 rounded">
          <div className="text-info">
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to continue.
          </div>
        </div>
      )} */}

        {/* <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div> */}

        {/* begin::Form group */}
        {/* <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">Password</label>
        <input
          type="password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div> */}

        {/* begin::Wrapper */}
        {/* <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        <Link to="/auth/forgot-password" className="link-primary">
          Forgot Password ?
        </Link>
      </div> */}
        {/* end::Wrapper */}

        {/* begin::Action */}

        <div className="d-grid mb-10">
          <button
            onClick={handleLogin}
            id="kt_sign_in_submit"
            className="btn btn-lg text-nowrap"
            style={{
              backgroundColor: "#0078D4",
              color: "white",
              borderColor: "#0078D4",
              boxShadow: "0 0 0 0.25rem #0078D4",
            }}
            // disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && (
              <>
                <img alt="Logo" src={toAbsoluteUrl("media/misc/azure.png")} className="h-40px me-3" />
                <span className="indicator-label me-5fs-2">Login with Azure</span>
              </>
            )}
            {loading && (
              <>
                <span className="indicator-progress" style={{ display: "inline-block", marginRight: "0.5rem" }}>
                  <span className="spinner-border spinner-border-sm align-middle"></span>
                </span>
                Please wait...
              </>
            )}
          </button>
        </div>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* end::Action */}

        {/* <div className="text-gray-500 text-center fw-semibold fs-6">
        Not a Member yet?{" "}
        <Link to="/auth/registration" className="link-primary">
          Sign up
        </Link>
      </div> */}
      </div>
    </>
  );
}
