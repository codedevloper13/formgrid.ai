import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import StatsListWrap from "./_components/StatsListWrap";
import PrimarySeparator from "./_components/PrimarySeparator";

const Dashboard = () => {
  return (
    <div className="w-full pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* {FORM STATS} */}
          <section className="w-full">
            <div className="flex items-center justify-between gap-4 py-6">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Dashboard
              </h1>
              <Button variant="default" size="lg" className="gap-2">
                <PlusIcon className="h-5 w-5" />
                Create a form
              </Button>
            </div>
            <StatsListWrap />
          </section>
          <PrimarySeparator />
          {/* {FORMS LIST}  */}
          <section className="w-full pt-7 pb-10">
            <div className="w-full flex items-center justify-between mb-4">
              <h5 className="text-1xl  font-semibold tracking-tight uppercase">
                All Forms
              </h5>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
