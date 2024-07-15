import { BsRobot } from "react-icons/bs";
import { Bounce, toast } from "react-toastify";

type Props = {
  data: string;
  isPending: boolean;
  isIdle: boolean;
  isError: boolean;
};

const AIResult = ({ isIdle, data, isPending, isError }: Props) => {
  if (isIdle) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <BsRobot size={32} />
        <p className="text-center text-gray-500">Results will appear here</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <BsRobot size={32} className="text-yellow-700" />
        <p className="text-center text-gray-500">Generating results...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <BsRobot size={32} className="text-red-700" />
        <p className="text-center text-gray-500">Oh no! Something went wrong</p>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast("Copied to clipboard", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const formatMessage = (message: string) => {
    const codeRegex = /```([\s\S]*?)```/g;

    if (!codeRegex.test(message)) return <span>{message}</span>;

    const parts = message.split(codeRegex);

    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>;
      }

      const codeTitle = part.substring(0, part.indexOf("\n"));
      const codeContent = part.substring(part.indexOf("\n") + 1).trim();

      return (
        <div
          key={index}
          className="bg-slate-800 text-white rounded-md overflow-hidden"
        >
          <div className="text-sm p-3 flex justify-between text-white bg-slate-900">
            <span className="font-medium">{codeTitle}</span>
            <button onClick={() => copyToClipboard(codeContent)}>
              Copy Code
            </button>
          </div>
          <div className="p-3 text-sm">
            <code>{codeContent}</code>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex w-full flex-col gap-2 items-center">
      <BsRobot size={32} className="text-blue-700" />
      <div className="max-w-[900px] w-full text-gray-500 whitespace-pre-wrap bg-white p-3 rounded-md">
        {formatMessage(data)}
      </div>
    </div>
  );
};

export default AIResult;
