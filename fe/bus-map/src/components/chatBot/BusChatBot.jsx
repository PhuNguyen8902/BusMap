import ChatBot from "react-simple-chatbot";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import imgAboutSearchBar from "../../assets/img/searchRoute.png";
import imgAboutRouteDetail from "../../assets/img/RouteDetail.png";
import imgAboutRouteRating from "../../assets/img/RouteRating.png";
import { useEffect, useState } from "react";
import Navigate from "./Navigate";
import React, { Component } from "react";
import OneRoute from "./OneRoute"
import TwoRoute from "./TwoRoute"
import ThreeRoute from "./ThreeRoute"


export default function BusChatBot() {
  const [fullPicture, setFullPiture] = useState(null);

  const fullScreenPicture = (event) => {
    setFullPiture(event);
  };

  const closeFullScreenPicture = () => {
    setFullPiture(null);
  };

  
  // const steps=[
  //   {
  //     id: '1',
  //     message: 'What is your name?',
  //     trigger: '2',
  //   },
  //   {
  //     id: '2',
  //     user: true,
  //     trigger: '3',
  //   },
  //   {
  //     id: '3',
  //     message: 'What is your name?',
  //     trigger: '4',
  //   },
  //   {
  //     id: '4',
  //     user: true,
  //     trigger: '1',
  //   },
  // ]

  const steps = [
    {
      id: "Greet",
      message: "Hi, Welcome to our website",
      trigger: "ask question number 1",
    },
    {
      id: "ask question number 1",
      message: "What do you want to know?",
      trigger: "what",
    },
    {
      id: "what",
      options: [
        {
          value: "one",
          label: "About the BusMap Website",
          trigger: "BusMap Website",
        },
        { value: "two", label: "Infomation about you", trigger: "About us" },
        {
          value: "three",
          label: "How can I contact you",
          trigger: "How can I contact us",
        },
        {
          value: "four",
          label: "How to use BusMap properly",
          trigger: "How to use BusMap properly",
        },
        {
          value: "five",
          label: "Navigate location from two points",
          trigger: "pointOne",
        },
      ],
    },
    {
      id: "BusMap Website",
      message:
        "The application for public transportation, which is considered the top choice in Vietnam",
      trigger: "ask question number 1",
    },
    {
      id: "About us",
      message:
        "We improve public transportation for enhanced convenience and efficiency through innovative solutions and technology.",
      trigger: "ask question number 1",
    },
    {
      id: "How can I contact us",
      message: "You can contact us through phone number: 0908091530",
      trigger: "ask question number 1",
    },
    {
      id: "How to use BusMap properly",
      component: (
        <div class="using--busmap--intrustion">
          <div class=""> To use BusMap you need to follow these steps: </div>
          <div> 1. Open the map by clickling the 'OPEN MAP' button </div>
          <div style={{ width: "100%" }}>
            2. Then in the right site, there is a search bar, you can search any
            route you want to know
            <div class="wrap--img">
              <img
                src={imgAboutSearchBar}
                alt="null"
                onClick={() => fullScreenPicture(imgAboutSearchBar)}
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div>
            3. And then you can click to those routes below to see the their
            detail
            <div class="wrap--img">
              <img
                src={imgAboutRouteDetail}
                onClick={() => fullScreenPicture(imgAboutRouteDetail)}
                alt="null"
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div>
            4. And then you can click to Rating to see the rating of the route,
            you can also rate and comment to the route you selected
            <div class="wrap--img">
              <img
                src={imgAboutRouteRating}
                onClick={() => fullScreenPicture(imgAboutRouteRating)}
                alt="null"
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      ),
      trigger: "ask question number 1",
    },
    {
      id: "pointOne",
      message: "Your Location: ",
      trigger: "pointOneAnswer",
    },
    {
      id: "pointOneAnswer",
      user: true,
      trigger: "pointTwo",
    },
    {
      id: "pointTwo",
      message: "Your Destination: ",
      trigger: "pointTwoAnswer",
    },
    {
      id: "pointTwoAnswer",
      user: true,
      trigger: "navigate",
    },
    {
      id: "navigate",
      waitAction: true,
      component: <Navigate />,
      asMessage: true,
      trigger: "routeChoose",
    },
    {
      id: "routeChoose",
      options: [
        {
          value: "one",
          label: "One Route",
          trigger: "oneRoute",
        },
        { value: "two", 
          label: "Two Routes", 
          trigger: "twoRoute", 
        },
        {
          value: "three",
          label: "Three Routes",
          trigger: "threeRoute",
        },
      ],
    },
    {
      id: "oneRoute",
      waitAction: true,
      component: <OneRoute />,
      trigger: "endQuestion",
    },
    {
      id: "twoRoute",
      waitAction: true,
      component: <TwoRoute />,
      trigger: "endQuestion",
    },
    {
      id: "threeRoute",
      waitAction: true,
      component: <ThreeRoute />,
      trigger: "endQuestion",
    },
    {
      id: "endQuestion",
      message: "Choose another route?",
      trigger: "chooseAnotherRoute",
    },
    {
      id: "chooseAnotherRoute",
      options: [
        {
          value: "yes",
          label: "Yes", 
          trigger: "routeChoose",
        },
        { value: "no", 
          label: "No", 
          trigger: "ask question number 1", 
        },
      ]
    },
  ];

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          right: "2%",
          bottom: "2%",
          zIndex: "999",
        }}
      >
        <ChatBot
          headerTitle="BusMap chatbot"
          recognitionEnable="true"
          speechSynthesis={{ enable: false, lang: "en" }}
          floating="true"
          enableSmoothScroll="true"
          steps={steps}
        />
      </Box>
      {fullPicture !== null ? (
        <Box
          sx={{
            position: "fixed",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: "1000",
          }}
        >
          <IconButton
            onClick={() => closeFullScreenPicture()}
            sx={{
              position: "fixed",
              right: "0",
              top: "0",
              color: "white",
              zIndex: "1100",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={fullPicture}
            alt=""
            style={{
              position: "fixed",
              right: "50%",
              bottom: "50%",
              transform: "translate(50%, 50%)",
            }}
          />
        </Box>
      ) : null}
    </>
  );
}
