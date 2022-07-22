import React from "react";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  return <div>PostDetails</div>;
}

export default PostDetails;
