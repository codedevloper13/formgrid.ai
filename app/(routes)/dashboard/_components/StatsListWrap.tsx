import { fetchFromStatts } from "@/actions/form.actions";
import StatsCards from "./StatsCards";

const StatsListWrap = async () => {
  const stats = await fetchFromStatts();
  return <StatsCards data={stats} loading={false} />;
};
export default StatsListWrap;
