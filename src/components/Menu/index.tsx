import { History, Home, Moon, Settings, Sun } from 'lucide-react';
import styles from './styles.module.css';
import { ButtonIcon } from '../ButtonIcon';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
	const [theme, setTheme] = useState<AvailableThemes>(() => {
		const localStorageTheme = localStorage.getItem('theme') as AvailableThemes;

		return localStorageTheme || 'dark';
	});

	const themeIcons = {
		dark: <Sun />,
		light: <Moon />,
	};

	const handleThemeChange = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setTheme((prevTheme) => {
			const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
			localStorage.setItem('theme', nextTheme);
			return nextTheme;
		});
	};

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<nav className={styles.menu}>
			<RouterLink href="/">
				<ButtonIcon title="Ir para Home" aria-label="Ir para Home">
					<Home />
				</ButtonIcon>
			</RouterLink>
			<RouterLink href="/history">
				<ButtonIcon title="Histórico" aria-label="Histórico">
					<History />
				</ButtonIcon>
			</RouterLink>
			<RouterLink href="/settings">
				<ButtonIcon title="Configurações" aria-label="Configurações">
					<Settings />
				</ButtonIcon>
			</RouterLink>
			<ButtonIcon
				onClick={handleThemeChange}
				title="Mudar Tema"
				aria-label="Mudar Tema"
			>
				{themeIcons[theme]}
			</ButtonIcon>
		</nav>
	);
}
