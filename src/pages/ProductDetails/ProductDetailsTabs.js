import React, { useMemo, useState } from "react";
import parse from "html-react-parser";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const ProductDetailsTabs = ({ productInfo }) => {
  const [activeTab, setActiveTab] = useState("specification");
  const [open, setOpen] = useState(true);

  // Convert HTML into Key : Value pairs
  const parseSpecification = (content) => {
    if (!content) return [];

    // If content contains HTML tags
    if (/<[a-z][\s\S]*>/i.test(content)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");

      const rows = [];

      // Handle <p>Key: Value</p>
      doc.querySelectorAll("p").forEach((p) => {
        const text = p.textContent.trim();

        if (!text) return;

        const colonIndex = text.indexOf(":");

        if (colonIndex !== -1) {
          const key = text.substring(0, colonIndex).trim();
          const value = text.substring(colonIndex + 1).trim();

          if (key && value) {
            rows.push({
              key,
              value,
            });
          }
        }
      });

      return rows;
    }

    // Handle plain text
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const colonIndex = line.indexOf(":");

        if (colonIndex === -1) {
          return {
            key: "",
            value: line,
          };
        }

        return {
          key: line.substring(0, colonIndex).trim(),
          value: line.substring(colonIndex + 1).trim(),
        };
      })
      .filter((item) => item.key && item.value);
  };

  const specifications = useMemo(
    () => parseSpecification(productInfo.specification),
    [productInfo.specification]
  );

  const manufacturers = useMemo(
    () => parseSpecification(productInfo.manufacturing_details),
    [productInfo.manufacturing_details]
  );

  return (
    <div className="mt-10 bg-white rounded-xl border shadow-sm">

      {/* Header */}

      <div
        className="flex items-center justify-between px-6 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-2xl font-bold text-gray-800">
          All Details
        </h2>

        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {open && (
        <>
          {/* Tabs */}

          <div className="flex flex-wrap gap-3 px-6 pb-6">

            <button
              onClick={() => setActiveTab("specification")}
              className={`px-5 py-2 rounded-lg border transition-all font-medium ${activeTab === "specification"
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-300 hover:border-black"
                }`}
            >
              Specifications
            </button>

            <button
              onClick={() => setActiveTab("manufacturer")}
              className={`px-5 py-2 rounded-lg border transition-all font-medium ${activeTab === "manufacturer"
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-300 hover:border-black"
                }`}
            >
              Manufacturer Info
            </button>

            {productInfo.description && (
              <button
                onClick={() => setActiveTab("description")}
                className={`px-5 py-2 rounded-lg border transition-all font-medium ${activeTab === "description"
                    ? "bg-black text-white border-black"
                    : "bg-white border-gray-300 hover:border-black"
                  }`}
              >
                Description
              </button>
            )}
          </div>

          <div className="px-6 pb-8">

            {/* Specification */}

            {activeTab === "specification" && (
              <>
                {specifications.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">

                    {specifications.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b py-4 gap-5"
                      >
                        <span className="text-gray-500 font-medium w-1/2">
                          {item.key}
                        </span>

                        <span className="text-gray-900 font-semibold w-1/2 text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p>No specifications available.</p>
                )}
              </>
            )}

            {/* Manufacturer */}

            {activeTab === "manufacturer" && (
              <>
                {manufacturers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">

                    {manufacturers.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b py-4 gap-5"
                      >
                        <span className="text-gray-500 font-medium w-1/2">
                          {item.key}
                        </span>

                        <span className="text-gray-900 font-semibold w-1/2 text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p>No manufacturer details available.</p>
                )}
              </>
            )}

            {/* Description */}

            {activeTab === "description" && (
              <div className="prose max-w-none">
                {parse(productInfo.description)}
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsTabs;