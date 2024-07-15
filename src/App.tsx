import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { BsImages } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import api from "./utils/api";
import AIResult from "./components/AIResult";
import HomeBanner from "./components/banners/HomeBanner";
import AddImageURLModal from "./components/AddImageURLModal";
import ImagesToSearch from "./components/ImagesToSearch";

const App = () => {
  const { listening, transcript, start, stop, isTranscribed, resetTranscript } =
    useSpeechRecognition();
  const [textToSearch, setTextToSearch] = useState("");
  const [showAddImageURLModal, setShowAddImageURLModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: () =>
      api.post("/assisstant/ask", {
        text: textToSearch,
        imageUrls: images.filter(Boolean),
      }),
  });

  useEffect(() => {
    if (transcript) {
      setTextToSearch(transcript);
    }
  }, [transcript]);

  const handleSearch = () => {
    if (!textToSearch) return;
    mutateAsync().then(() => {
      setTextToSearch("");
      resetTranscript();
    });
  };

  useEffect(() => {
    if (isTranscribed) handleSearch();
  }, [isTranscribed]);

  const handleTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTextToSearch(e.target.value);
  };

  const handleKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if ("key" in e && e.key === "Enter") handleSearch();
  };

  const handleAddImageURL = (url: string) => {
    setImages([...(images || []), url]);
  };

  const handleRemoveImageURL = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col gap-2 h-full`}>
      <HomeBanner />
      <div className="flex w-full drop-shadow-md justify-center px-2">
        <div className="flex relative gap-3 w-full items-center max-w-[900px] -mt-7 bg-white py-2 px-4 rounded-full">
          <div>
            <FiSearch size={24} />
          </div>
          <input
            onKeyDown={handleKeyboard}
            value={textToSearch}
            onChange={handleTextSearch}
            placeholder="Ask me something..."
            type="text"
            className="py-1 px-2 flex-1 bg-transparent outline-none"
          />
          <button onClick={listening ? stop : start}>
            {listening ? <IoMdMic size={24} /> : <IoMdMicOff size={24} />}
          </button>
          <button onClick={() => setShowAddImageURLModal(true)}>
            <BsImages size={24} />
          </button>
        </div>
      </div>
      <ImagesToSearch
        imageUrls={images}
        onRemoveImageURL={handleRemoveImageURL}
      />

      <div className="p-5 my-5 flex justify-center flex-1">
        <AIResult {...rest} data={rest.data?.data} />
      </div>
      <footer className="flex flex-col items-center text-sm text-slate-400 bg-slate-900 p-2">
        <div>Developed by Marvin Ronquillo</div>
        <div>© 2024. All rights reserved.</div>
      </footer>
      {showAddImageURLModal && (
        <AddImageURLModal
          onClose={() => setShowAddImageURLModal(false)}
          onAddURL={handleAddImageURL}
        />
      )}
    </div>
  );
};

export default App;
