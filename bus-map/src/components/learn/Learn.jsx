import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { dataItems } from "./data";
import { Height } from "@mui/icons-material";

export default function Learn() {
  // const dataItems = [
  //   "Promotion",
  //   "Opportunity",
  //   "Development",
  //   "Luggage",
  //   "Happiness",
  //   "Experience",
  //   "Performance",
  //   "Artist",
  //   "Applicant",
  //   "Employee",
  //   "Representative",
  //   "Building",
  // ];

  const [count, setCount] = useState(0);
  const [usedDataIndexes, setUsedDataIndexes] = useState([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(-1);

  const getRandomIndex = () => {
    const availableIndexes = dataItems
      .map((_, index) => index)
      .filter((index) => !usedDataIndexes.includes(index));
    if (availableIndexes.length === 0) {
      return -1;
    }
    return availableIndexes[
      Math.floor(Math.random() * availableIndexes.length)
    ];
  };

  const handleButtonClick = () => {
    const randomIndex = getRandomIndex();
    if (randomIndex !== -1) {
      setUsedDataIndexes([...usedDataIndexes, randomIndex]);
      setCurrentDataIndex(randomIndex);
      setCount(count + 1);
    }
  };

  return (
    <>
      <Container className="learn__container">
        {currentDataIndex !== -1 ? (
          <>
            <Typography variant="h1">{dataItems[currentDataIndex]}</Typography>
            <Typography variant="h2">Count: {count}</Typography>
          </>
        ) : (
          <Typography variant="h1">Begin</Typography>
        )}
        <Button
          variant="contained"
          sx={{ height: "7vh" }}
          color="primary"
          onClick={handleButtonClick}
        >
          Click to show từ vựng
        </Button>
      </Container>
    </>
  );
}
