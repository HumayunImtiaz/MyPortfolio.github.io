import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import ContactLeft from "./ContactLeft";
import Title from "./Title.tsx";
import { FadeIn } from "./FadeIn";

// ========== EmailJS Configuration ===========
// You MUST set these after creating your EmailJS account
const EMAILJS_SERVICE_ID = "service_6h1rauq";
const EMAILJS_TEMPLATE_ID = "template_w385kbw";
const EMAILJS_PUBLIC_KEY = "OIy-CCJE0LrrIAhcy"; // Replace with your EmailJS public key
// =============================================

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ========== Email Validation start here ==============
  const emailValidation = (email: string) => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };
  // ========== Email Validation end here ================

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (username === "") {
      setErrMsg("Username is required!");
    } else if (phoneNumber === "") {
      setErrMsg("Phone number is required!");
    } else if (email === "") {
      setErrMsg("Please give your Email!");
    } else if (!emailValidation(email)) {
      setErrMsg("Give a valid Email!");
    } else if (subject === "") {
      setErrMsg("Please give your Subject!");
    } else if (message === "") {
      setErrMsg("Message is required!");
    } else {
      setLoading(true);
      setErrMsg("");
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form.current!,
          EMAILJS_PUBLIC_KEY
        );
        setSuccessMsg(
          `Thank you dear ${username}, Your message has been sent successfully!`
        );
        setUsername("");
        setPhoneNumber("");
        setEmail("");
        setSubject("");
        setMessage("");
      } catch (error) {
        console.error("EmailJS Error:", error);
        setErrMsg("Failed to send message. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <section
      id="contact"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title title="CONTACT" des="Contact With Me" />
        </div>
        <div className="w-full">
          <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
            <ContactLeft />
            <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#0B1120] to-[#0B1120] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
              <form
                ref={form}
                className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5"
              >
                {errMsg && (
                  <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                    {errMsg}
                  </p>
                )}
                {successMsg && (
                  <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                    {successMsg}
                  </p>
                )}
                <div className="w-full flex flex-col lgl:flex-row gap-10">
                  <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      Your name
                    </p>
                    <input
                      name="user_name"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      className={`${errMsg === "Username is required!" &&
                        "outline-designColor"
                        } contactInput`}
                      type="text"
                    />
                  </div>
                  <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      Phone Number
                    </p>
                    <input
                      name="user_phone"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      className={`${errMsg === "Phone number is required!" &&
                        "outline-designColor"
                        } contactInput`}
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Email
                  </p>
                  <input
                    name="user_email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={`${errMsg === "Please give your Email!" &&
                      "outline-designColor"
                      } contactInput`}
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Subject
                  </p>
                  <input
                    name="subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    className={`${errMsg === "Please give your Subject!" &&
                      "outline-designColor"
                      } contactInput`}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Message
                  </p>
                  <textarea
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className={`${errMsg === "Message is required!" && "outline-designColor"
                      } contactTextArea`}
                    cols={30}
                    rows={8}
                  ></textarea>
                </div>
                <div className="w-full">
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-gray-600 border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {errMsg && (
                  <p className="py-3 bg-gradient-to-r from-[#141518] to-[#141518] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                    {errMsg}
                  </p>
                )}
                {successMsg && (
                  <p className="py-3 bg-gradient-to-r from-[#141518] to-[#141518] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                    {successMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Contact;
