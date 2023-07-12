import React from "react";
import Skillcard from "./Skillcard";
import PythonLogo from "../assets/skills/python-logo.png";
import FLaskLogo from "../assets/skills/flask-log.png";
import GitLogo from "../assets/skills/git.png";
import AwsLogo from "../assets/skills/aws.png";
import TenserflowLogo from "../assets/skills/tensorflow.png";
import MongodbLogo from "../assets/skills/mongodb.png";
import NextLogo from "../assets/skills/next-logo.png";
import NodeJSLogo from "../assets/skills/nodejs-logo.png";
import PostgresSQLLogo from "../assets/skills/PostgresSQL.svg";
import ReactJSLogo from "../assets/skills/reactjs-log.png";
import ReduxLogo from "../assets/skills/redux-logo.png";
import TailwindCSSLogo from "../assets/skills/TailwindCSS.png";
import SolidityLogo from "../assets/skills/solidity.png";

const skills = [
  {
    Logo: PythonLogo,
    alt: "Logo for Python",
  },
  {
    Logo: NodeJSLogo,
    alt: "Logo for NodeJS",
  },
  {
    Logo: ReactJSLogo,
    alt: "Logo for ReactJS",
  },
  {
    Logo: SolidityLogo,
    alt: "Logo for Solidity",
    classes: "w-[100px]",
  },
  {
    Logo: GitLogo,
    alt: "Logo for Git",
  },
  {
    Logo: AwsLogo,
    alt: "Logo for Aws",
    classes: "w-[100px]",
  },
  {
    Logo: MongodbLogo,
    alt: "Logo for Mongodb",
  },
  {
    Logo: FLaskLogo,
    alt: "Logo for FLask",
    classes: "w-[100px]",
  },
  {
    Logo: TenserflowLogo,
    alt: "Logo for Tenserflow",
  },
  {
    Logo: NextLogo,
    alt: "Logo for Next",
  },
  {
    Logo: PostgresSQLLogo,
    alt: "Logo for PostgresSQL",
    classes: "w-[150px]",
  },
  {
    Logo: ReduxLogo,
    alt: "Logo for Redux",
  },
  {
    Logo: TailwindCSSLogo,
    alt: "Logo for TailwindCSS",
    classes: "w-[100px]",
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="mx-[30px] md:mx-[70px] lg:mx-[180px] mt-[66px] pt-10"
    >
      <div className="flex items-center justify-start gap-4">
        <h1 className=" text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          03. Skills
        </h1>
        <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-[66px] md:mt-[66px] mt-[56px] gap-10 lg:grid-cols-3 lg:gap-[77px] mx-auto w-fit lg:mt-[84px]">
        {skills.map(({ Logo, alt, classes }, i) => (
          <Skillcard src={Logo} alt={alt} key={i} classes={classes} />
        ))}
      </div>
    </section>
  );
}

export default Skills;
