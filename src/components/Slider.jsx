import { classNames } from "@/utils/classnames";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Slider = ({
  list,
  renderer,
  className = "",
  lastSlide = null,
  options = {},
}) => {
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
            {renderer ? renderer(item, i) : JSON.stringify(item)}
          </SplideSlide>
        ))}

        {lastSlide && <SplideSlide>{lastSlide}</SplideSlide>}
      </SplideTrack>

      <div className="!-bottom-8 splide__pagination" />
    </Splide>
  );
};

export default Slider;
