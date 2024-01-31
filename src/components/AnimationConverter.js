import * as THREE from 'three';

const MIXAMO_MAP = {
    Hips: "mixamorigHips",
    LeftUpLeg: "mixamorigLeftUpLeg",
    LeftLeg: "mixamorigLeftLeg",
    LeftFoot: "mixamorigLeftFoot",
    LeftToeBase: "mixamorigLeftToeBase",
    RightUpLeg: "mixamorigRightUpLeg",
    RightLeg: "mixamorigRightLeg",
    RightFoot: "mixamorigRightFoot",
    RightToeBase: "mixamorigRightToeBase",
    Spine: "mixamorigSpine",
    Spine1: "mixamorigSpine1",
    Spine2: "mixamorigSpine2",
    Neck: "mixamorigNeck",
    Head: "mixamorigHead",
    LeftShoulder: "mixamorigLeftShoulder",
    LeftArm: "mixamorigLeftArm",
    LeftForeArm: "mixamorigLeftForeArm",
    LeftHand: "mixamorigLeftHand",
    RightShoulder: "mixamorigRightShoulder",
    RightArm: "mixamorigRightArm",
    RightForeArm: "mixamorigRightForeArm",
    RightHand: "mixamorigRightHand",
    LeftHandIndex1: "mixamorigLeftHandIndex1",
    RightHandIndex1: "mixamorigRightHandIndex1"
}

const MANNEQUIN_MAP = {
    Hips: "hips",
    LeftUpLeg: "leftUpLeg",
    LeftLeg: "leftLeg",
    LeftFoot: "leftFoot",
    LeftToeBase: "leftToeBase",
    RightUpLeg: "rightUpLeg",
    RightLeg: "rightLeg",
    RightFoot: "rightFoot",
    RightToeBase: "rightToeBase",
    Spine: "spine",
    Spine1: "spine1",
    Spine2: "spine2",
    Neck: "neck",
    Head: "head",
    LeftShoulder: "leftShoulder",
    LeftArm: "leftArm",
    LeftForeArm: "leftForeArm",
    LeftHand: "leftHand",
    RightShoulder: "rightShoulder",
    RightArm: "rightArm",
    RightForeArm: "rightForeArm",
    RightHand: "rightHand",
    LeftHandIndex1: "leftHandIndex1",
    RightHandIndex1: "rightHandIndex1"
}

const createAnimationClip = (jsonData) => {
    const tracks = [];
    const fps = jsonData.output.fps;
    const firstKey = Object.keys(jsonData.output.data)[0];
    const bonesData = jsonData.output.data[firstKey];
  
    for (const boneName in bonesData) {
        const boneData = bonesData[boneName];
        const positionTimes = [];
        const positionValues = [];
        const quaternionTimes = [];
        const quaternionValues = [];
    
        // 위치 데이터 처리
        if (boneData['position.x']) {
          for (let i = 0; i < boneData['position.x'].length; i++) {
            positionTimes.push(i / fps);
            positionValues.push(
              boneData['position.x'][i][i.toString()],
              boneData['position.y'][i][i.toString()],
              boneData['position.z'][i][i.toString()]
            );
          }
          tracks.push(new THREE.VectorKeyframeTrack(`${MIXAMO_MAP[boneName]}.position`, positionTimes, positionValues));
        }
    
        // 회전 데이터 처리
        if (boneData['quaternionRotation.x']) {
          for (let i = 0; i < boneData['quaternionRotation.x'].length; i++) {
            quaternionTimes.push(i / fps);
            quaternionValues.push(
              boneData['quaternionRotation.x'][i][i.toString()],
              boneData['quaternionRotation.y'][i][i.toString()],
              boneData['quaternionRotation.z'][i][i.toString()],
              boneData['quaternionRotation.w'][i][i.toString()]
            );
          }
          tracks.push(new THREE.QuaternionKeyframeTrack(`${MIXAMO_MAP[boneName]}.quaternion`, quaternionTimes, quaternionValues));
        }
      }

    return new THREE.AnimationClip(jsonData.output.filename, -1, tracks);
}

export default createAnimationClip;