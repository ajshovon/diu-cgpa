const Loader = ({ darkMode }) => {
  return (
    <div className={`flex h-[100vh] ${darkMode == 'light' ? 'bg-white' : 'bg-[#111827]'} items-center justify-center p-5 min-w-screen`}>
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-primary-600 dark:bg-primary-600 rounded-full" />
        <div className="w-3 h-3 bg-primary-600 dark:bg-primary-600 rounded-full" />
        <div className="w-3 h-3 bg-primary-600 dark:bg-primary-600 rounded-full" />
      </div>
    </div>
  );
};

export default Loader;
