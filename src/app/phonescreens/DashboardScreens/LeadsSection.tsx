"use client";

import { MdPhone, MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";

interface leadsinterface{
  campaign : string;
  type : string;
  city : string;
  name : string;
  number : string;
}

export default function LeadsSection({ campaign, type, city, name, number }:leadsinterface) {
  return (
    <>
   
    <div className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 mb-5">
     <div className="bg-table h-2"></div>
      {/* Top Section */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            {/* Campaign */}
            <div className="flex items-center mb-2">
              <span className="font-semibold text-black text-lg">Campaign</span>
              <span className="mx-2">-</span>
              <span className="text-gray-700 text-lg">{campaign}</span>
            </div>

            {/* Type */}
            <div className="flex items-center mb-2">
              <span className="font-semibold text-black text-lg">Type</span>
              <span className="mx-2">-</span>
              <span className="text-gray-700 text-lg">{type}</span>
            </div>

            {/* City */}
            <div className="flex items-center mb-2">
              <span className="font-semibold text-black text-lg">City</span>
              <span className="mx-2">-</span>
              <span className="text-gray-700 text-lg">{city}</span>
            </div>

            {/* Name */}
            <div className="flex items-center">
              <span className="font-semibold text-black text-lg">Name</span>
              <span className="mx-2">-</span>
              <span className="text-gray-700 text-lg">{name}</span>
            </div>
              {/* Number */}
            <div className="flex items-center">
              <span className="font-semibold text-black text-lg">Number</span>
              <span className="mx-2">-</span>
              <span className="text-gray-700 text-lg">{number}</span>
            </div>
         
          </div>
         

          {/* Heart Icon */}
          <div className="p-2 bg-gray-100 rounded-full shadow">
            <AiOutlineHeart size={20} className="text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full bg-table p-3 flex items-center justify-between rounded-b-xl">

        <button className="text-white border border-white px-3 text-sm py-1 rounded-full font-semibold">
          FOLLOW UP
        </button>

        <div className="flex items-center gap-5">
          {/* Call */}
          <MdPhone size={20} className="text-white" />

          {/* Message Icon */}
          <MdEmail size={20} className="text-white" />

          {/* WhatsApp */}
          <FaWhatsapp size={20} className="text-white" />

          {/* Add */}
          {/* <IoIosAddCircle size={30} className="text-white" /> */}
        </div>
      </div>
    </div></>
  );
}
