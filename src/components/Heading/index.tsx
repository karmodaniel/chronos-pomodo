import { History, Home, Settings, Sun } from 'lucide-react';
import { ButtonIcon } from '../ButtonIcon';
import styles from './styles.module.css';

interface HeadingProps {
	children: React.ReactNode;
}

export function Heading({ children }: Readonly<HeadingProps>) {
	return (
		<div className={styles.heading}>
			<div className={styles.headingActions}>
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
			</div>
			<div>{children}</div>
		</div>
	);
}
