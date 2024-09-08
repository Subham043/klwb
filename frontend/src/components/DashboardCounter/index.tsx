import { Col, Row } from 'rsuite'
import CounterCard, { CounterCardProps } from './CounterCard';

type Props = {
	data: CounterCardProps[];
}

export default function DashboardCounter({ data }: Props) {
		return (
			<Row gutter={30}>
				{
					data.map((item, index) => (
						<Col xs={6} key={index}>
							<CounterCard {...item} />
						</Col>
					))
				}
		</Row>
		)
}
