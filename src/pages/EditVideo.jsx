import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Send,
  PlayCircle,
  Globe,
  Mic,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowLeft,
} from "lucide-react";

import {
  contentOptions,
  ChannelPrompts,
  narrationOptions,
  serverbaseURL,
} from "../constant/index.jsx";
import axios from "axios";

const EditVideo = () => {
  const imageGenToolOptions = ["DALL-E", "Midjourney", "Stable Diffusion"];
  const voiceModelOptions = ["Default", "Neural TTS", "Custom Voice"];

  const location = useLocation();
  const navigate = useNavigate();
  const [videoItem, setVideoItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const [advancedData, setAdvancedData] = useState(null);
  const [activeTab, setActiveTab] = useState("videoDetails");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (location.state && location.state.item) {
      setVideoItem(location.state.item);
      setAdvancedData({
        ...location.state.item,
        status: "Stopped", // or 'Active'
      });
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const handleAdvancedChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle scheduleDays with checkboxes
    if (type === "checkbox") {
      const updatedDays = checked
        ? [...advancedData.scheduleDays, value] // Add day
        : advancedData.scheduleDays.filter((day) => day !== value); // Remove day

      setAdvancedData((prevData) => ({
        ...prevData,
        scheduleDays: updatedDays,
      }));
    } else {
      setAdvancedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  console.log('advance data', advancedData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${serverbaseURL}edit_series`, {
        advancedData: advancedData,
      });
      alert(`${response.data.message}`);
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  const confirmStopChannel = () => {
    setShowConfirmation(false);
    setShowPopup(true);
  };

  const popupClose = () => {
    setShowPopup(false);
  };

  const handleStopChannel = () => {
    setShowConfirmation(true);
  };

  const renderAdvancedForm = () => {
    if (!advancedData) return null;

    return (
      <div className="mt-6 p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-indigo-700">
            Advanced Options
          </h2>
          <div
            className={`px-4 py-2 rounded-full font-semibold ${
              advancedData.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {advancedData.status || "Unknown"}
          </div>
        </div>
        <div className="mb-4">
          <ul className="flex border-b">
            <li className="-mb-px mr-1">
              <button
                className={`bg-white inline-block py-2 px-4 text-blue-700 font-semibold ${
                  activeTab === "videoDetails"
                    ? "border-l border-t border-r rounded-t"
                    : ""
                }`}
                onClick={() => handleTabClick("videoDetails")}
              >
                Video Details
              </button>
            </li>
            <li className="mr-1">
              <button
                className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
                  activeTab === "schedule"
                    ? "border-l border-t border-r rounded-t"
                    : ""
                }`}
                onClick={() => handleTabClick("schedule")}
              >
                Schedule
              </button>
            </li>
          </ul>
        </div>
        <div
          id="videoDetails"
          className={`tab-content ${
            activeTab === "videoDetails" ? "" : "hidden"
          }`}
        >
          <div className="space-y-6">
            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Video Topic
              </label>
              <select
                name="topic"
                value={advancedData.topic}
                onChange={(e) => {
                  handleAdvancedChange(e);
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
              >
                <option value="">Select Video Topic</option>
                {contentOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Narrator Voice
              </label>
              <select
                name="narrator"
                value={advancedData.narrator}
                onChange={(e) => {
                  handleAdvancedChange(e);
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
              >
                <option value="">Select Narrator Voice </option>
                {narrationOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div
          id="schedule"
          className={`tab-content ${activeTab === "schedule" ? "" : "hidden"}`}
        >
       
            <div className="space-y-6">
            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Select Days for Schedule</label>
              <div className="flex flex-wrap gap-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="scheduleDays"
                      value={day}
                      checked={advancedData?.scheduleDays?.includes(day)} // Check if day is selected
                      onChange={handleAdvancedChange}
                      className="h-4 w-4"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
              <div className="form-group">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Schedule Time
                </label>
                <input
                  type="time"
                  name="scheduleTime"
                  value={advancedData.scheduleTime || ""}
                  onChange={handleAdvancedChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
                />
              </div>
              
            </div>
       
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-1/2 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 mr-2"
          >
            Save <Check className="ml-2" size={24} />
          </button>
          <button
            onClick={handleStopChannel}
            className="flex items-center justify-center w-1/2 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 ml-2"
          >
            Stop Channel
          </button>
        </div>
      </div>
    );
  };

  if (!videoItem || !advancedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-video-container p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
        >
          <ArrowLeft className="mr-2" size={20} />
          <span className="text-lg font-semibold">Back to Dashboard</span>
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        {renderAdvancedForm()}
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Confirm Action</h3>
            <p className="mb-6">Are you sure you want to stop this channel?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmStopChannel}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Information</h3>
            <p className="mb-6">Channel has been Stopped</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={popupClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditVideo;
