import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import gsap from "gsap";
import { useEffect, useState } from "react";

const getRespectiveVideoSrc = () =>
  window.innerWidth < 760 ? smallHeroVideo : heroVideo;

const useVideoSrc = () => {
  const [videoSrc, setVideoSrc] = useState(getRespectiveVideoSrc);

  const onResize = () => {
    setVideoSrc(getRespectiveVideoSrc());
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return videoSrc;
};

const Hero = () => {
  const videoSrc = useVideoSrc();

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });

    gsap.fromTo(
      "#cta",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: -50,
        delay: 2,
      }
    );
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>

        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            loop={true}
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center">
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
