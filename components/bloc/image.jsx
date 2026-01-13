
import ImageNext from "next/image";
// import { getPlaiceholder } from "plaiceholder";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "../../lib/media";

const ImagePerso = ({ image, directUrl, classProp, contain = false }) => {
  // Guard: if no image is provided, don't render anything
  if (!image) {
    return null;
  }

  // For non-direct URLs, check if the Strapi image data exists
  if (!directUrl && !image?.data?.attributes?.url) {
    return null;
  }

  return (
    <>
    {
      directUrl ? 
        <ImageNext
        className={classProp}
        layout="fill"
        // width={width}
        // height={height}
        blurDataURL={image}
        placeholder="blur"
        objectFit={contain ? "contain" : "cover"}
        loader={() => image}
        src={image}
        alt={'alternativeText' || ""}
      /> : 
        <ImageNext
        className={classProp}
        layout="fill"
        // width={width}
        // height={height}
        blurDataURL={getStrapiMedia(image)}
        placeholder="blur"
        objectFit={contain ? "contain" : "cover"}
        loader={() => getStrapiMedia(image)}
        src={getStrapiMedia(image)}
        alt={'alternativeText' || ""}
      />
    }
    </>
  );
};

export default ImagePerso;