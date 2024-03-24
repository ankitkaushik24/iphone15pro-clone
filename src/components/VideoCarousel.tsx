import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [playState, setPlayState] = useState<"playing" | "paused" | "ended">(
    "playing"
  );

  useEffect(() => {
    if (videoRef.current[activeVideo]) {
      const currVideoRef = videoRef.current;
      currVideoRef[activeVideo].play();
      setPlayState("playing");

      return () => currVideoRef[activeVideo].pause();
    }
  }, [activeVideo]);

  const onEnded = (idx: number) => {
    if (idx === hightlightsSlides.length - 1) {
      setPlayState("ended");
    } else {
      setActiveVideo(idx + 1);
    }
  };

  const ctrlBtnProps = (() => {
    switch (playState) {
      case "ended":
        return {
          src: replayImg,
          onClick: () => {
            setActiveVideo(0);
          },
        };
      case "paused":
        return {
          src: playImg,
          onClick: () => {
            setPlayState("playing");
            videoRef.current[activeVideo].play();
          },
        };
      default:
        return {
          src: pauseImg,
          onClick: () => {
            setPlayState("paused");
            videoRef.current[activeVideo].pause();
          },
        };
    }
  })();

  const dotnavStyles = (duration: number) => ({
    animationPlayState: playState === "paused" ? "paused" : "running",
    "--animate-duration": `${duration}s`,
  });

  return (
    <>
      <ul
        className="flex items-center gap-20 transition-move"
        style={{
          transform: `translateX(calc(${-100 * activeVideo}% - ${
            80 * activeVideo
          }px))`,
        }}
      >
        {hightlightsSlides.map((list, i) => (
          <li key={list.id} id="slider" className="w-full shrink-0">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el: HTMLVideoElement) => (videoRef.current[i] = el)}
                  onEnded={() => onEnded(i)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((slide, i) => (
            <span
              key={i}
              onClick={() => setActiveVideo(i)}
              className={`dotnav-slide mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden ${
                i === activeVideo && "active-slide"
              }`}
            >
              <span
                style={dotnavStyles(slide.videoDuration)}
                className="absolute h-full left-0 bg-white rounded-full dotnav"
              />
            </span>
          ))}
        </div>

        <button className="control-btn" onClick={ctrlBtnProps.onClick}>
          <img src={ctrlBtnProps.src} />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
