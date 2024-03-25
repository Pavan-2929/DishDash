import React from "react";
import SectionHeaders from "./SectionHeaders";

const HomeMenu = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex-none">
          <img src={"/sallad1.png"} alt="Salad 1" className="w-auto h-auto" />
        </div>
        <div className="text-center">
          <SectionHeaders subHeader={"Check Out"} mainHeader={"Our Menu"} />
        </div>
        <div className="flex-none">
          <img src={"/sallad2.png"} alt="Salad 2" className="w-auto h-auto" />
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
