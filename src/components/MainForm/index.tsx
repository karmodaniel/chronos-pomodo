import { PlayCircleIcon } from 'lucide-react';
import { ButtonIcon } from '../ButtonIcon';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
	return (
		<form className="form" action="">
			<div className="formRow">
				<DefaultInput
					labelText="task"
					placeholder="Digite algo"
					id="meuInput"
					type="text"
				/>
			</div>

			<div className="formRow">
				<p>Lorem ipsum dolor sit amet.</p>
			</div>

			<div className="formRow">
				<Cycles />
			</div>

			<div className="formRow playButton">
				<ButtonIcon size="medium">
					<PlayCircleIcon />
				</ButtonIcon>
			</div>
		</form>
	);
}
