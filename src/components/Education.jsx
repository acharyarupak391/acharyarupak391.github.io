import React from "react";

function Education() {
  return (
    <section
      id="education"
      className="mx-[30px] md:mx-[70px] lg:mx-[290px] mt-[60px] pt-10 lg:mt-[160px]"
    >
      <div className="flex items-center gap-4">
        {" "}
        <h1 className="text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          04. Education
        </h1>
        <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
      </div>{" "}
      <div className="lg:mt-[92px] md:mt-[66px] mt-10 mx-auto ">
        {/* Degree */}
        <div className="md:w-[532px] w-[340px] md:h-[230px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14 ">
          <p className="pt-[32px] font-bold text-[14px] md:text-[16px]  text-bluePrimary">
            BACHELOR OF TECHNOLOGY (B. TECH)
          </p>
          <p className="font-inter mt-4 font-semibold">
            MALLA REDDY COLLEGE OF ENGINEERING AND TECHNOLOGY
          </p>
          <p className="md:w-[420px] mt-4">
            Graduated with a bachelor's degree in Computer Science &
            Engineering.
          </p>
          <p className="font-inter float-right mt-10 md:mt-1 font-semibold">
            AUG 2016 – AUG 2020
          </p>
        </div>
        {/* Intermediate */}
        <div className="md:w-[532px] w-[340px] md:h-[230px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14 lg:mt-14 lg:ml-[50%]">
          <p className="pt-[32px] font-bold text-[14px] md:text-[16px] text-bluePrimary md:float-right">
            INTERMEDIATE DEGREE
          </p>
          <p className="font-inter mt-4 font-semibold md:float-right">
            KALIKA HIGHER SECONDARY SCHOOL
          </p>
          <p className="md:w-[420px] mt-6 md:float-right md:text-right">
            Achieved the Intermediate Degree by obtaining the GPA of 7.3
          </p>
          <p className="font-inter float-right md:float-left mt-10 md:mt-0 font-semibold">
            APR 2012 – APR 2016
          </p>
        </div>
        {/* SLC */}
        <div className="md:w-[532px] w-[340px] md:h-[230px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14 lg:mt-14">
          <p className="pt-[32px] font-bold text-[14px] md:text-[16px] text-bluePrimary">
            SLC
          </p>
          <p className="font-inter mt-4 font-semibold">
            AXIS INTERNATIONAL SCHOOL
          </p>
          <p className="md:w-[420px] mt-6">
            Achieved SLC with an impressive 81%.
          </p>
          <p className="font-inter float-right mt-10 md:mt-9 font-semibold">
            JAN 2012
          </p>
        </div>
      </div>
    </section>
  );
}

export default Education;
