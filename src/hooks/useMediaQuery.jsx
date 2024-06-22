const { useState, useLayoutEffect } = require("react");

const useMediaQuery = ({ query }) => {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    if (!query) return;

    const onResize = () => {
      setMatches(window.matchMedia(query).matches);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
