const Title = ({ children }) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <h1 className=" text-[24px] md:text-[32px] font-bold  text-bluePrimary">
        {children}
      </h1>
      <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
    </div>
  );
};

export default Title;
