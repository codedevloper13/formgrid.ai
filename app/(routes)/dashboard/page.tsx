import React, { Suspense } from "react";
import StatsListWrap from "./_components/StatsListWrap";
import PrimarySeparator from "./_components/PrimarySeparator";
import CreateForm from "./_components/CreateForm";
import { Loader } from "lucide-react";
import FormList from "./_components/FormList";

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
              <CreateForm />
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
            {/* <div className="flex items-center justify-center text-muted-foreground">
              <p>No forms created yet.</p>
            </div> */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
              <Suspense
                fallback={[1, 2, 3, 4].map((item) => (
                  <Loader
                    size="3rem"
                    key={item}
                    className="animate-spin mx-auto"
                  />
                ))}
              >
                <FormList />
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
