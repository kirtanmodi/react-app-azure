import { FC } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

const Error401: FC = () => {
  return (
    <>
      {/* begin::Title */}
      <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">401 Error, Unauthorized</h1>
      {/* end::Title */}

      {/* begin::Text */}
      <div className="fw-semibold fs-6 text-gray-500 mb-7">Sorry, you are not authorized to access this page.</div>
      {/* end::Text */}

      {/* begin::Illustration */}
      <div className="mb-3">
        <img src={toAbsoluteUrl("media/auth/pattern-1.jpg")} className="mw-100 mh-300px theme-light-show" alt="" />
        <img src={toAbsoluteUrl("media/auth/pattern-1.jpg")} className="mw-100 mh-300px theme-dark-show" alt="" />
      </div>
      {/* end::Illustration */}

      {/* begin::Link */}
      <div className="mb-0">
        <Link to="/dashboard" className="btn btn-sm btn-primary">
          Return Home
        </Link>
      </div>
      {/* end::Link */}
    </>
  );
};

export { Error401 };
