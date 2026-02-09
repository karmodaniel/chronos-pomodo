import { formatSecondsToMinutes } from '../../components/utils/formatSecondsToMinutes';
import { getNextCycle } from '../../components/utils/getNextCycle';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function TaskReducer(
	state: TaskStateModel,
	action: TaskActionModel
): TaskStateModel {
	switch (action.type) {
		case TaskActionTypes.START_TASK: {
			const newTask = action.payload;
			const nextCycle = getNextCycle(state.currenteCycle);
			const secondsRemaining = newTask.duration * 60;
			console.log(secondsRemaining);

			return {
				...state,
				activeTask: newTask,
				currenteCycle: nextCycle,
				secondsRemaining,
				formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
				tasks: [...state.tasks, newTask],
			};
		}

		case TaskActionTypes.INTERRUPT_TASK: {
			return {
				...state,
				activeTask: null,
				secondsRemaining: 0,
				formattedSecondsRemaining: '00:00',
				tasks: state.tasks.map((task) => {
					if (state.activeTask?.id === task.id) {
						return { ...task, interruptDate: Date.now() };
					}

					return task;
				}),
			};
		}

		case TaskActionTypes.COMPLETE_TASK: {
			return {
				...state,
				activeTask: null,
				secondsRemaining: 0,
				formattedSecondsRemaining: '00:00',
				tasks: state.tasks.map((task) => {
					if (state.activeTask?.id === task.id) {
						return { ...task, completeDate: Date.now() };
					}

					return task;
				}),
			};
		}

		case TaskActionTypes.COUNT_DOWN: {
			return {
				...state,
				secondsRemaining: action.payload.secondsRemaining,
				formattedSecondsRemaining: formatSecondsToMinutes(
					action.payload.secondsRemaining
				),
			};
		}

		case TaskActionTypes.RESET_STATE: {
			return { ...initialTaskState };
		}

		case TaskActionTypes.CHANGE_SETTINGS: {
			return { ...state, config: { ...action.payload } };
		}
	}
}
