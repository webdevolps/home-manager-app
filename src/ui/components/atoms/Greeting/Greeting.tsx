import React from 'react';

interface GreetingProps {
  name?: string;
}

const Greeting: React.FC<GreetingProps> = ({ name = 'User' }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-gray-200 hover:scale-105 transition-transform duration-300">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Hello, {name}!</div>
        <p className="text-slate-500">Welcome to your Home Manager App.</p>
      </div>
    </div>
  );
};

export default Greeting;
