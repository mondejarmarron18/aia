import backgroundImage from "../../../assets/images/background.jpg";

const HomeBanner = () => {
  return (
    <div className="h-[450px] relative">
      <img
        src={backgroundImage}
        alt="background"
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="relative px-5 py-[100px] bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.8)] to-transparent w-full h-full flex flex-col text-center justify-center items-center text-white">
        <h1 className="text-4xl font-semibold mix-blend-screen">
          AI Assistant
        </h1>
        <p className="max-w-[800px] mix-blend-screen">
          AIA is your intelligent assistant for asking questions, analyzing
          images, comparing multiple images, and automatic speech-to-text
          transcription.
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
