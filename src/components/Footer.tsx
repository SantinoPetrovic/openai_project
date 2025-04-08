import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-10 border-t">
      <p>© {new Date().getFullYear()} OpenAI project</p>
    </footer>
  );
};

export default Footer;