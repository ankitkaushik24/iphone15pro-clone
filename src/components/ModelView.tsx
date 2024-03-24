import { OrbitControls, View } from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from "./Lights";
import IPhoneModel from "./IPhoneModel";

const rotationAmount = 2.5;
const shiftX = 20;

function ModelView({ item, modelRef, size, idx }) {
  return (
    <View
      className="absolute h-full w-full"
      style={{ left: `${idx * 100}%` }}
      id={size + "View"}
    >
      <Lights />
      <OrbitControls
        makeDefault
        rotateSpeed={0.4}
        enableZoom={false}
        enablePan={false}
      />
      <group
        ref={modelRef}
        name={size}
        // position={[shiftX, 0, 0]}
        rotation={[0, rotationAmount, 0]}
      >
        <Suspense fallback="Loading...">
          <IPhoneModel
            item={item}
            scale={size === "small" ? [0.25, 0.25, 0.25] : [0.32, 0.32, 0.32]}
          />
        </Suspense>
      </group>
    </View>
  );
}

// const MemoModelView = React.memo(ModelView);

export default ModelView;
