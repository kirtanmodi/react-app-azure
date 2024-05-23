import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import PublicIcon from "@mui/icons-material/Public";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      <div className="d-flex flex-column flex-lg-row-fluid flex-shrink-1 p-10 order-2 order-lg-1">
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="text-center mb-11 d-flex align-items-center gap-5">
            <PublicIcon style={{ fontSize: 50 }} />
            <h1 className="text-gray-900 fw-light mb-3 fs-3hx">React-app</h1>
            {/* <div className="text-gray-500 fw-semibold fs-6">Rental Assets</div> */}
          </div>
          <div className="w-lg-500px p-10">
            <Outlet />
          </div>
        </div>

        <div className="d-flex flex-center flex-wrap px-5">
          <div className="d-flex fw-semibold text-primary fs-base">
            <a href="#" className="px-5" target="_blank">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover order-1 order-lg-2 bgi-position-center m-10 rounded"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${toAbsoluteUrl("media/misc/auth-bg.png")})`,
        }}
      >
        {/* begin::Content */}
        <div className="d-flex flex-column flex-center py-15 px-5 px-md-15 w-100">
          {/* begin::Logo */}
          {/* <Link to="/" className="mb-12">
            <img alt="Logo" src={toAbsoluteUrl("media/logos/custom-1.png")} className="h-75px" />
          </Link> */}
          {/* end::Logo */}

          {/* begin::Image */}
          {/* <img className="mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20" src={toAbsoluteUrl("media/misc/auth-screens.png")} alt="" /> */}
          {/* end::Image */}

          {/* begin::Title */}
          <h1 className="text-white fs-2qx fw-bolder text-center mb-7">React App with Azure AD</h1>
          {/* end::Title */}

          {/* begin::Text */}
          {/* <div className="text-white fs-base text-center">
            In this kind of post,{" "}
            <a href="#" className="opacity-75-hover text-warning fw-bold me-1">
              the blogger
            </a>
            introduces a person they’ve interviewed <br /> and provides some background information about
            <a href="#" className="opacity-75-hover text-warning fw-bold me-1">
              the interviewee
            </a>
            and their <br /> work following this is a transcript of the interview.
          </div> */}
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
    </div>
  );
};

export { AuthLayout };
