import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Alert {
  id?: number;
  type: string;
  message: string;
  show: boolean;
  heading: string;
  errMessage: string;
  errDescription: string;
}

interface GeneralState {
  allAlerts: Alert[];
  errorMessage: string;
  openError: boolean;
  fullScreenLoader: boolean;
  confirmationConfig: {
    show: boolean;
    type: "error" | "success";
    actionConfirm?: () => void;
    cancelLabel: string;
    confirmLabel: string;
    message: string;
    title: string;
    actionAfterSuccess?: () => void;
  };
}

const initialState: GeneralState = {
  allAlerts: [],
  errorMessage: "",
  openError: false,
  fullScreenLoader: false,
  confirmationConfig: {
    show: false,
    type: "error",
    actionConfirm: undefined,
    cancelLabel: "Cancel",
    confirmLabel: "OK",
    message: "",
    title: "",
    actionAfterSuccess: undefined,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setFullScreenLoader: (state, action: PayloadAction<boolean>) => {
      state.fullScreenLoader = action.payload;
    },
    setOpenError: (state, action: PayloadAction<boolean>) => {
      state.openError = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setAllAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.allAlerts = action.payload;
    },
    pushNewAlert: (state, action: PayloadAction<Alert>) => {
      state.allAlerts.push({ ...action.payload, id: new Date().getTime() });
    },
    deleteAlert: (state, action: PayloadAction<number>) => {
      state.allAlerts = state.allAlerts.filter((alert) => alert.id !== action.payload);
    },
    setConfirmationConfig: (state, action: PayloadAction<GeneralState["confirmationConfig"] | undefined>) => {
      if (action.payload) {
        state.confirmationConfig = action.payload;
      } else {
        state.confirmationConfig = {
          ...state.confirmationConfig,
          show: false,
          actionConfirm: undefined,
          actionAfterSuccess: undefined,
        };
      }
    },
  },
});

export const { setFullScreenLoader, setOpenError, setErrorMessage, setAllAlerts, pushNewAlert, deleteAlert, setConfirmationConfig } =
  generalSlice.actions;

export default generalSlice.reducer;

// const [incrementAmount, setIncrementAmount] = useState<string>("2");
// const count = useSelector((state: RootState) => state.counter.value);
// const dispatch = useDispatch<AppDispatch>();

// <h1>Counter: {count}</h1>
// <button onClick={() => dispatch(incremented())}>Increment</button>
// <button onClick={() => dispatch(decremented())}>Decrement</button>

// generalActions.pushNewAlert({
// 	show: true,
// 	heading: "Success",
// 	message: "All the devices are successfully reloaded",
// 	type: "success",
// })
