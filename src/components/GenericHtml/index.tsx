import styles from './styles.module.css';

type GenericHtmlProps = {
	children: React.ReactNode;
};

export function GenericHtml({ children }: Readonly<GenericHtmlProps>) {
	return <div className={styles.genericHtml}>{children}</div>;
}
