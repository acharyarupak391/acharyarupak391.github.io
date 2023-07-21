import { Helmet } from "react-helmet-async";

export const SEO = () => {
  const metaDescription =
    "This is a portfolio website of Rupak Acharya; developer, computer science enthusiast.";
  const description =
    "Hi there, I'm Rupak. I'm a computer science enginner and a full time programmer. I like to learn about things & code. Et tu? 🙂";
  const BASE_URL = "https://rupakacharya.com.np";
  const name = "Rupak Acharya";
  const twitterHandle = "@acharyarupak391";

  return (
    <Helmet>
      <title>{name}</title>

      <meta name="description" content={metaDescription} />

      <link rel="canonical" href={BASE_URL} />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}/og.png`} />
      <meta property="og:url" content={BASE_URL} />

      <meta property="twitter:site" content={twitterHandle} />
      <meta property="twitter:title" content={name} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:creator" content={twitterHandle} />
      <meta property="twitter:card" content={description} />
      <meta property="twitter:image" content={`${BASE_URL}/og.png`} />
      <meta property="twitter:image:alt" content="Open graph image" />
    </Helmet>
  );
};
