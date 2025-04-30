const AuthForm = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{title}</h2>
      <p className="text-center text-gray-500 mb-6">{subtitle}</p>
      {children}
    </div>
  );
};

export default AuthForm;
