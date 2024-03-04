"use client";
import React, { useState } from "react";
import QrScanner from "@/components/QrScanner";
import { useRouter } from "next/navigation";
import useToastStore from '@/store/ToastStore';

import QRCode from "qrcode.react";

const QrScannerForm = () => {
  const addToast = useToastStore((state) => state.addToast);

  const router = useRouter();
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const balls = (result) => {
    addToast({message: `QR code scanned successfully!: ${result}`, type: 'success'});
    router.push(`/dashboard/user/?id=${result}`);
  };

  const handleScan = (result, error) => {
    console.log("scanning", { result, error });
    if (error) {
      setError("Error scanning QR code!");
    } else if (result) {
      balls(result?.t?.text || result?.text || "14357193250706587653");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (qrCode) {
      router.push(`/dashboard/user/?id=${result}`);
    } else {
      setError("Please scan a QR code before verifying.");
    }
  };

  return (
    <form className="card shadow-md bg-base-200" onSubmit={handleSubmit}>
      <div className="card-body items-stretch text-center w-full">
        <div className="my-2 w-full">
          <div className="flex flex-row gap-5 items-center align-middle justify-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl">QR Scanner</h2>
              <p className="text-sm text-base-content/80">
                Scan your QR code here...
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <QrScanner onResult={handleScan} />
          <div className="divider"></div>
        </div>

        <div className="alert alert-error">
          <div className="flex align-middle gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold ">Not Working?</span>
              <span className="font-semibold">Enter User ID manually...</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="1234567890..."
              className="input input-bordered text-white"
              onChange={(e) => setQrCode(e.target.value)}
            />
            <button className="btn btn-primary mt-2 w-full" type="submit">
              Submit Report ID
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QrScannerForm;
