import ReactLogo from "./images/react-logo.png"
import FlaskLogo from "./images/flask-logo.jpg"
import MySQLogo from "./images/mysql-logo.png"
import GitlabLogo from "./images/gitlab-Logo.jpg"
import AWSLogo from "./images/aws-logo.jpg"
import DockerLogo from "./images/docker-logo.png"
import PostmanLogo from "./images/postman-logo.png"

const ToolInfo = [
    {
        image: ReactLogo,
        link: "https://reactjs.org",
        name: "React",
        desc: "A free and open-source front-end JavaScript library for building user interfaces based on UI components. Used for website UI design and dynamic features.",
    },
    {
        image: FlaskLogo,
        link: "https://flask.palletsprojects.com/en/2.2.x/",
        name: "Flask",
        desc: "A Python web development framework. Used to provide endpoints for our API.",
    },
    {
        image: MySQLogo,
        link: "https://www.mysql.com/",
        name: "MySQL",
        desc: "An open-source relational database management system. Used to store data regarding our instances.",
    },
    {
        image: GitlabLogo,
        link: "https://about.gitlab.com",
        name: "GitLab",
        desc: "An open-source DevOps software package which can develop, secure, and operate software. Used for our git repository and CI/CD platform.",
    },
    {
        image: AWSLogo,
        link: "https://aws.amazon.com",
        name: "Amazon Web Services",
        desc: "Subsidiary of Amazon that provides on-demand cloud computing platforms and APIs. Used Amplify to host our frontend server. Used Lightsail to host our backend server. Used RDS to host our database",
    },
    {
        image: DockerLogo,
        link: "https://www.docker.com/",
        name: "Docker",
        desc: "A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Used to create frontend and backend containers.",
    },
    {
      image: PostmanLogo,
      link: "https://www.postman.com",
      name: "Postman",
      desc: "An API platform for developers to design, build, test and iterate their APIs. Used to implement and document the API for our website.",
    },
  ];
  
  export { ToolInfo };
  
  