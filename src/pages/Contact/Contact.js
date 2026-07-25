import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import api from "../../api";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("Home"); // default fallback
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      setPrevLocation("Home");
    }
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================================================

  const handlePost = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!clientName) {
      setErrClientName("Enter your Name");
      isValid = false;
    }

    if (!email) {
      setErrEmail("Enter your Email");
      isValid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a Valid Email");
      isValid = false;
    }

    if (!messages) {
      setErrMessages("Enter your Messages");
      isValid = false;
    }

    if (isValid) {
      try {
        setLoading(true);
        const response = await api.post("/contact", {
          name: clientName,
          email: email,
          message: messages
        })

        if (response.data.status) {
          setSuccessMsg(
            `Thank you dear ${clientName}, your message has been received successfully. Further details will be sent to your email at ${email}.`
          );
          setclientName("");
          setEmail("");
          setMessages("");
        }
      }
      catch (error) {
        if (error.response?.status === 422) {
          const errors = error.response.data.errors;

          setErrClientName(errors?.name?.[0] || "");
          setErrEmail(errors?.email?.[0] || "");
          setErrMessages(errors?.message?.[0] || "");
        } else {
          setSuccessMsg("");
          alert("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }

    }
  };

 return (
  <div className="max-w-container mx-auto px-4 min-h-screen bg-gray-50 overflow-x-hidden">
    <Breadcrumbs title="Contact" prevLocation={prevLocation} />

    {successMsg ? (
      <p className="pb-20 w-full max-w-md font-medium text-green-500">
        {successMsg}
      </p>
    ) : (
      <form className="pb-20" onSubmit={handlePost}>
        <h1 className="font-titleFont font-semibold text-2xl md:text-3xl">
          Fill up a Form
        </h1>

        <div className="w-full max-w-[500px] h-auto py-6 flex flex-col gap-6">
          {/* Name Field */}
          <div>
            <p className="text-base font-titleFont font-semibold px-2">
              Name
            </p>
            <input
              onChange={handleName}
              value={clientName}
              className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              type="text"
              placeholder="Enter your name here"
            />
            {errClientName && (
              <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                <span className="text-sm italic font-bold">!</span>
                {errClientName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <p className="text-base font-titleFont font-semibold px-2">
              Email
            </p>
            <input
              onChange={handleEmail}
              value={email}
              className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              type="email"
              placeholder="Enter your email here"
            />
            {errEmail && (
              <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                <span className="text-sm italic font-bold">!</span>
                {errEmail}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <p className="text-base font-titleFont font-semibold px-2">
              Messages
            </p>
            <textarea
              onChange={handleMessages}
              value={messages}
              cols="30"
              rows="3"
              className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
              placeholder="Enter your message here"
            />
            {errMessages && (
              <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                <span className="text-sm italic font-bold">!</span>
                {errMessages}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Post"}
          </button>
        </div>
      </form>
    )}
  </div>
);
};

export default Contact;
