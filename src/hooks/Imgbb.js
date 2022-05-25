import { useState } from "react";

const Imgbb = async (image) => {
  let img 
  const formData = new FormData();
  formData.append("image", image);
  const url =
    "https://api.imgbb.com/1/upload?key=63cc0d5d42db1c59c5fc2c707c750411";

  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        img = res.data.url;
      }
    });
  return img
};

export default Imgbb;
