import { useParams } from "react-router-dom";

const Chat = () => {
  console.log('hi');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200 px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl lg:text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
          Chat
        </h1>
      </div>
    </div>
  );
};

export default Chat;