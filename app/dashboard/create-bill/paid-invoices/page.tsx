"use client";

import React from "react";
import { useState } from "react";

const page = () => {
  const [invoiveNumber, setInvoiceNumber] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [tableContent, setTableContent] = useState(null);

  return (
    <div className=" flex flex-col justify-center ">
      <div className="m-4 pl-8 underline capitalize italic font-semibold">
        <h1 className="text-3xl">Get All Paid Invoices</h1>
      </div>
      <div className="flex items-center ml-8 gap-4 font-bold italic ">
        <div>
          <h1 className="text-2xl">
            Enter the Invoice Number or Customer Name
          </h1>

          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="INV-XXX"
          />
        </div>
        <div>
          <button
            onClick={() => {
              console.log(invoiveNumber);
            }} //for now
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit">
            Search
          </button>
        </div>
      </div>
      {/* // todo: table div */}
      <div></div>
    </div>
  );
};

export default page;
