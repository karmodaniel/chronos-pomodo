import { History, Home, Settings, Sun } from 'lucide-react';
import styles from './styles.module.css';
import { ButtonIcon } from '../ButtonIcon';

export function Menu() {
	return (
		<nav className={styles.menu}>
			<ButtonIcon>
				<Home />
			</ButtonIcon>
			<ButtonIcon>
				<History />
			</ButtonIcon>
			<ButtonIcon>
				<Settings />
			</ButtonIcon>
			<ButtonIcon>
				<Sun />
			</ButtonIcon>
		</nav>
	);
}
