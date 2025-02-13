import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { TeamInfo } from "../TeamInfo.js"
import { ToolInfo } from "../ToolInfo.js"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import TeamCard from "./TeamCard.js";
import ToolCard from "./ToolCard.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function About() {
  const [totalCommits, setTotalCommits] = useState([]);
  const [totalIssues, setTotalIssues] = useState([]);

  // Get commits per user
  async function get_commits() {
    var numCommits = 0;
    var request = new XMLHttpRequest();  
    var url =
      "https://gitlab.com/api/v4/projects/50467591/repository/contributors/";
    request.open("GET", url);
    request.onload = function () {
      var result = JSON.parse(this.response);
      result.forEach((data) => {
        TeamInfo.forEach((user) => {
          if (data.name === user.name) {
            user.commits = data.commits;
            numCommits += data.commits;
          }
        });
      });
      setTotalCommits(numCommits);
    };
    request.send();
  }

  // Get total unit tests
  function total_unittests() {
    var total = 0;
    TeamInfo.forEach((user) => {
        total += user.unittests;
      });
      return total;
  }

  // Get issues per user
  async function get_issues() {
    TeamInfo.forEach((user) => {
      var request = new XMLHttpRequest();
      var url =
        "https://gitlab.com/api/v4/projects/50467591/issues_statistics?author_id=".concat(
          user.user_id
        );
      request.open("GET", url);
      request.onload = function () {
        var result = JSON.parse(this.response);
        var num = result.statistics.counts.all;
        user.issues = num;
      };
      request.send();
    });
  }

  // Get total issues
  async function total_issues() {
    var request = new XMLHttpRequest();
    var url = "https://gitlab.com/api/v4/projects/50467591/issues_statistics";
    request.open("GET", url);
    request.onload = function () {
      var result = JSON.parse(this.response);
      var num = result.statistics.counts.all;
      setTotalIssues(num);
    };
    request.send();
  }

  useEffect(() => {
    get_commits();
    get_issues();
    total_issues();
  }, []);

  return (
    <>
      <Container className="container text-center mt-5 mb-4">
        <h1>About Syrian Refugee Crisis</h1>
      </Container>
      <Container className="container text-start mt-5 mb-4">
        <p>
          Our project serves to assist Syrian refugees with resources as well as educate the public on the 
          Syrian refugee crisis. We will be providing charities and organizations across many countries which 
          can assist Syrian refugees with housing, medical care, education, etc. This site can be used as a great 
          resource to help increase Syrian refugee outreach across the globe.

          To build this website so far, we have utilized JavaScript (React framework), CSS (Bootstrap), HTML, 
          Python (Flask Framework), AWS, and MySQL (connected via Flask SQLAlchemy). We have also utilized public APIs from 
          various sites, including UNHCR, Wikipedia, Relief Web, Google Maps, and Microsoft Bing.
        </p>
      </Container>

      <Container className="container text-center mt-5 mb-4">
        <h1>Meet the Team</h1>
      </Container>
      <Container className="container text-start mt-5 mb-4">
        <Row className="row row-cols-md-5 g-4">
          {TeamInfo.map((user) => {
            return (
              <Col key={user.name} className="col">
                <TeamCard {...user}></TeamCard>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Container className="container text-center mt-5 mb-4">
        <h2>Team GitLab Statistics</h2>
      </Container>
      <Container className="container text-center mt-5 mb-4">
        <Card>
          <Card.Body>
            <Card.Subtitle as="h5">Total Commits: {totalCommits}</Card.Subtitle>
            <br></br>
            <Card.Subtitle as="h5">Total Issues: {totalIssues}</Card.Subtitle>
            <br></br>
            <Card.Subtitle as="h5">Total Unit Tests: {total_unittests()}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>
      <Container className="container text-center mt-5 mb-4">
        <Link to="https://documenter.getpostman.com/view/30070229/2s9YR9YsK4">
          <Button size="md"> 
            API Documentation
          </Button>
        </Link>
      </Container>
      <Container className="container text-center mt-5 mb-4">
        <Link to="https://gitlab.com/mcastilleja/syrian_refugee_crisis">
          <Button size="md"> 
            Gitlab Repository
          </Button>
        </Link>
      </Container>
      <br></br>


      <Container className="container text-center mt-5 mb-4">
        <h1>Tools</h1>
      </Container>
      <Container className="container text-center mt-5 mb-4">
        <Row className="row row-cols-md-4 g-3">
          {ToolInfo.slice(0, 4).map((tool) => {
            return (
              <Col className="col">
                <ToolCard {...tool}></ToolCard>
              </Col>
            );
          })}
        </Row>
        <br></br>
        <Row className="row row-cols-md-4 g-3">
          {ToolInfo.slice(4).map((tool) => {
            return (
              <Col key={tool.name} className="col">
                <ToolCard {...tool}></ToolCard>
              </Col>
            );
          })}
        </Row>
      </Container>

    </>
  );
}