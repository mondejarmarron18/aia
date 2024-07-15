import { ChangeEvent, useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  onClose: () => void;
  onAddURL: (url: string) => void;
};

const AddImageURLModal = ({ onClose, onAddURL }: Props) => {
  const [url, setUrl] = useState("");

  const handleAddURL = () => {
    onAddURL(url);
    onClose();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="bg-[rgba(0,0,0,0.5)] flex justify-center items-center h-full w-full fixed p-3">
      <div className="bg-white w-full max-w-[500px] rounded-md">
        <div className="font-semibold  px-5 py-4 border-b flex justify-between items-center">
          Add Image{" "}
          <button className="cursor-pointer">
            <IoClose size={24} onClick={onClose} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <div className="text-xs text-center">
            Please ensure that you provide a complete URL of the image. The
            image format should be either JPEG, PNG or WEBP for proper
            processing.
          </div>
          <input
            value={url}
            onChange={handleOnChange}
            type="text"
            className="w-full rounded-md p-3 outline-none border"
          />
          <button
            onClick={handleAddURL}
            className="w-full p-3 bg-slate-800 rounded-md hover:bg-slate-700 text-white"
          >
            Add URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImageURLModal;
