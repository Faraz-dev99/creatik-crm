"use client";

import { BrickWallFire, Podcast, School, Cable,ShieldUser,NotebookTabs } from "lucide-react";
import ImageSlider from "./ImageSlider";
import Link from "next/link";
const SmallScreenData = () => {


  const boxeButtons = [
    {
      pTag: "Campigns",
      icon: <BrickWallFire />,
      color: "bg-red-500/50",
      url:"/masters/campaign"
    
    },
    {
      pTag: "Customer",
      icon: <Podcast />,
      color: "bg-purple-500/50",
      url:"/customer"
     
    },
       {
        pTag:"Followups",
        icon:<School/>,
        color:"bg-teal-500/50",
        url:"/followups/customer"

    }, {
        pTag:"Contact",
        icon: <Cable/>,
        color:"bg-green-500/50",
        url:"/contact"
       
    },
       {
        pTag:"Task",
        icon:<ShieldUser/>,
        color:"bg-blue-500/50",
        url:"/task"
       
    }, {
        pTag:"Status Type",
        icon: <NotebookTabs/>,
        color:"bg-gray-500/50",
        url:"/masters/status-type"
    },
  ];

 
  return (
    <>
    <></>
    <ImageSlider/>
    <div className=" flex flex-col mb-4">
        
      <div className="px-4">
    
        {/* ✅ Button Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4 w-full ">
          {boxeButtons.map((data, index) => (
            <Link
              key={index}
              href={data?.url??""}
             
              className="rounded-sm bg-cover bg-center bg-no-repeat min-h-[152px] bg-[url(https://i.rtings.com/assets/pages/OICDg5Ss/best-video-editing-laptops-20241015-medium.jpg?format=auto)]"
            >
              <div
                className={`${data.color} py-9 px-4 rounded-md flex flex-col h-full items-center justify-center`}
              >
                <div className="text-white text-4xl">{data.icon}</div>
                <p className="text-white mt-2 text-center">{data.pTag}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default SmallScreenData;
