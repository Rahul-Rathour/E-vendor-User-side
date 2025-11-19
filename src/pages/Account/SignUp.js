import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import api from "../../api"; // Keep your API instance

const SignUp = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  // State for errors and success
  const [error, setError] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Email validation helper
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  // Submit handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!checked) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    if (!name.trim()) newError.name = "Enter your name";
    if (!email.trim()) newError.email = "Enter your email";
    else if (!EmailValidation(email)) newError.email = "Enter a valid email";
    if (!phone.trim()) newError.phone = "Enter your phone number";
    if (!password.trim()) newError.password = "Enter your password";
    else if (password.length < 6)
      newError.password = "Password must be at least 6 characters";

    setError(newError);

    if (Object.keys(newError).length > 0) return;

    try {
      const res = await api.post("/create-user", {
        name,
        email,
        phone,
        password,
      });

      if (res.data.status) {
        setSuccessMsg(
          `Hello ${name}, your account has been created successfully! Please login to continue.`
        );
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setChecked(false);
      } else {
        setError({ general: res.data.message || "Registration failed." });
      }
    } catch (err) {
      setError({
        general: err?.response?.data?.error_message || err.message,
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      {/* LEFT SIDE PANEL */}
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>

          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Register quickly & easily
              </span>
              <br />
              Join our platform and start managing your account right away.
            </p>
          </div>

          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Secure and reliable
              </span>
              <br />
              Your information is encrypted and safely stored.
            </p>
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © OREBI
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
              tracking-wide hover:bg-black hover:text-white duration-300"
            >
              Login
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSignUp}
            className="w-full lgl:w-[500px] h-screen flex items-center justify-center"
          >
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>

              {/* Display General Error */}
              {error.general && (
                <p className="text-sm text-red-500 mb-2 font-semibold">
                  {error.general}
                </p>
              )}

              {/* Full Name */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Full Name
                </p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border border-gray-400 outline-none"
                />
                {error.name && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    {error.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-.5 mt-3">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-8 placeholder:text-sm px-4 text-base rounded-md border border-gray-400 outline-none"
                />
                {error.email && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    {error.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-.5 mt-3">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Phone
                </p>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="1234567890"
                  className="w-full h-8 placeholder:text-sm px-4 text-base rounded-md border border-gray-400 outline-none"
                />
                {error.phone && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    {error.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5 mt-3">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Create password"
                  className="w-full h-8 placeholder:text-sm px-4 text-base rounded-md border border-gray-400 outline-none"
                />
                {error.password && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    {error.password}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start mdl:items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                />
                <p className="text-sm text-primeColor">
                  I agree to the OREBI{" "}
                  <span className="text-blue-500">Terms of Service</span> and{" "}
                  <span className="text-blue-500">Privacy Policy</span>.
                </p>
              </div>

              <button
                type="submit"
                className={`${
                  checked
                    ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                    : "bg-gray-500 cursor-not-allowed"
                } w-full text-gray-200 text-base font-medium h-10 rounded-md mt-4 transition duration-300`}
              >
                Create Account
              </button>

              <p className="text-sm text-center font-titleFont font-medium mt-3">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="hover:text-blue-600 duration-300">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
