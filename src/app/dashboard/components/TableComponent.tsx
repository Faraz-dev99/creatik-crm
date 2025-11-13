import React from "react";
const headerData = [
  {
    img: "",
    CountryLable: "countery",
    SalesLable: "Sales",
    AverageLable: "Average",
  },
];
const countryData = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png",
    countryName: "Germany",
    salesName: "988",
    avgValue: "21.1%",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png",
    countryName: "USA",
    salesName: "123",
    avgValue: "34.2%",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/2560px-Flag_of_Australia.svg.png",
    countryName: "Australia",
    salesName: "456",
    avgValue: "12.45%",
  },
  {
    img: "https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740&q=80",
    countryName: "United Kingdom",
    salesName: "689",
    avgValue: "8.65%",
  },
];
function TableComponent() {
  return (
    <div
      className="w-full bg-white shadow-lg max-w-[400px] 
   p-2 sm:p-4"
    >
      <h2 className="text-sm sm:text-base text-neutral-400">
        Global Sales by Top Locations
      </h2>

      <div className="font-semibold text-xs sm:text-sm grid grid-cols-4 pb-2 mt-4">
        <div>*</div>
        <div>countery</div>
        <div>Sales</div>
        <div>Average</div>
      </div>

      <div>
        {countryData.map((data, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-4 items-center py-2 text-xs sm:text-sm"
            >
              <span>
                <img width={16} height={16} src={data.img} alt="" />
              </span>
              <span className="truncate">{data.countryName}</span>
              <span>{data.salesName}</span>
              <span>{data.avgValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TableComponent;
