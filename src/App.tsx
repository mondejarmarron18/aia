import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";

const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const start = () => {
    if (!isMicrophoneAvailable) {
      return alert("Microphone not available.");
    }

    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    resetTranscript();
  };

  return (
    <div>
      <h1>Speech Recognition</h1>
      <button
        onMouseDown={start}
        onTouchStart={start}
        onMouseUp={stop}
        onTouchEnd={stop}
      >
        {listening ? "🎙️ Listening" : "🔇 Muted"}
      </button>
      <button onClick={reset}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default App;
