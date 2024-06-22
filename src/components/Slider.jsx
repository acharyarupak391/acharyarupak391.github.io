import { classNames } from "@/utils/classnames";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ChevronRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 6l6 6l-6 6" />
  </svg>
);

const Slider = ({ list, renderer, className = "", options = {} }) => {
  return (
    <Splide
      hasTrack={false}
      className={classNames("w-full", className)}
      options={{
        perMove: 1,
        type: "loop",
        gap: 16,
        ...options,
      }}
    >
      <SplideTrack>
        {list.map((item, i) => (
          <SplideSlide key={i} className="">
            {renderer ? renderer(item) : JSON.stringify(item)}
          </SplideSlide>
        ))}
      </SplideTrack>

      <div className="!-bottom-8 splide__pagination" />
    </Splide>
  );
};

export default Slider;
