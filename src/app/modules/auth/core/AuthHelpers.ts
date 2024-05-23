/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from '../../../../__redux/authSlice'
import { pushNewAlert } from '../../../../__redux/generalSlice'
import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any, dispatch: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const { auth } = store.getState();
      if (auth && auth?.apiToken) {
        config.headers.Authorization = `Bearer ${auth?.apiToken}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )

  axios.interceptors.response.use(function (response: any) {
    return response;
  }, function (error: any) {
    let errorMessage = "",
      api = "";
    const errObject = error.response;
    const errRequest = errObject?.request;

    if (error?.response?.status === 404) {
      const newAlert = {
        id: new Date().getTime(),
        show: true,
        heading: "No Data Found",
        message: "",
        type: "warning",
        errMessage: "",
        errDescription: errObject?.data?.message
      };

      dispatch(pushNewAlert(newAlert));
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      error.response?.statusText === "Unauthorized" &&
      window.location.pathname !== "/auth/login"
    ) {
      const newAlert = {
        id: new Date().getTime(),
        show: true,
        heading: "Session Expired",
        message: "Your session has expired. Please login again.",
        type: "error",
        errMessage: "",
        errDescription: ""
      };

      dispatch(pushNewAlert(newAlert));
      dispatch(logout());
      return Promise.reject(error);
    }

    if (errRequest) {
      const endPoint = errRequest.responseURL?.split("api");

      if (errRequest.statusText) errorMessage += " " + errRequest.statusText;

      if (errRequest.status)
        errorMessage += "(Error Code:" + errRequest.status + ")";

      if (errObject.config.method)
        api +=
          errObject.config.method?.toUpperCase() +
          " api" +
          endPoint[1] +
          " failed";
      const newAlert = {
        show: true,
        heading: "Error",
        message: api,
        errMessage: errorMessage,
        errDescription: errObject?.data?.message,
        type: "error"
      };

      dispatch(pushNewAlert(newAlert));
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });

}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth }

