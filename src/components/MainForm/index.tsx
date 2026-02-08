import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { ButtonIcon } from '../ButtonIcon';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../utils/getNextCycle';
import { getNextCycleType } from '../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessages';

export function MainForm() {
	const { state, dispatch } = useTaskContext();
	const [taskName, setTaskName] = useState(() => {
		return state.tasks[state.tasks.length - 1]?.name || '';
	});

	const nextCycle = getNextCycle(state.currenteCycle);
	const nextCycleType = getNextCycleType(nextCycle);

	const handleCreateNewTask = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		showMessage.dismiss();

		const inputTaskName = taskName.trim();

		if (!inputTaskName) {
			alert('Digite o nome da tarefa!');
			return;
		}

		const newTask: TaskModel = {
			id: Date.now().toString(),
			name: taskName,
			startDate: Date.now(),
			completeDate: null,
			interruptDate: null,
			duration: state.config[nextCycleType],
			type: nextCycleType,
		};

		dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
		showMessage.success('Tarefa iniciada.');
	};

	const handleInterruptedTask = () => {
		showMessage.dismiss();

		showMessage.error('Tarefa interrompida!');
		dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
	};

	return (
		<form onSubmit={handleCreateNewTask} className="form" action="">
			<div className="formRow">
				<DefaultInput
					labelText="task"
					placeholder="Digite algo"
					id="meuInput"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					type="text"
					disabled={!!state.activeTask}
				/>
			</div>

			<div className="formRow">
				<Tips />
			</div>

			{state.currenteCycle > 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}

			<div className="formRow playButton">
				{state.activeTask ? (
					<ButtonIcon
						aria-label="Interromper nova tarefa"
						title="Interromper nova tarefa"
						size="medium"
						color="danger"
						type="button"
						onClick={handleInterruptedTask}
						key={'button'}
					>
						<StopCircleIcon />
					</ButtonIcon>
				) : (
					<ButtonIcon
						aria-label="Iniciar nova tarefa"
						title="Iniciar nova tarefa"
						size="medium"
						type="submit"
						key={'submit'}
					>
						<PlayCircleIcon />
					</ButtonIcon>
				)}
			</div>
		</form>
	);
}
