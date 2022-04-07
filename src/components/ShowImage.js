import React, { useEffect, useState } from "react";

export default function ImageTest(props) {
  console.log("image props", props.url);
  const imageUrl = props.url;
  const [imgUrl, setImgUrl] = useState();

  const getImg = async () => {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
    };
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div>
      <img src={imgUrl} alt="" />
    </div>
  );
}
