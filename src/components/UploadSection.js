import React from "react";
import UploadButton from "./UploadButton";
import ClientButton from "./PlaskClient";

const UploadSection = ({ onMainModelUpload, onAnimationUpload }) => {
  return (
    <ul className="collection with-header ">
      <li className="collection-header grey darken-3 white-text">
        <h5>Upload File with Character </h5>
        <p>(.fbx / .gltf /.glb)</p>
        <UploadButton onUpload={onMainModelUpload} accept=".fbx,.gltf,.glb" />
      </li>
      <li className="collection-header grey darken-3 white-text">
        <h5>Upload Animations (.fbx)</h5>
        <UploadButton
          onUpload={onAnimationUpload}
          multiple={true}
          accept=".fbx"
        />
      </li>
      <li className="collection-header grey darken-3 white-text">
        <h5>Plask sdk request</h5>
        <ClientButton />
      </li>
    </ul>
  );
};

export default UploadSection;
