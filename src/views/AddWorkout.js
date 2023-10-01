import React, { useState, useRef } from "react";
import "./styles/workoutAdd.scss";
import iconS from './static/image-regular.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const AddWorkoutPopup = ({ onClose }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [workoutName, setWorkoutName] = useState("Workout Name");
  const [tags, setTags] = useState([]);
  const imageContainerRef = useRef(null);
  const tagInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        resizeAndDisplayImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        resizeAndDisplayImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeAndDisplayImage = (imageData) => {
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      const maxWidth = imageContainerRef.current.clientWidth;
      const maxHeight = imageContainerRef.current.clientHeight;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height *= ratio;
      }

      if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width *= ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImageData = canvas.toDataURL("image/jpeg");
      setUploadedImage(resizedImageData);
    };
  };


  return (
    <div className="add-workout-popup">
      <div className="popup-content">
        <h2 className="create">Create/Edit workout</h2>
        <br />
        <div
          className="table-container"
          ref={imageContainerRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <table className="form-table">
            <tbody>
              <tr>
                <td className="form-group" colSpan="2">
                  <input
                    type="text"
                    id="workout-name"
                    className="centered-label"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="form-group" colSpan="2">
                  <label
                    htmlFor="image-upload"
                    className="image-containerc upload-label"
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    ) : (
                      <React.Fragment>
                        <img
                          src={iconS}
                          alt="Drag and drop icon"
                          className="drag-and-drop-icon"
                        />
                        <span className="drag-and-drop-label">
                          Drag and drop or click to upload
                        </span>
                      </React.Fragment>
                    )}
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </td>
              </tr>
              <tr>
                <td className="form-group" colSpan="2">
                  <label htmlFor="workout-description">Workout Description</label>
                  <textarea id="workout-description"></textarea>
                </td>
              </tr>
              <tr>
                <td className="form-group" colSpan="2">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-group">
          <button className="add-exercise-button"><FontAwesomeIcon icon={faPlus} className="tag-plus-icon" />Add Exercise</button>
          <button className="save-button">Save</button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutPopup;
