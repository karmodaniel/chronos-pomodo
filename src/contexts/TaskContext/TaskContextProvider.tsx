import { useEffect, useReducer, useRef } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { TaskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../components/utils/loadBeep';

type TextContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({
	children,
}: Readonly<TextContextProviderProps>) {
	const [state, dispatch] = useReducer(TaskReducer, initialTaskState);
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
			console.log('Worker terminado por falta de activeTask');
			worker.terminate();
		}

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
