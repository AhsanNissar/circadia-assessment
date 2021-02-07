import React, { useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import "./App.css";
import LineGraph from "./Components/lineGraph";
import GuageChart from "./Components/guageChart";
import ScatterGraph from "./Components/scatterGraph";
import LiveScatterGraph from "./Components/liveScatterGraph";
import { w3cwebsocket } from "websocket";

const Profile = (props) => {
  let [data, setData] = useState({});
  let [guageData, setGuageData] = useState();

  var client = new w3cwebsocket(
    "wss://eaau0dhgl6.execute-api.us-east-1.amazonaws.com/dev"
  );

  client.onerror = function (e) {
    console.log("Connection Error", e);
  };

  client.onclose = function () {
    console.log("echo-protocol Client Closed");
  };
  setInterval(() => {
    client.onmessage = function (e) {
      if (e.data) {
        let receivedData = JSON.parse(e.data);
        if (receivedData.line_graph.length > 0) {
          setData(receivedData);
        }
        if (receivedData) {
          setGuageData(receivedData.live_value);
        }
      }
    };
  }, 3000);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8 mx-auto">
          <div class="my-4">
            <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                >
                  Profile
                </a>
              </li>
            </ul>
            <form>
              <div class="row mt-5 align-items-center">
                <div class="col-md-3 text-center mb-5">
                  <div class="avatar avatar-xl">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="..."
                      class="avatar-img rounded-circle"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="row align-items-center">
                    <div class="col-md-7">
                      <h4 class="mb-1">Brown, Asher</h4>
                      <p class="small mb-3">
                        <span class="badge badge-dark">New York, USA</span>
                      </p>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-7">
                      <p class="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien.
                      </p>
                    </div>
                    <div class="col">
                      <p class="small mb-0 text-muted">Nec Urna Suscipit Ltd</p>
                      <p class="small mb-0 text-muted">
                        P.O. Box 464, 5975 Eget Avenue
                      </p>
                      <p class="small mb-0 text-muted">(537) 315-1481</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
            </form>
          </div>
        </div>
      </div>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Live
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Trends
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="6">
                <h1>Line Graph</h1>
                <LineGraph data={data.line_graph}></LineGraph>
              </Col>
              <Col sm="6">
                <h1>Guage Chart</h1>
                <GuageChart data={guageData}></GuageChart>
              </Col>
            </Row>
            <Row>
              <h1>Scatter Graph</h1>
              <LiveScatterGraph></LiveScatterGraph>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <ScatterGraph></ScatterGraph>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <hr />
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default Profile;
