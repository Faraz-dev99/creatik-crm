"use client"

import DashboardSectionOne from "./components/DashboardSectionOne";
import DonutChart from "./components/DonutChart";
import RadarChart from "./components/RadarChart";
import SmallGraph from "./components/SmallGraph";
import SmallScreenData from "./components/SmallScreenData";
import TableComponent from "./components/TableComponent";
import VisitorsChart from "./components/VisitorsChart";


export default function Dashboard() {
  return (
    <>
      <div className=" max-md:hidden">
        <div className="">
          <DashboardSectionOne />
        </div>
        <div className=" ">
          <div className="flex max-sm:flex-col max-lg:flex-row p-4  gap-4 ">
            <VisitorsChart />
            <SmallGraph />

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
          <TableComponent />
          <DonutChart />
          <RadarChart />

        </div>
      </div>
      <div className=" md:hidden">
        <SmallScreenData />
      </div>


    </>
  );
}
