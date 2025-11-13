"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuCalendar, LuChartNoAxesColumnIncreasing, LuCalendarRange } from "react-icons/lu";

// ✅ Interface for card data
interface DashboardCard {
  name: string;
  value: number;
  prefix?: string; // like "$"
  bg: string;
icon: React.ReactNode;
  footerlineColor: string;
}

export default function DashboardSectionOne() {
  // ✅ Dashboard data
  const dashboardSectionOneCardData: DashboardCard[] = [
    {
      name: "Total Customers",
      value: 302,
      prefix: "$",
      bg: "bg-gradient-to-r from-sky-500 to-sky-800",
      icon: <LuChartNoAxesColumnIncreasing />,
      footerlineColor: "from-sky-800 to-sky-500",
    },
    {
      name: "Converted Leads",
      value: 290,
      bg: "bg-gradient-to-r from-red-500 to-red-800",
      icon: <LuCalendarRange />,
      footerlineColor: "from-red-800 to-red-500",
    },
    {
      name: "Active FollowUps",
      value: 145,
      bg: "bg-gradient-to-r from-teal-500 to-teal-800",
      icon: <LuCalendar />,
      footerlineColor: "from-teal-800 to-teal-500",
    },
    {
      name: "Revenue Growth",
      value: 500,
      bg: "bg-gradient-to-r from-indigo-500 to-indigo-800",
      icon: <MdOutlineFileDownload />,
      footerlineColor: "from-indigo-800 to-indigo-500",
    },
  ];

  // ✅ Counter logic
  const [counts, setCounts] = useState<number[]>(
    dashboardSectionOneCardData.map(() => 0)
  );
  const countersRef = useRef<HTMLDivElement | null>(null);
  const [countersInView, setCountersInView] = useState<boolean>(false);

  // Observe section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCountersInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (countersRef.current) observer.observe(countersRef.current);
    return () => {
      if (countersRef.current) observer.unobserve(countersRef.current);
    };
  }, []);

  // Start count animation
  useEffect(() => {
    if (!countersInView) return;

    const intervals: number[] = [];

    dashboardSectionOneCardData.forEach((item, index) => {
      const increment = Math.ceil(item.value / 50);

      const intervalId = window.setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < item.value) {
            newCounts[index] = Math.min(
              newCounts[index] + increment,
              item.value
            );
          }
          return newCounts;
        });
      }, 30);

      intervals.push(intervalId);
    });

    return () => intervals.forEach((id) => clearInterval(id));
  }, [countersInView]);

  return (
    <div ref={countersRef} className="p-4 ">
      <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 my-5 w-full">
        {dashboardSectionOneCardData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl rounded-md overflow-hidden"
          >
            <div className="flex justify-between items-center mb-2 px-4 py-[10px]">
              <div>
                <h2
                  className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.footerlineColor}`}
                >
                  {item.prefix || ""}
                  {counts[index]}
                </h2>
                <p className="text-xs font-medium pt-[2px]">{item.name}</p>
              </div>
              <span className="text-[22px]">{item.icon}</span>
            </div>

            <div
              className={`p-3 text-white text-sm flex justify-between items-center bg-gradient-to-r ${item.footerlineColor}`}
            >
              <span>%</span>
              <span className="text-[17px]">
                <FaArrowTrendUp />
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
