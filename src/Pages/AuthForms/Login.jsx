import React, { useState } from 'react';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted with:', formData);
    // Here you would typically handle authentication
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div className="absolute inset-0 "></div>
        <img
          src="/Car.jpg"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="relative  z-10 flex flex-col justify-center items-center text-black  font-bold  w-full ">
          <h1 className="text-7xl font-bold mb-4 shadow-2xl shadow-black ">Welcome Back</h1>
          <p className="text-2xl max-w-md text-center text-bold text-white ">
            Log in to access your account and continue your journey with us.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-600 mt-2">Please enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-500 hover:text-green-800 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2  focus:ring-blue-600 focus:border-transparent shadow-sm transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>


            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>



          <div className="mt-6 text-center">

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;