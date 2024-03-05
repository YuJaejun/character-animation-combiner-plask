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
    const bonesData =jsonData.output.data;
    console.log(bonesData)

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
        track = new THREE.VectorKeyframeTrack(`${MIXAMO_MAP[boneName]}.position`, frameTimes, values);
      } else if (bone.property === 'rotationQuaternion') {
        track = new THREE.QuaternionKeyframeTrack(`${MIXAMO_MAP[boneName]}.quaternion`, frameTimes, values);
      }

      if(track) {
        tracks.push(track);
      }
    });

    
  
    // for (const boneName in bonesData) {
    //     const boneData = bonesData[boneName];
    //     const positionTimes = [];
    //     const positionValues = [];
    //     const quaternionTimes = [];
    //     const quaternionValues = [];
    
    //     // 위치 데이터 처리
    //     if (boneData['position.x']) {
    //       for (let i = 0; i < boneData['position.x'].length; i++) {
    //         positionTimes.push(i / fps);
    //         positionValues.push(
    //           boneData['position.x'][i][i.toString()],
    //           boneData['position.y'][i][i.toString()],
    //           boneData['position.z'][i][i.toString()]
    //         );
    //       }
    //       tracks.push(new THREE.VectorKeyframeTrack(`${MIXAMO_MAP[boneName]}.position`, positionTimes, positionValues));
    //     }
    
    //     // 회전 데이터 처리
    //     if (boneData['quaternionRotation.x']) {
    //       for (let i = 0; i < boneData['quaternionRotation.x'].length; i++) {
    //         quaternionTimes.push(i / fps);
    //         quaternionValues.push(
    //           boneData['quaternionRotation.x'][i][i.toString()],
    //           boneData['quaternionRotation.y'][i][i.toString()],
    //           boneData['quaternionRotation.z'][i][i.toString()],
    //           boneData['quaternionRotation.w'][i][i.toString()]
    //         );
    //       }
    //       tracks.push(new THREE.QuaternionKeyframeTrack(`${MIXAMO_MAP[boneName]}.quaternion`, quaternionTimes, quaternionValues));
    //     }
    //   }
    
    return new THREE.AnimationClip(jsonData.fileName, -1, tracks);
}

export default createAnimationClip;