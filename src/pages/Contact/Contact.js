import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import api from "../../api";

const Contact = () => {
  const location = useLocation();
  const [company, setCompany] = useState({});
  const [prevLocation, setPrevLocation] = useState("Home"); // default fallback
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      setPrevLocation("Home");
    }
  }, [location]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await api.get("/home-setting");
        setCompany(res.data || {});
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanyDetails();
  }, []);

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
    <div className="max-w-container mx-auto px-4 bg-gray-50 min-h-screen">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />

      {successMsg ? (
        <p className="pb-20 max-w-md text-green-600 font-medium">
          {successMsg}
        </p>
      ) : (
        <div className="pb-20">
          <h1 className="text-3xl font-titleFont font-bold mb-10">
            Get In Touch
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ================= Contact Form ================= */}

            <form onSubmit={handlePost}>
              <div className="bg-white rounded-lg shadow-md p-8">

                <h2 className="text-2xl font-semibold mb-6">
                  Send us a Message
                </h2>

                <div className="space-y-6">

                  {/* Name */}

                  <div>
                    <label className="block font-semibold mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      value={clientName}
                      onChange={handleName}
                      placeholder="Enter your name"
                      className="w-full border rounded-md p-3 outline-none focus:border-primeColor"
                    />

                    {errClientName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errClientName}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div>
                    <label className="block font-semibold mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={handleEmail}
                      placeholder="Enter your email"
                      className="w-full border rounded-md p-3 outline-none focus:border-primeColor"
                    />

                    {errEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errEmail}
                      </p>
                    )}
                  </div>

                  {/* Message */}

                  <div>
                    <label className="block font-semibold mb-2">
                      Message
                    </label>

                    <textarea
                      rows={5}
                      value={messages}
                      onChange={handleMessages}
                      placeholder="Write your message..."
                      className="w-full border rounded-md p-3 outline-none resize-none focus:border-primeColor"
                    />

                    {errMessages && (
                      <p className="text-red-500 text-sm mt-1">
                        {errMessages}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primeColor text-white px-8 py-3 rounded hover:bg-black duration-300 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                </div>
              </div>
            </form>

            {/* ================= Company Details ================= */}

            <div className="bg-white rounded-lg shadow-md p-8 h-fit">

              <h2 className="text-2xl font-semibold mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primeColor text-white flex items-center justify-center text-xl">
                    📍
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">
                      Address
                    </h4>

                    <p className="text-gray-600 leading-7">
                      {company.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primeColor text-white flex items-center justify-center text-xl">
                    📞
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">
                      Phone
                    </h4>

                    <a
                      href={`tel:${company.mobile}`}
                      className="text-gray-600 hover:text-primeColor"
                    >
                      {company.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primeColor text-white flex items-center justify-center text-xl">
                    ✉️
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">
                      Email
                    </h4>

                    <a
                      href={`mailto:${company.email}`}
                      className="text-gray-600 hover:text-primeColor"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                {company.website && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primeColor text-white flex items-center justify-center text-xl">
                      🌐
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        Website
                      </h4>

                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primeColor break-all"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
