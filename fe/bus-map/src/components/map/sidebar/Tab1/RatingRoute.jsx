import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WriteRating from "./WriteRating";

export default function RatingRoute() {
  const data = [
    {
      name: "Hoang Phan",
      rating: 4,
      date: "14-10-2023",
      comment:
        "The route is fine, I love it so much, pls keep improving. I can't wait until that",
    },
    {
      name: "Luc An",
      rating: 5,
      date: "15-10-2023",
      comment: "This is a great route for me",
    },
    {
      name: "Ma Dam",
      rating: 4,
      date: "15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 4,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 2,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 3,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 4,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 4,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 4,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 2,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 1,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 4,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
    {
      name: "Ma Dam",
      rating: 5,
      date: "10:54pm 15-10-2023",
      comment: "",
    },
  ];

  const [rate, setRate] = useState({
    rating: 0,
    numberCustomer: null,
    oneStart: null,
    twoStart: null,
    threeStart: null,
    fourStart: null,
    fiveStart: null,
  });

  // console.log(rate.fiveStart)

  useEffect(() => {
    const fetchOverallReview = () => {
      let totalRating = null;
      const totalCustomer = data.length;
      let start = {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
      };

      data.forEach((item) => {
        totalRating += item.rating;
        switch (item.rating) {
          case 1:
            start.one += 1;
            break;
          case 2:
            start.two += 1;
            break;
          case 3:
            start.three += 1;
            break;
          case 4:
            start.four += 1;
            break;
          case 5:
            start.five += 1;
            break;
          default:
            break;
        }
      });

      // console.log(totalCustomer)
      const averageRating = totalRating / totalCustomer;

      const percentages = {
        one: (start.one / totalCustomer) * 100,
        two: (start.two / totalCustomer) * 100,
        three: (start.three / totalCustomer) * 100,
        four: (start.four / totalCustomer) * 100,
        five: (start.five / totalCustomer) * 100,
      };

      // console.log('Percentage of 1-star: ', percentages.one.toFixed(2) + '%');
      // console.log('Percentage of 2-star: ', percentages.two.toFixed(2) + '%');
      // console.log('Percentage of 3-star: ', percentages.three.toFixed(2) + '%');
      // console.log('Percentage of 4-star: ', percentages.four.toFixed(2) + '%');
      // console.log('Percentage of 5-star: ', percentages.five.toFixed(2) + '%');

      setRate({
        rating: averageRating.toFixed(2),
        oneStart: percentages.one,
        twoStart: percentages.two,
        threeStart: percentages.three,
        fourStart: percentages.four,
        fiveStart: percentages.five,
        numberCustomer: totalCustomer,
      });
    };

    fetchOverallReview();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    // console.log(open)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack className="third--tab__rating">
      <Stack
        className="rate"
        justifyContent={"center"}
        alignContent={"center"}
        direction={"row"}
      >
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            width: "60%",
            color: "black",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#10af7e",
              color: "white !important",
            },
          }}
        >
          <MessageIcon
            sx={{
              margin: "0 3% 0 0",
            }}
          />
          <Typography>Write your rating</Typography>
        </Button>
        <WriteRating open={open} onClose={handleClose} />
      </Stack>
      <Stack className="total--rating">
        <Box sx={{ height: "20%" }}>
          <Typography sx={{ marginBottom: "4%" }}>Overall Review:</Typography>
        </Box>
        <Stack className="total--rating__content" direction={"row"} spacing={4}>
          <Stack
            className="total--rating__content__right"
            direction={"column"}
            alignItems={"center"}
            spacing={0.5}
          >
            <Typography sx={{ fontSize: "150%" }}>{rate.rating}</Typography>
            <Rating
              name="simple-controlled"
              value={rate.rating}
              disabled
              sx={{
                fontSize: "200%",
              }}
            />
            <Stack
              direction={"row"}
              spacing={0.5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <PersonIcon
                sx={{
                  fontSize: "140%",
                }}
              />
              <Typography sx={{ fontSize: "130%" }}>
                {rate.numberCustomer}
              </Typography>
            </Stack>
          </Stack>
          <Stack className="total--rating__content__left">
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Typography>5</Typography>
              <Box
                sx={{
                  width: `${rate.fiveStart}%`,
                  backgroundColor: "darkgreen",
                }}
              ></Box>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Typography>4</Typography>
              <Box
                sx={{
                  width: `${rate.fourStart}%`,
                  backgroundColor: "green",
                }}
              ></Box>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Typography>3</Typography>
              <Box
                sx={{
                  width: `${rate.threeStart}%`,
                  backgroundColor: "yellow",
                }}
              ></Box>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Typography>2</Typography>
              <Box
                sx={{
                  width: `${rate.twoStart}%`,
                  backgroundColor: "orange",
                }}
              ></Box>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Typography>1</Typography>
              <Box
                sx={{
                  width: `${rate.oneStart}%`,
                  backgroundColor: "red",
                }}
              ></Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack className="review--comment">
        <Stack className="review--comment__content">
          <Typography variant="h5" sx={{ marginBottom: "0%" }}>
            Review Comments:
          </Typography>
          <Stack className="review--comment__content__all--Comment">
            {data.map((item) => {
              return (
                <>
                  <Stack
                    sx={{
                      margin: "3% 0",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      sx={{
                        marginBottom: "2%",
                      }}
                    >
                      <Stack>
                        <Typography>
                          <strong>{item.name}</strong>
                        </Typography>
                        <Typography>{item.date}</Typography>
                      </Stack>
                      <Rating
                        name="simple-controlled"
                        value={item.rating}
                        disabled
                      />
                    </Stack>
                    <Typography>{item.comment}</Typography>
                  </Stack>
                  <hr />
                </>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
