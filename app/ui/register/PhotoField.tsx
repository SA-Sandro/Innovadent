"use client";

import { ErrorState, FormFieldProps } from "@/lib/definitions";
import { checkPhoto } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function PhotoPreviewer({
  errors,
  setErrors,
}: FormFieldProps) {
  const [photoPreview, setPhotoPreview] = useState("/images/default.png");

  const changePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = event.target.files![0];

    const photoErrors = checkPhoto(selectedFile);
    if (photoErrors === null) {
      reader.readAsDataURL(selectedFile);
      setErrors((prevErrors: ErrorState) => ({
        ...prevErrors,
        imageErrors: [],
      }));
    } else {
      setErrors((prevErrors: ErrorState) => ({
        ...prevErrors,
        imageErrors: photoErrors,
      }));
      setPhotoPreview("/images/default.png");
    }

    reader.onload = (readerEvent) => {
      setPhotoPreview(readerEvent.target?.result as string);
    };
  };

  return (
    <div>
      <div className="flex space-x-2 justify-center items-center">
        <input
          name="image_url"
          type="file"
          className="text-gray-800 bg-white border py-5 px-2 border-gray-300 w-full text-sm  rounded-md outline-blue-500 cursor-pointer"
          onChange={changePhoto}
        />
        <Image
          src={photoPreview}
          width={50}
          height={50}
          alt="Foto de perfil"
          className="w-16 h-16 rounded-full"
        />
      </div>
      {errors.imageErrors.length > 0 && (
        <div>
          {errors.imageErrors.map((error, index) => (
            <label key={index} className="text-xs font-mono text-red-500">
              {error}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
