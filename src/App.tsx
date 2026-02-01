import { PlayCircleIcon } from 'lucide-react';
import { ButtonIcon } from './components/ButtonIcon';
import { Container } from './components/Container';
import { CountDown } from './components/CountDown';
import { Cycles } from './components/Cycles';
import { DefaultInput } from './components/DefaultInput';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

import './styles/global.css';
import './styles/theme.css';
import { Footer } from './components/Footer';

export function App() {
	return (
		<>
			<Container>
				<Logo />
			</Container>

			<Container>
				<Menu />
			</Container>

			<Container>
				<CountDown />
			</Container>

			<Container>
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
			</Container>

			<Container>
				<Footer />
			</Container>
		</>
	);
}
