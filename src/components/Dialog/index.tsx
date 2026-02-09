import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { type ToastContentProps } from 'react-toastify';
import { ButtonIcon } from '../ButtonIcon';

import styles from './styles.module.css';

export function Dialog({
	closeToast,
	data,
}: Readonly<ToastContentProps<string>>) {
	return (
		<div className={styles.container}>
			<p>{data}</p>

			<div className={styles.buttonsContainer}>
				<ButtonIcon
					onClick={() => closeToast(true)}
					aria-label="Confirmar ação e fechar"
					title="Confirmar ação e fechar"
				>
					<ThumbsUpIcon />
				</ButtonIcon>
				<ButtonIcon
					onClick={() => closeToast(false)}
					color="danger"
					aria-label="Cancelar ação e fechar"
					title="Cancelar ação e fechar"
				>
					<ThumbsDownIcon />
				</ButtonIcon>
			</div>
		</div>
	);
}
