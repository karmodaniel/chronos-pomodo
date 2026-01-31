import styles from './styles.module.css';

type ButtonIconProps = {
	children: React.ReactNode;
};

export function ButtonIcon({ children }: ButtonIconProps) {
	return <button className={styles.button}>{children}</button>;
}
