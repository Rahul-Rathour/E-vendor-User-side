import React, { useEffect, useState } from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import api from "../../../api";

const FooterBottom = () => {
  const [siteTitle, setSiteTitle] = useState("");

  useEffect(() => {
    api.get("/home-setting")
      .then(res => {
        if (res.data?.title) {
          setSiteTitle(res.data.title);   // Save title in state
        }
      })
      .catch(err => {
        console.error("Footer home-setting error:", err);
      });
  }, []);

  return (
    <div className="w-full bg-[#F5F5F3] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-20">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright /> 
          </span>

          {/* Use the fetched title here */}
          Copyright 2022 | {siteTitle || "Shopping"} | All Rights Reserved |

          <a href="https://swapdigit.com/" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium group-hover:text-primeColor">
              Powered by {siteTitle}
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
