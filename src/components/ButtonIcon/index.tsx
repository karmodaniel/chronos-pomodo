import styles from './styles.module.css';

type ButtonIconProps = {
	children: React.ReactNode;
	color?: 'success' | 'danger';
	size?: 'small' | 'medium';
} & React.ComponentProps<'button'>;

export function ButtonIcon({
	children,
	color = 'success',
	size = 'small',
	...props
}: Readonly<ButtonIconProps>) {
	return (
		<button
			className={`${styles.button} ${styles[color]} ${styles[size]}`}
			{...props}
		>
			{children}
		</button>
	);
}
