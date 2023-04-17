import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classes from "./SlidesShow.module.css";
import HomeImg from "../../assets/images/HomeImg.png";
import HomeImg1 from "../../assets/images/HomeImg1.png";
import HomeImg3 from "../../assets/images/HomeImg3.png";

const SlidesShow = () => {
  const slideImages = [HomeImg, HomeImg1, HomeImg3];

  const properties = {
    duration: 4000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    arrows: true,
  };

  return (
    <div className={classes.container}>
      <Slide {...properties}>
        {slideImages.map((each, index) => (
          <div key={index} className={classes.img}>
            <img src={each} alt="slideshow" className={classes.img} />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlidesShow;
