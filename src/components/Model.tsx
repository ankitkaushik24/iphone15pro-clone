import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { models, sizes } from "../constants";
import ModelView from "./ModelView";

const rotationAmount = 2.5;

const Model = () => {
  const smallModelRef = useRef(new THREE.Group());
  const largeModelRef = useRef(new THREE.Group());

  const [size, setSize] = useState<"small" | "large">("small");
  const [modelIdx, setModelIdx] = useState(0);
  const model = models[modelIdx];

  const timeline = gsap.timeline({ ease: "power2.inOut" });

  useLayoutEffect(() => {
    if (size === "small") {
      timeline
        .to(largeModelRef.current.rotation, {
          y: 0,
          x: 0,
          z: 0,
          duration: 1,
        })
        .to("#largeView", {
          // x: 0,
          transform: "translateX(0)",
          opacity: 0,
          duration: 0.5,
        })
        .to(
          "#smallView",
          {
            transform: "translateX(0)",
            // x: 0,
            opacity: 1,
          },
          "<"
        )
        .to(smallModelRef.current.rotation, {
          y: rotationAmount,
          x: 0,
          z: 0,
          duration: 1,
        });
    } else {
      timeline
        .to(smallModelRef.current.rotation, {
          y: 0,
          x: 0,
          z: 0,
          duration: 1,
        })
        .to("#smallView", {
          transform: "translateX(-100%)",
          // x: "-100%",
          opacity: 0,
          duration: 0.5,
        })
        .to(
          "#largeView",
          {
            transform: "translateX(-100%)",
            // x: "-100%",
            opacity: 1,
          },
          "<"
        )
        .to(largeModelRef.current.rotation, {
          y: rotationAmount,
          x: 0,
          z: 0,
          duration: 1,
        });
    }

    return () => {
      timeline.kill();
    };
  }, [size, timeline]);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              idx={0}
              modelRef={smallModelRef}
              // gsapType="view1"
              // controlRef={cameraControlSmall}
              // setRotationState={setSmallRotation}
              item={model}
              size={"small"}
            />

            <ModelView
              idx={1}
              modelRef={largeModelRef}
              // gsapType="view2"
              // controlRef={cameraControlLarge}
              // setRotationState={setLargeRotation}
              item={model}
              size={"large"}
            />

            {/* <Canvas
              className="w-full h-full"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
            >
              <Lights />
              <group
                ref={smallModelRef}
                name={size}
                position={[0, 0, 0]}
                rotation={[0, rotationAmount, 0]}
              >
                <Suspense fallback="Loading...">
                  <IPhoneModel item={model} scale={[0.2, 0.2, 0.2]} />
                </Suspense>
              </group>
              <group
                ref={largeModelRef}
                name={size}
                position={[shiftX, 0, 0]}
                rotation={[0, rotationAmount, 0]}
              >
                <Suspense>
                  <IPhoneModel item={model} scale={[0.3, 0.3, 0.3]} />
                </Suspense>
              </group>
            </Canvas> */}

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModelIdx(i)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
