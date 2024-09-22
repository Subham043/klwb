import ViewsAuthorizeIcon from "@rsuite/icons/ViewsAuthorize";
import ViewsUnauthorizeIcon from "@rsuite/icons/ViewsUnauthorize";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import SiteIcon from "@rsuite/icons/Site";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import { useGovtDashboardQuery } from "../../../../hooks/data/dashboard";
import { CounterCardProps } from "../../../DashboardCounter/CounterCard";
import DashboardCounter from "../../../DashboardCounter";

export default function GovtDashboardCounter() {
	const { data, isLoading, isFetching, isRefetching, refetch, error } =
			useGovtDashboardQuery();

			const counters: CounterCardProps[] = [
    {
      Icon: SiteIcon,
      title: 'Total Application',
      count: data?.total_application || 0,
      class_name: 'trend_box_red'
    },
    {
      Icon: ViewsAuthorizeIcon,
      title: 'Approved Application',
      count: data?.total_approved_application || 0,
      class_name: 'trend_box_green'
    },
    {
      Icon: ViewsUnauthorizeIcon,
      title: 'Rejected Application',
      count: data?.total_rejected_application || 0,
      class_name: 'trend_box_blue'
    },
    {
      Icon: CreditCardPlusIcon,
      title: 'Pending Application',
      count: data?.total_pending_application || 0,
      class_name: 'trend_box_purple'
    }
  ];
	return (
			<div>
					<ErrorBoundaryLayout
							loading={isRefetching || isLoading || isFetching}
							error={error}
							refetch={refetch}
					>
							{data && (
								<DashboardCounter data={counters} />
							)}
					</ErrorBoundaryLayout>
			</div>
	);
}
