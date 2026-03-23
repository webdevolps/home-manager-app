const ExceptionPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page not found</p>
      <a href="/" className="mt-8 text-blue-400 hover:underline">Go back to Home</a>
    </div>
  );
};

export default ExceptionPage;
