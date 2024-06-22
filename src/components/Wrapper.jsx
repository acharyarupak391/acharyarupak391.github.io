import { classNames } from "@/utils/classnames";

const Wrapper = ({ children, id, className = "" }) => {
  return (
    <section
      id={id}
      className={classNames(
        "mx-[30px] md:mx-[70px] lg:mx-[180px] mt-[60px] pt-4 lg:mt-[160px]",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Wrapper;
