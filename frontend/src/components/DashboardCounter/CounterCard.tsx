import { Panel } from 'rsuite'
import classes from './index.module.css'
import { IconProps } from '@rsuite/icons/lib/Icon'
import { FC } from 'react'

export type CounterCardProps = {
	Icon: FC<IconProps>;
	title: string;
	count: number;
	class_name: 'trend_box_red' | 'trend_box_green' | 'trend_box_blue' | 'trend_box_purple';
}

export default function CounterCard({ Icon, title, count, class_name }: CounterCardProps) {
		return (
			<Panel className={classes[`${class_name}`]}>
					<div className={classes.trend_box}>
							<Icon className={classes.chart_img} />
							<div className={classes.info}>
									<div className={classes.title}>{title}</div>
									<div className={classes.value}>{count}</div>
							</div>
					</div>
			</Panel>
		)
}
