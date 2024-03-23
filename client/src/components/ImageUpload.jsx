import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const ImageUpload = ({ formData, setFormData }) => {
  const [image, setImage] = useState("");
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, imageUrl: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if(image){
        handleFileUpload(image)
    }
  }, [image])

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="mb-4 mt-6 border-b-2 border-gray-500 pb-6">
      <div className="text-2xl mb-6">
        <p>Upload cover image of the restaurant</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="imageUpload"
          className="cursor-pointer bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
        >
          Choose File
        </label>
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          onChange={handleChange}
        />
        {image && (
          <div>
            <p className="font-semibold my-6">
              {imageError ? (
                <span className="text-red-700">
                  Error Uploading Image (Image should be less than 2 MB)
                </span>
              ) : imagePercentage > 0 && imagePercentage < 100 ? (
                <span className="text-yellow-500">{`Uploading ${imagePercentage}%`}</span>
              ) : imagePercentage === 100 ? (
                <span className="text-green-500">Image uploaded</span>
              ) : (
                ""
              )}
            </p>
            <img src={formData.imageUrl} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
