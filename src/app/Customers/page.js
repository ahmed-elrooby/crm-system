import Activities from "./components/utils/Dashboard/Activities/Activities.jsx";
import Cards from "./components/utils/Dashboard/Cards/Cards.jsx";
import CustomerChart from "./components/utils/Dashboard/Chart1/Chart1.jsx";
import CustomerDistribution from "./components/utils/Dashboard/Chart2/Chart2.jsx";
import CustomerActivity from "./components/utils/Dashboard/CustomerActivity/CustomerActivity.jsx";
import FollowUpCustomers from "./components/utils/Dashboard/FollowUpCustomers/FollowUpCustomers.jsx";
import DashboardHeader from "./components/utils/Dashboard/Header/Header.jsx";
import QuickActions from "./components/utils/Dashboard/QuickActions/QuickActions.jsx";
import RecentCustomers from "./components/utils/Dashboard/RecentCustomers/RecentCustomers.jsx";
import TopCustomers from "./components/utils/Dashboard/TopCustomers/TopCustomers.jsx";

export default function Home() {
  return (
    <>
      <DashboardHeader />
      <Cards />
      <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-3">
        <CustomerChart />
        <CustomerDistribution />
      </div>
      <CustomerActivity />
      <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-3">
        <Activities />
        <FollowUpCustomers />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <TopCustomers />
        <RecentCustomers />
      </div>
      <QuickActions />
    </>
  );
}
