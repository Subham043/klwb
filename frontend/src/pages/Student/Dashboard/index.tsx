import ViewsAuthorizeIcon from '@rsuite/icons/ViewsAuthorize';
import ViewsUnauthorizeIcon from '@rsuite/icons/ViewsUnauthorize';
import SiteIcon from '@rsuite/icons/Site';
import ModelIcon from '@rsuite/icons/Model';
import { useStudentDashboardQuery } from "../../../hooks/data/dashboard";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import DashboardCounter from "../../../components/DashboardCounter";
import { CounterCardProps } from "../../../components/DashboardCounter/CounterCard";
import DashboardMessage from "../../../components/Student/DashboardMessage";

export default function StudentDashboardPage() {
  const {data, isLoading, isFetching, isRefetching, refetch, error} = useStudentDashboardQuery()
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
      Icon: ModelIcon,
      title: 'Total Scholarship Amount',
      count: data?.total_scholarship_amount || 0,
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
        {(data) && <>
          <DashboardCounter data={counters} />
          <DashboardMessage is_scholarship_open={data.is_scholarship_open} is_eligible_to_apply={data.is_eligible_to_apply} can_resubmit={data.can_resubmit} message={data.message} />
        </>}
      </ErrorBoundaryLayout>
    </div>
  );
}
