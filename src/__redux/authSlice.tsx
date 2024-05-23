import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userName: string | null;
  email: string | null;
  apiToken: string | null;
  userRole: string | null;
}

const initialState: AuthState = {
  userName: null,
  email: null,
  apiToken: null,
  userRole: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action: PayloadAction<{ apiToken: string; userName: string; email: string; userRole: string }>) => {
      state.apiToken = action.payload.apiToken;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.userRole = action.payload.userRole;
    },

    logout: (state) => {
      state.apiToken = null;
      state.userName = null;
      state.email = null;
    },
  },
});

export const { saveAuth, logout } = authSlice.actions;

export default authSlice.reducer;

// const [incrementAmount, setIncrementAmount] = useState<string>("2");
// const count = useSelector((state: RootState) => state.counter.value);
// const dispatch = useDispatch<AppDispatch>();

// <h1>Counter: {count}</h1>
// <button onClick={() => dispatch(incremented())}>Increment</button>
// <button onClick={() => dispatch(decremented())}>Decrement</button>
