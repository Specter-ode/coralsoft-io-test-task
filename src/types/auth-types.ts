export interface IUser {
	email: string;
	name: string;
	id: number | null;
	role: string;
}

export interface IAuthState {
	isAuthenticated: boolean;
	user: IUser | null;
	loading: boolean;
	error: string | null;
}
