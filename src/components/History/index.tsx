import { TrashIcon } from 'lucide-react';
import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../Container';
import { Heading } from '../Heading';
import styles from './styles.module.css';
import { ButtonIcon } from '../ButtonIcon';

export function History() {
	return (
		<MainTemplate>
			<Container>
				<Heading>
					<span>History</span>
					<span className={styles.buttonContainer}>
						<ButtonIcon
							color="danger"
							size="small"
							aria-label="Apagar todo o histórico"
							title="Apagar histórico"
						>
							<TrashIcon />
						</ButtonIcon>
					</span>
				</Heading>
			</Container>

			<Container>
				<div className={styles.responsiveTable}>
					<table>
						<thead>
							<tr>
								<th>Tarefa</th>
								<th>Duração</th>
								<th>Data</th>
								<th>Status</th>
								<th>Tipo</th>
							</tr>
						</thead>

						<tbody>
							{Array.from({ length: 20 }).map((_, index) => {
								return (
									<tr key={index}>
										<td>Estudar</td>
										<td>25min</td>
										<td>20/04/2025 08:00</td>
										<td>Completa</td>
										<td>Foco</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</Container>
		</MainTemplate>
	);
}
