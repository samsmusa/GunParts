import { useState } from "react";

const useShowImage = () => {
  const [image, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return {image, setImage, onImageChange}
}

export default useShowImage;