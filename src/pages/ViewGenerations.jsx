import React, { useContext, useState, useEffect } from "react";
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
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import {
  contentOptions,
  destinationOptions,
  languageOptions,
  durationOptions,
  serverbaseURL,
  narrationOptions,
  ChannelPrompts,
} from "../constant/index.jsx";

const ViewGenerations = () => {
  const imageGenToolOptions = ["DALL-E", "Midjourney", "Stable Diffusion"];
  const voiceModelOptions = ["Default", "Neural TTS", "Custom Voice"];
  const { user, userPlan, setLoading } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [videoItem, setVideoItem] = useState(null);
  const [generations, setGenerations] = useState(null);

  const [advancedData, setAdvancedData] = useState(location.state.item);
  useEffect(() => {
    if (location.state && location.state.item) {
      setVideoItem(location.state.item);

      setAdvancedData("channel details", location.state.item);
      const fetchSeriesData = async () => {
        const response = await axios.get(
          `${serverbaseURL}get_Generations?email=${user?.email}&seriesId=${location.state.item._id}`
        );
        let vidGens = response?.data.vidSchedules;
        setGenerations(vidGens);
      };

      fetchSeriesData();
      // setGenerations([
      //   {
      //     'videoId': '1',
      //     'genDate': new Date().toLocaleString(),
      //     'uploadedTo': 'Youtube',
      //     'channelID': '',
      //     'videoLink': 'https://www.youtube.com/watch?v=TBIjgBVFjVI&t=15s'
      //   },
      //   {
      //     'videoId': '1',
      //     'genDate': new Date().toLocaleString(),
      //     'uploadedTo': 'Youtube',
      //     'channelID': '',
      //     'videoLink': 'https://www.youtube.com/watch?v=TBIjgBVFjVI&t=15s'
      //   }]);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderAdvancedForm = () => {
    return generations?.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Generated date</th>
              <th className="py-2 px-4 border-b">Scheduled Post Time</th>
              <th className="py-2 px-4 border-b">PostTo</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Channel Name</th>
              <th className="py-2 px-4 border-b">Video Link</th>
            </tr>
          </thead>
          <tbody>
            {generations?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.scheduleTime}</td>
                <td className="py-2 px-4 border-b">{item.scheduleTime}</td>
                <td className="py-2 px-4 border-b">Email</td>
                <td className="py-2 px-4 border-b">{item.status}</td>
                <td className="py-2 px-4 border-b">{item.seriesName}</td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={item.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="p-8 w-full rounded-lg bg-slate-600">
        <p className="text-white pb-8">
          You haven't started a Faceless Video channel yet.
        </p>

        <Link to="/dashboard/create">
          <button className="bg-gradient-to-r from-primary to-blue-700 text-white py-3 px-6 text-lg rounded-lg font-semibold mb-5">
            CREATE YOUR CHANNEL
          </button>
        </Link>
      </div>
    );
  };

  if (!videoItem) {
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
    </div>
  );
};

export default ViewGenerations;
