import { fetchFromStatts } from "@/actions/form.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartNoAxesCombined,
  ChartSpline,
  FileSpreadsheet,
  Loader,
  Reply,
} from "lucide-react";

const StatsCards = (props: {
  data: Awaited<ReturnType<typeof fetchFromStatts>>;
  loading: boolean;
}) => {
  const { data, loading } = props;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>
            <div className="flex items-center gap-2 text-primary">
              <FileSpreadsheet className="h-4 w-4" />
              <span className="text-black font-bold">Total Forms</span>
            </div>
          </CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="animate-spin h-[36px]" />
            ) : (
              data?.totalForms || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            All forms created on your account
          </div>
        </CardContent>
      </Card>
      {/* Responses */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>
            <div className="flex items-center gap-2 text-primary">
              <Reply className="h-4 w-4" />
              <span className="text-black font-bold">Total Response</span>
            </div>
          </CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="animate-spin h-[36px]" />
            ) : (
              data?.totalResponses || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            Responses to your forms
          </div>
        </CardContent>
      </Card>
      {/* Conversation Rate */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>
            <div className="flex items-center gap-2 text-primary">
              <ChartNoAxesCombined className="h-4 w-4" />
              <span className="text-black font-bold">Conversation Rate</span>
            </div>
          </CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="animate-spin h-[36px]" />
            ) : (
              (data?.convertionRate?.toFixed(2) || 0) + "%"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            Visits that lead to form submissions
          </div>
        </CardContent>
      </Card>
      {/* Engagement Rate */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>
            <div className="flex items-center gap-2 text-primary">
              <ChartSpline className="h-4 w-4" />
              <span className="text-black font-bold">Engagement Rate</span>
            </div>
          </CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="animate-spin h-[36px]" />
            ) : (
              (data?.engagementRate?.toFixed(2) || 0) + "%"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            Average time users spend on your forms
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default StatsCards;
