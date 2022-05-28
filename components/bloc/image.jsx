
import ImageNext from "next/image";
import { getStrapiMedia } from "../../lib/media";

const ImagePerso = ({ image, classProp }) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <ImageNext
      className={classProp}
      layout="responsive"
      width={width}
      height={height}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  );
};

export default ImagePerso;