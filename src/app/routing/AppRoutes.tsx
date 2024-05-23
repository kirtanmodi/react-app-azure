/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import AllAlerts from "../components/alert/AllAlerts";
import ErrorComponent from "../components/errorComp/ErrorComponent";
import FullScreenLoader from "../components/loader/FullScreenLoader";
import { AuthPage, Logout } from "../modules/auth";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { RootState } from "../store";
import { PrivateRoutes } from "./PrivateRoutes";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
// const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  // const { currentUser } = useAuth();

  const fullScreenLoader = useSelector((state: RootState) => state.general.fullScreenLoader);
  const auth = useSelector((state: RootState) => state.auth);
  // const dispatch = useDispatch<AppDispatch>();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {auth?.apiToken ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
      <AllAlerts />
      <ErrorComponent />
      <FullScreenLoader isLoading={fullScreenLoader} />
    </BrowserRouter>
  );
};

export { AppRoutes };
