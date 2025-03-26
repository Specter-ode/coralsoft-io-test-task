import type { RootState } from '../../store/store';

export const getAuthState = (state: RootState) => state.auth;
export const getUser = (state: RootState) => state.auth.user;
export const getIsAuth = (state: RootState) => state.auth.isAuthenticated;
