import { KTIcon } from "../../../helpers";
import moment from "moment";

const getCurrentYear = () => {
  return moment().format("YYYY");
};

const SidebarFooter = () => {
  return (
    <div className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
      <div
        className="fs-4 fw-bolder text-gray-600 text-center"
        // href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL}
        // target="_blank"
        // className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        // className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        // data-bs-toggle="tooltip"
        // data-bs-trigger="hover"
        // data-bs-dismiss-="click"
        // title="Metronic Docs & Components"
      >
        {/* {import.meta.env.VITE_APP_NAME} {getCurrentYear()} */}
        {import.meta.env.VITE_APP_APP_VERSION}
        {/* <KTIcon iconName="document" className="btn-icon fs-2 m-0" /> */}
      </div>
    </div>
  );
};

export { SidebarFooter };
