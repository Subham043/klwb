import ViewsAuthorizeIcon from "@rsuite/icons/ViewsAuthorize";
import ViewsUnauthorizeIcon from "@rsuite/icons/ViewsUnauthorize";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import SiteIcon from "@rsuite/icons/Site";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import { useFinanceDashboardQuery } from "../../../../hooks/data/dashboard";
import { CounterCardProps } from "../../../DashboardCounter/CounterCard";
import DashboardCounter from "../../../DashboardCounter";

export default function FinanceDashboardCounter() {
	const { data, isLoading, isFetching, isRefetching, refetch, error } =
			useFinanceDashboardQuery();

			const counters: CounterCardProps[] = [
    {
      Icon: SiteIcon,
      title: 'Total Application',
      count: data?.total_application || 0,
      class_name: 'trend_box_red'
    },
    {
      Icon: ViewsAuthorizeIcon,
      title: 'Payment Approved Application',
      count: data?.total_approved_application || 0,
      class_name: 'trend_box_green'
    },
    {
      Icon: ViewsUnauthorizeIcon,
      title: 'Payment Failed Application',
      count: data?.total_rejected_application || 0,
      class_name: 'trend_box_blue'
    },
    {
      Icon: CreditCardPlusIcon,
      title: 'Payment Pending Application',
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
