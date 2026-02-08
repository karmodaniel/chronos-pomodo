import { useEffect, useReducer, useRef } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { TaskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../components/utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';

type TextContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({
	children,
}: Readonly<TextContextProviderProps>) {
	const [state, dispatch] = useReducer(TaskReducer, initialTaskState, () => {
		const storageState = localStorage.getItem('state');

		if (storageState === null) return initialTaskState;

		const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

		return {
			...parsedStorageState,
			activeTask: null,
			secondsRemaining: 0,
			formattedSecondsRemaining: '00:00',
		};
	});

	const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
	const worker = TimerWorkerManager.getInstance();

	worker.onmessage((e) => {
		const countDownSeconds = e.data;
		console.log(countDownSeconds);

		if (countDownSeconds <= 0) {
			if (playBeepRef.current) {
				playBeepRef.current();
				playBeepRef.current = null;
			}
			dispatch({
				type: TaskActionTypes.COMPLETE_TASK,
			});
			worker.terminate();
		} else {
			dispatch({
				type: TaskActionTypes.COUNT_DOWN,
				payload: { secondsRemaining: countDownSeconds },
			});
		}
	});

	useEffect(() => {
		if (!state.activeTask) {
			worker.terminate();
		}

		localStorage.setItem('state', JSON.stringify(state));

		document.title = `${state.formattedSecondsRemaining} - Chronos pomodoro`;

		worker.postMessage(state);
	}, [worker, state]);

	useEffect(() => {
		if (state.activeTask && playBeepRef.current === null) {
			playBeepRef.current = loadBeep();
		} else {
			playBeepRef.current = null;
		}
	}, [state.activeTask]);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
}
