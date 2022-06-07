
import ImageNext from "next/image";
// import { getPlaiceholder } from "plaiceholder";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "../../lib/media";

const ImagePerso = ({ image, classProp }) => {

  // console.log(image);
  
  // const { alternativeText, width, height } = image?.data?.attributes;

  // const [blurDataURL, setBlurDataURL] = useState(null);

  // useEffect(() => {
  //   const fetchBlur = async () => {
  //     if (window) {
  //       const { base64 } = await getPlaiceholder(getStrapiMedia(image));
  //       setBlurDataURL(base64);
  //     }
  //   };
  //   fetchBlur();
  // })

  return (
    <ImageNext
      className={classProp}
      layout="fill"
      // width={width}
      // height={height}
      blurDataURL={getStrapiMedia(image)}
      placeholder="blur"
      objectFit="cover"
      loader={() => getStrapiMedia(image)}
      src={getStrapiMedia(image)}
      alt={'alternativeText' || ""}
    />
  );
};

export default ImagePerso;