import styles from './styles.module.css';

type ContainerProps = {
	children: React.ReactNode;
};

export function Container({ children }: Readonly<ContainerProps>) {
	return (
		<section className={styles.container}>
			<div className={styles.content}>{children}</div>
		</section>
	);
}
