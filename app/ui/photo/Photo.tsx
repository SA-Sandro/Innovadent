"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function PhotoPreviewer() {
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = event.target.files![0];

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent) => {
      setPhotoPreview(readerEvent.target?.result as string);
    };
  };

  return (
    <div className="flex space-x-2 justify-center items-center">
      <input
        name="photo"
        type="file"
        className="text-gray-800 bg-white border py-5 px-2 border-gray-300 w-full text-sm  rounded-md outline-blue-500 cursor-pointer"
        placeholder="Enter confirm password"
        onChange={changePhoto}
      />
      <Image
        src={`${photoPreview ? photoPreview : "/images/default.png"}`}
        width={50}
        height={50}
        alt="Foto de perfil"
        className="w-16 h-16 rounded-full"
      />
    </div>
  );
}
