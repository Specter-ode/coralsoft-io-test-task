import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { authActions } from '../store/auth/authSlice';
import { useAppDispatch } from '../store/store';

const rootActions = {
	...authActions,
};

export const useActions = () => {
	const dispatch = useAppDispatch();
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
