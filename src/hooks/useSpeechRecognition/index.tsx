import { useEffect, useState } from "react";

type Props = {
  continious: boolean;
  interimResults: boolean;
  lang: string;
  silenceTimeout: number;
};

export const speechRecognitionDefaultValues: Props = {
  continious: true,
  interimResults: true,
  lang: "en-US",
  silenceTimeout: 1000,
};

const useSpeechRecognition = ({
  continious,
  interimResults,
  lang,
  silenceTimeout,
}: Props = speechRecognitionDefaultValues) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isTranscribed, setIsTranscribed] = useState(false);
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.continuous = continious;
  recognition.interimResults = interimResults;
  recognition.lang = lang;

  let silenceTimer: NodeJS.Timeout; // Timer to track silence

  // Handle speech recognition result
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;

    setTranscript(result);
    resetSilenceTimer(); // Reset timer on every result
  };

  // Start speech recognition
  const start = async () => {
    try {
      setIsTranscribed(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Close the stream after checking

      recognition.start();
      setListening(true);
    } catch (err) {
      alert("Microphone not available or permission denied.");
      setListening(false);
    }
  };

  // Stop speech recognition
  const stop = () => {
    recognition.stop();
    setListening(false);
  };

  // Reset transcript
  const resetTranscript = () => setTranscript("");

  // Reset silence timer function
  const resetSilenceTimer = () => {
    clearTimeout(silenceTimer); // Clear existing timer
    silenceTimer = setTimeout(() => {
      recognition.stop(); // Stop recognition after 1 second of silence
      setListening(false);
      setIsTranscribed(true);
    }, silenceTimeout); // Adjust timeout duration as needed (e.g., 1000ms for 1 second)
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      recognition.stop(); // Stop recognition when component unmounts
      clearTimeout(silenceTimer); // Clear the silence timer
    };
  }, []);

  return {
    listening,
    transcript,
    start,
    stop,
    resetTranscript,
    resetSilenceTimer,
    isTranscribed,
  };
};

export default useSpeechRecognition;
