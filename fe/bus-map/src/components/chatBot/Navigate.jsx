import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Navigate({ steps, triggerNextStep }) {
  const navigate = useNavigate();
  const { pointOneAnswer, pointTwoAnswer } = steps;

  const [test, setTest] = useState("");

  useEffect(() => {
    const fetchRouteWithOnetrip = async () => {
      // console.log("1:", pointOneAnswer)
      // console.log("2: ", pointTwoAnswer)

      const startLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        pointOneAnswer.value
      )}&format=json`;
      const destinationLocationApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        pointTwoAnswer.value
      )}&format=json`;
      // console.log("startLocation: ", startLocationApiUrl);
      // console.log("destinationLocation: ", destinationLocationApiUrl);

      try {
        const response1 = await fetch(startLocationApiUrl);
        const addressInfo1 = await response1.json();
        const response2 = await fetch(destinationLocationApiUrl);
        const addressInfo2 = await response2.json();

        // console.log("startLocation: ", addressInfo1);
        // console.log("destinationLocation: ", addressInfo2);

        const latitude1 = addressInfo1[0].lat;
        const longitude1 = addressInfo1[0].lon;
        const latitude2 = addressInfo2[0].lat;
        const longitude2 = addressInfo2[0].lon;
        setTest(latitude1);

        navigate(`/home/${latitude1}_${longitude1}_${latitude2}_${longitude2}`);
        triggerNextStep();
      } catch (error) {
        //check err
        console.error("Error fetching data:", error);
      }
    };
    fetchRouteWithOnetrip();
  }, [steps]);

  return (
    <Box>
      {test !== "" ? (
        <Box>Choose Route: </Box>
      ) : (
        <Box>Waiting for responding...</Box>
      )}
    </Box>
  );
}

Navigate.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Navigate.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default Navigate;

// class Navigate extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       pointOneAnswer: "",
//       pointTwoAnswer: "",
//     };

//     this.triggetNext = this.triggetNext.bind(this);
//   }

//   componentWillMount() {
//     const self = this;
//     const { steps } = this.props;
//     const { pointOneAnswer, pointTwoAnswer } = steps;

//     this.setState({ pointOneAnswer, pointTwoAnswer });
//   }

//   triggetNext() {
//     this.setState({ trigger: true }, () => {
//       this.props.triggerNextStep();
//     });
//   }

//   render() {
//     const { pointOneAnswer, pointTwoAnswer } = this.state;
//     return <Typography>Choose Route: </Typography>;
//   }
// }

// Navigate.propTypes = {
//   steps: PropTypes.object,
//   triggerNextStep: PropTypes.func,
// };

// Navigate.defaultProps = {
//   steps: undefined,
//   triggerNextStep: undefined,
// };
