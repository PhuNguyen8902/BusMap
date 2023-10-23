import React from "react";
import FeedbackByUserTable from "../components/Feedback/FeedbackByUserTable";

export default function FeedbackPageByUser(props) {
  return <FeedbackByUserTable userId={props.userId} />;
}
