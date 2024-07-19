import React from "react";

const Hourly = () => {
  const weather = [
    { name: "Now", deg: "25" },
    { name: "2 Am", deg: "25" },
    { name: "3 Am", deg: "25" },
    { name: "4 Am", deg: "25" },
    { name: "wed", deg: "25" },
  ];

  const weather1 = [
    { name: "5 Am", deg: "25" },
    { name: "6 Am", deg: "25" },
    { name: "7 Am", deg: "25" },
    { name: "8 Am", deg: "25" },
    { name: "9 Am", deg: "25" },
  ];

  return (
    <div className="flex flex-col items-start text-black p-0 ">
      <div className="w-80 md:mr-20 mb-10  rounded-2xl border-[#FFA38F] flex flex-col justify-center items-center text-center p-3 backdrop-opacity-85 backdrop-invert bg-white/20 ">
        <div className="flex  space-x-5">
          {weather.map((item, index) => (
            <div key={index} className="flex flex-col items-center ">
              <span className="text-sm text-white">{item.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8 fill-current  text-white"
              >
                <path d="M382.76,432H136c-30.732,0-61.371-12.725-84.061-34.912-23.221-22.707-36.009-52.35-36.009-83.469A109.4,109.4,0,0,1,49.136,235.2a122.281,122.281,0,0,1,62.794-32.707V200c0-79.4,64.6-144,144-144s144,64.6,144,144v1.453c55.716,7.939,96,53.729,96,112.166,0,31.27-11.375,60.72-32.031,82.927A109.747,109.747,0,0,1,382.76,432ZM255.93,88a112.127,112.127,0,0,0-112,112v31.405l-14.864,1.059c-45.5,3.239-81.136,38.887-81.136,81.155C47.93,359.635,89.084,400,136,400H382.76c45.515,0,81.17-37.943,81.17-86.381,0-46.566-33.731-80.791-80.2-81.379l-15.8-.2V200A112.127,112.127,0,0,0,255.93,88Z"></path>
              </svg>
              <span class=" text-white">{item.deg}°</span>
            </div>
          ))}
        </div>
        <div className="border border-white my-4 w-72"></div>
        <div className="flex  space-x-5">
          {weather1.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className=" text-white">{item.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8 fill-current  text-white"
              >
                <path d="M382.76,432H136c-30.732,0-61.371-12.725-84.061-34.912-23.221-22.707-36.009-52.35-36.009-83.469A109.4,109.4,0,0,1,49.136,235.2a122.281,122.281,0,0,1,62.794-32.707V200c0-79.4,64.6-144,144-144s144,64.6,144,144v1.453c55.716,7.939,96,53.729,96,112.166,0,31.27-11.375,60.72-32.031,82.927A109.747,109.747,0,0,1,382.76,432ZM255.93,88a112.127,112.127,0,0,0-112,112v31.405l-14.864,1.059c-45.5,3.239-81.136,38.887-81.136,81.155C47.93,359.635,89.084,400,136,400H382.76c45.515,0,81.17-37.943,81.17-86.381,0-46.566-33.731-80.791-80.2-81.379l-15.8-.2V200A112.127,112.127,0,0,0,255.93,88Z"></path>
              </svg>
              <span class=" text-white">{item.deg}°</span>
            </div>
          ))}
        </div>
      </div>
      <div class="w-80">
        <h1 class="font-bold text-2xl">Randum text</h1>
        <p>
          text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived
          not only five centuries.
        </p>
      </div>
    </div>
  );
};

export default Hourly;
