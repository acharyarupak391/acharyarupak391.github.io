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

const experience = [
  {
    id: 1,
    role: "FRONTEND ENGINEER",
    companyName: "NEPTUNE MUTUAL",
    description: [
      "Currently, I am immersed in the fascinating world of web3 and blockchain technology, leveraging my expertise in React and other modern tech stacks.",
      "As a part of my current work experience at a prominent company, I am actively involved in developing decentralized applications, smart contracts, and exploring innovative solutions to revolutionize various industries using blockchain technology.",
    ],
    timespan: "2022-01-01 to Present",
  },
  {
    id: 2,
    role: "FULL STACK DEVELOPER",
    companyName: "INFINITY DIGITAL AGENCY(IDA)",
    description: [
      "Developed and maintained dynamic React applications with server-side rendering (SSR) using Next.js, enhancing user experience and performance.",
      "Collaborated with the backend team to build robust APIs using Node.js, ensuring seamless integration between the frontend and backend systems.",
    ],
    timespan: "2021-09-01 to 2022-01-01",
  },
  {
    id: 3,
    role: "REACT DEVELOPER",
    companyName: "KARYATHALO",
    description: [
      "Led the development of a dynamic React dashboard application, leveraging Redux for state management and Axios for seamless data fetching and manipulation.",
      "Integrated various third-party libraries and APIs to enhance the functionality and features of the dashboard app, providing real-time data updates and interactive user interactions.",
    ],
    timespan: "2021-12-01 to 2022-03-10",
  },
  {
    id: 4,
    role: "JAVASCRIPT & REACTJS DEVELOPER",
    companyName: "BERRYBYTES",
    description: [
      "Spearheaded the development of dynamic websites using ReactJS, harnessing the power of Axios for seamless data fetching and Redux for efficient state management.",
      "Leveraged the Material-UI (MUI) library to create visually appealing and responsive user interfaces, enhancing the overall user experience.",
    ],
    timespan: "2020-12-01 to 2021-09-01",
  },
];

const education = [
  {
    title: "BACHELOR OF TECHNOLOGY (B. TECH)",
    institutionName: "MALLA REDDY COLLEGE OF ENGINEERING AND TECHNOLOGY",
    text: "Graduated with a bachelor's degree in Computer Science & Engineering.",
    date: "AUG 2016 - AUG 2020",
  },
  {
    title: "INTERMEDIATE DEGREE",
    institutionName: "KALIKA HIGHER SECONDARY SCHOOL",
    text: "Achieved the Intermediate Degree by obtaining the GPA of 7.3",
    date: "APR 2012 - APR 2016",
  },
  {
    title: "SLC",
    institutionName: "AXIS INTERNATIONAL SCHOOL",
    text: "Achieved SLC with an impressive 81%.",
    date: "JAN 2012",
  },
];

const trainings = [
  {
    title: "MACHINE LEARNING WITH PYTHON",
    from: "Microsoft",
    info: "Basic Machine Learning Training using python Familiarity with Scikit-learn, pandas, numpy etc. packages",
    date: "2019-02-18 - 2019-02-23",
  },
  {
    title: "WEB DEVELOPMENT",
    from: "Self Taught",
    info: "Course on HTML, CSS and JavaScript for creating dynamic and responsive web sites",
    date: "2018-05-20 - 2018-05-29",
  },
  {
    title: "INTRODUCTION TO TENSORFLOW IN PYTHON",
    from: "Datacamp",
    info: "Using Tensorflow and Keras, to run various Machine Learning models Working with various datasets like MNIST",
    date: "May, 2020",
  },
];

const skills = [
  {
    Logo: PythonLogo,
    name: "Python",
  },
  {
    Logo: NodeJSLogo,
    name: "NodeJS",
  },
  {
    Logo: ReactJSLogo,
    name: "ReactJS",
  },
  {
    Logo: SolidityLogo,
    name: "Solidity",
    classes: "w-[100px]",
  },
  {
    Logo: GitLogo,
    name: "Git",
  },
  {
    Logo: AwsLogo,
    name: "Aws",
    classes: "w-[100px]",
  },
  {
    Logo: MongodbLogo,
    name: "Mongodb",
  },
  {
    Logo: FLaskLogo,
    name: "FLask",
    classes: "w-[100px]",
  },
  {
    Logo: TenserflowLogo,
    name: "Tenserflow",
  },
  {
    Logo: NextLogo,
    name: "NextJS",
  },
  {
    Logo: PostgresSQLLogo,
    name: "PostgresSQL",
    classes: "w-[150px]",
  },
  {
    Logo: ReduxLogo,
    name: "Redux",
  },
  {
    Logo: TailwindCSSLogo,
    name: "TailwindCSS",
    classes: "w-[100px]",
  },
];

export { experience, education, trainings, skills };
