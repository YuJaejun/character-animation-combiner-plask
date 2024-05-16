import * as THREE from 'three';

const MIXAMO_MAP = {
  hips: "mixamorigHips",
  leftUpLeg: "mixamorigLeftUpLeg",
  leftLeg: "mixamorigLeftLeg",
  leftFoot: "mixamorigLeftFoot",
  leftToeBase: "mixamorigLeftToeBase",
  rightUpLeg: "mixamorigRightUpLeg",
  rightLeg: "mixamorigRightLeg",
  rightFoot: "mixamorigRightFoot",
  rightToeBase: "mixamorigRightToeBase",
  spine: "mixamorigSpine",
  spine1: "mixamorigSpine1",
  spine2: "mixamorigSpine2",
  neck: "mixamorigNeck",
  head: "mixamorigHead",
  leftShoulder: "mixamorigLeftShoulder",
  leftArm: "mixamorigLeftArm",
  leftForeArm: "mixamorigLeftForeArm",
  leftHand: "mixamorigLeftHand",
  rightShoulder: "mixamorigRightShoulder",
  rightArm: "mixamorigRightArm",
  rightForeArm: "mixamorigRightForeArm",
  rightHand: "mixamorigRightHand",
  leftHandIndex1: "mixamorigLeftHandIndex1",
  rightHandIndex1: "mixamorigRightHandIndex1"
}

const createAnimationClip = (jsonData) => {
    const tracks = [];
    const fps = jsonData.output.fps;
    const bonesData = jsonData.output.data;
    console.log(bonesData)

    if (Array.isArray(bonesData)) {
      bonesData.forEach((bone) => {
        console.log(bone)
        const boneName = bone.name;
        if (!boneName) return;
        const frameTimes = [];
        const values = [];
        console.log(boneName, bone.property, bone.keyframes.length)
        bone.keyframes.forEach(keyframe => {
            const frameTime = keyframe.frame / fps;
            frameTimes.push(frameTime);

            // Flatten the value array for position or quaternion
            keyframe.value.forEach(value => {
                values.push(value);
            });
        });

        let track
        if (bone.property === 'position') {
          // value * 100
          track = new THREE.VectorKeyframeTrack(`${MIXAMO_MAP[boneName]}.position`, frameTimes, values.map(v => v * 100));
        } else if (bone.property === 'rotationQuaternion') {
          track = new THREE.QuaternionKeyframeTrack(`${MIXAMO_MAP[boneName]}.quaternion`, frameTimes, values);
        }

        if(track) {
          tracks.push(track);
        }
      });
      
      return [new THREE.AnimationClip(jsonData.fileName, -1, tracks)];
    } else if (typeof bonesData === 'object') {
      //각 Key를 fileName 앞에 붙여주고 value마다 AnimationClip을 만들어서 리턴
      const clips = [];
      for (const key in bonesData) {
        const boneData = bonesData[key];
        const fileName = key + '_' + jsonData.fileName;
        const clip = createAnimationClip({fileName: fileName, output: {fps: jsonData.output.fps, data: boneData}});
        clips.push(clip[0]);
      }
      return clips;
    }
}

export default createAnimationClip;