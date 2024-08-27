import {
	Col,
	Panel,
	Row,
} from "rsuite";
import ViewsAuthorizeIcon from "@rsuite/icons/ViewsAuthorize";
import ViewsUnauthorizeIcon from "@rsuite/icons/ViewsUnauthorize";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import SiteIcon from "@rsuite/icons/Site";
import classes from "./index.module.css";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import { useIndustryDashboardQuery } from "../../../../hooks/data/dashboard";

export default function IndustryDashboardCounter() {
	const { data, isLoading, isFetching, isRefetching, refetch, error } =
			useIndustryDashboardQuery();

	return (
			<div>
					<ErrorBoundaryLayout
							loading={isRefetching || isLoading || isFetching}
							error={error}
							refetch={refetch}
					>
							{data && (
									<Row gutter={30}>
											<Col xs={6}>
													<Panel className={`${classes.trend_box_red}`}>
															<div className={classes.trend_box}>
																	<SiteIcon className={classes.chart_img} />
																	<div className={classes.info}>
																			<div className={classes.title}>Total Application</div>
																			<div className={classes.value}>
																					{data.total_application}
																			</div>
																	</div>
															</div>
													</Panel>
											</Col>
											<Col xs={6}>
													<Panel className={`${classes.trend_box_green}`}>
															<div className={classes.trend_box}>
																	<ViewsAuthorizeIcon className={classes.chart_img} />
																	<div className={classes.info}>
																			<div className={classes.title}>Approved Application</div>
																			<div className={classes.value}>
																					{data.total_approved_application}
																			</div>
																	</div>
															</div>
													</Panel>
											</Col>
											<Col xs={6}>
													<Panel className={`${classes.trend_box_blue}`}>
															<div className={classes.trend_box}>
																	<ViewsUnauthorizeIcon className={classes.chart_img} />
																	<div className={classes.info}>
																			<div className={classes.title}>Rejected Application</div>
																			<div className={classes.value}>
																					{data.total_rejected_application}
																			</div>
																	</div>
															</div>
													</Panel>
											</Col>
											<Col xs={6}>
													<Panel className={`${classes.trend_box_blue}`}>
															<div className={classes.trend_box}>
																	<CreditCardPlusIcon className={classes.chart_img} />
																	<div className={classes.info}>
																			<div className={classes.title}>Pending Application</div>
																			<div className={classes.value}>
																					{data.total_pending_application}
																			</div>
																	</div>
															</div>
													</Panel>
											</Col>
									</Row>
							)}
					</ErrorBoundaryLayout>
			</div>
	);
}
