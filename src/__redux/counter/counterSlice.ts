// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 0,
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		incremented: state => {
			state.value += 1
		},
		decremented: state => {
			state.value -= 1
		},
		incrementedByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		}
	}
});

export const { incremented, decremented, incrementedByAmount } = counterSlice.actions;
export default counterSlice.reducer;


// const [incrementAmount, setIncrementAmount] = useState<string>("2");
// const count = useSelector((state: RootState) => state.counter.value);
// const dispatch = useDispatch<AppDispatch>();

// <h1>Counter: {count}</h1>
// <button onClick={() => dispatch(incremented())}>Increment</button>
// <button onClick={() => dispatch(decremented())}>Decrement</button>