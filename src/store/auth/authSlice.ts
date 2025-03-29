import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../../types/auth-types';

const initialState: IAuthState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'authentication',
	initialState: initialState,
	reducers: {
		loginStart(state) {
			state.loading = true;
			state.error = null;
		},
		loginSuccess(state, { payload }: PayloadAction<IUser>) {
			state.isAuthenticated = true;
			state.user = payload;
			state.loading = false;
			state.error = null;
		},
		loginFailure(state, { payload }) {
			state.loading = false;
			state.error = payload;
			state.user = null;
		},
		logout: () => ({ ...initialState }),
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
