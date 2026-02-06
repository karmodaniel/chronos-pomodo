import { useEffect, useReducer } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { TaskReducer } from './taskReducer';

type TextContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({
	children,
}: Readonly<TextContextProviderProps>) {
	const [state, dispatch] = useReducer(TaskReducer, initialTaskState);

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
}
