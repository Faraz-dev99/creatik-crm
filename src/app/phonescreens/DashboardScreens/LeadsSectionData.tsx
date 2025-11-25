"use client"
import { useState } from "react";
import { number } from "framer-motion";
import { MdOutlineMenu } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import LeadsSection from "./LeadsSection";
export default function Page() {
     const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const leads = [
    {
      campaign: "Graduation",
      type: "B.COM",
      city: "jhunjhunu",
      name: "rajalakshmi",
      number:"1234567890"
    },
    {
      campaign: "Graduation",
      type: "B.COM",
      city: "jaipur",
      name: "n.amirudeen",
      number:"1234567890"
    }
  ];

  return (
    <>
     <header className="bg-table text-white text-shadow-2xs p-4 flex flex-row items-center justify-start">
      <span className="text-xl"><MdOutlineMenu/></span>
       <span className="ml-4 font-semibold text-xl">Make My Leads</span>
    </header>
    <div onClick={()=>setToggleSearchDropdown(!toggleSearchDropdown)} className="bg-table px-3 py-1.5 w-fit rounded-2xl my-4 ml-5 flex items-center">
        <button className="text-white text-xs font-semibold">ADVANCED SEARCH</button> 
     <button
                  type="button"

                  className="p-2 hover:bg-gray-200 rounded-md cursor-pointer text-white"
                >
                  {toggleSearchDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                
                </div>
                 <div className={`overflow-hidden ${toggleSearchDropdown ? "max-h-[2000px]" : "max-h-0"} transition-all duration-500 ease-in-out px-5`}>
    <div className="flex flex-row gap-2 mb-2 w-full">
        <label className="py-2 px-3 w-1/2 rounded-3xl border">Campaign</label> 
        <label className="py-2 px-3 w-1/2 rounded-3xl border">City</label>
    </div>
                 </div>
    <div className="px-4 pb-4  min-h-screen">
      {leads.map((lead, i) => (
        <LeadsSection
        key={i} 
       {...lead}

        />
      ))}
    </div>
    </>
  );
}
