import { useEffect, useReducer } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { TaskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

type TextContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({
	children,
}: Readonly<TextContextProviderProps>) {
	const [state, dispatch] = useReducer(TaskReducer, initialTaskState);
	const worker = TimerWorkerManager.getInstance();

	worker.onmessage((e) => {
		const countDownSeconds = e.data;
		console.log(countDownSeconds);

		if (countDownSeconds <= 0) {
			console.log('Worker completed');
			worker.terminate();
		}
	});

	useEffect(() => {
		if (!state.activeTask) {
			console.log('Worker terminado por falta de activeTask');
			worker.terminate();
		}

		worker.postMessage(state);
	}, [worker, state]);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
}
