import React from "react";

function Trainings() {
  return (
    <section className="mx-[30px] md:mx-[70px] lg:mx-[180px] mt-[66px] lg:mt-[132px]">
      <div className="flex justify-start items-center gap-4">
        <h1 className=" text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          05. Some Noteworthy Trainings and Certifications
        </h1>
        {/* <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div> */}
      </div>
      <div className="grid md:grid-cols-2 md:gap-[66px] lg:grid-cols-3 lg:gap-[77px] md:mt-[66px] mt-[56px]   lg:mt-[84px]">
        <div className="md:w-[300px] w-[340px] md:h-[280px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14 ">
          <p className="pt-[32px] font-bold   text-bluePrimary">
            MACHINE LEARNING WITH PYTHON
          </p>
          <p className="font-inter mt-1 text-sm font-semibold">Microsoft</p>
          <p className=" md:mt-4 mt-10 text-xs">
            Basic Machine Learning Training using python Familiarity with
            Scikit-learn, pandas, numpy etc. packages
          </p>
          <p className="font-inter float-right mt-20 text-sm md:mt-9 font-semibold">
            2019-02-18 – 2019-02-23
          </p>
        </div>
        <div className="md:w-[300px] w-[340px] md:h-[280px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14 ">
          <p className="pt-[32px] font-bold   text-bluePrimary">
            WEB DEVELOPMENT
          </p>
          <p className="font-inter mt-1 text-sm font-semibold">Self Taught</p>
          <p className=" md:mt-4 mt-10 text-xs">
            Course on HTML, CSS and JavaScript for creating dynamic and
            responsive web sites
          </p>
          <p className="font-inter float-right mt-20 text-sm md:mt-9 font-semibold">
            2018-05-20 – 2018-05-29
          </p>
        </div>
        <div className="md:w-[300px] w-[340px] md:h-[280px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14 ">
          <p className="pt-[32px] font-bold   text-bluePrimary">
            INTRODUCTION TO TENSORFLOW IN PYTHON
          </p>
          <p className="font-inter mt-1 text-sm font-semibold">Datacamp</p>
          <p className=" md:mt-4 mt-10 text-xs">
            Using Tensorflow and Keras, to run various Machine Learning models
            Working with various datasets like MNIST
          </p>
          <p className="font-inter float-right mt-20 text-sm md:mt-9 font-semibold">
            May, 2020
          </p>
        </div>
      </div>
    </section>
  );
}

export default Trainings;
