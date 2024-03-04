"use client";
import React from "react";
import FileUpload from "@/components/ui/FileUpload";
import { useState } from "react";

const Dashboard = () => {
  const [reportFile, setReportFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const patient = {
    name: "John Doe",
    aadharno: "55555",
    phone: "1234567890",
    p_contact: "9876543210",
    medicalRecords: ["Broken Arm", "Fever"],
    doctor: "Dr. Smith",
    disease: ["Fever", "Fracture"],
  };

  const handleClientFileChange = (files) => {
    console.log(files);
    if (files.length > 0) {
      setReportFile(files[0]);
    }
    console.log(files);
  };
  const uploadFile = () => {
    console.log("File Uploaded");
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Dashboard!</h1>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
        <p>Name: {patient.name}</p>
        <p>Aadhar No: {patient.aadharno}</p>
        <p>Phone: {patient.phone}</p>
        <p>Emergency Contact: {patient.p_contact}</p>
      </div>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Medical Records</h2>
        <ul>
          {patient.medicalRecords &&
            patient.medicalRecords.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Assigned Doctor</h2>
        <p>Doctor: {patient.doctor}</p>
      </div>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Disease Information</h2>
        <ul>
          {patient.disease &&
            patient.disease.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload Medical Records</h2>
        <FileUpload
          label="Upload PDF records of your medical history"
          onChange={handleClientFileChange}
          acceptedFormats=".pdf"
          required
          multiple={true}
          error={fileError}
        />
        {reportFile && (
          <button
            className="btn btn-primary mt-4"
            onClick={() => uploadFile()}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
