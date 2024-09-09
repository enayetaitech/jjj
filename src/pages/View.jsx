import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { serverbaseURL } from "../constant/index";

const View = () => {
  const { user, userPlan, setLoading } = useContext(AuthContext);
  const [seriesData, setSeriesData] = useState([]);
  const [googleId, setGoogleId] = useState("");
  const [taskId, setTaskId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeriesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${serverbaseURL}series_info?email=${user?.email}`
        );
        setSeriesData(response?.data);
      } catch (error) {
        console.error("error", error);
      } finally {
        //   if(seriesData.length == 0) {
        //     seriesData.push( {
        //       "_id": "6437a8f9c2e1f23d4b5e6f7a",
        //       "channelType": "History",
        //       "imageGenPrompt": "What is your favorite image?",
        //       "storyPrompt": "What is your favorite movie?",
        //       "imageGenTool": "Midjourney",
        //       "voiceModel": "Default",
        //       "imageSlideCount": 1,
        //       "whereToPost": "email",
        //       "content": "Introduction to JavaScript",
        //       "language": "English",
        //       "generations": 1
        //   },{
        //     "_id": "6437a8f9c2e1f23d12317a",
        //     "channelType": "History",
        //     "imageGenPrompt": "What is your favorite image?",
        //     "storyPrompt": "What is your favorite movie?",
        //     "imageGenTool": "Midjourney",
        //     "voiceModel": "Default",
        //     "imageSlideCount": 1,
        //       "whereToPost": "email",
        //     "content": "Introduction to JavaScript",
        //     "language": "English",
        //     "generations": 4
        // });
        //   }
        setLoading(false);
      }
    };
    fetchSeriesData();
  }, [userPlan?.email]);

  const handleConnectYoutube = (item) => {
    sessionStorage.setItem("taskId", item._id);
    window.location.href = `${serverbaseURL}connect_youtube`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const updateGoogleIdInDB = async () => {
      // Extracting googleId from URL
      const params = new URLSearchParams(window.location.search);
      const googleIdFromUrl = params.get("googleId");
      if (googleIdFromUrl) {
        setGoogleId(googleIdFromUrl);
        window.history.replaceState(null, null, window.location.pathname);
      }

      const taskIdFromStorage = sessionStorage.getItem("taskId");
      if (taskIdFromStorage) {
        setTaskId(taskIdFromStorage);
      }

      if (googleIdFromUrl && taskIdFromStorage) {
        try {
          const response = await axios.patch(
            `${
              import.meta.env.VITE_BACKEND
            }/googleId?taskId=${taskIdFromStorage}`,
            {
              googleId: googleIdFromUrl,
            }
          );
        } catch (error) {
          console.error("Error making PATCH request:", error);
        }
      }
    };
    updateGoogleIdInDB();
  }, []);

  const handleScheduleVideo = async (item) => {
    if (!googleId) {
      alert("Connect a google account for the series.");
      return;
    }
    try {
      const response = await axios.post(`${serverbaseURL}get_Generations`, {
        email: userPlan?.email,
        seriesId: item._id,
        postADay: 1,
        googleId,
      });
      alert(`${response.data.message}`);
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  const handleEditVideo = (item) => {
    navigate("/dashboard/edit-video", { state: { item } });
  };

  const handleViewGenerations = (item) => {
    navigate("/dashboard/viewGenerations", { state: { item } });
  };
  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="text-2xl font-bold text-black">YOUR CHANNELS</h1>
        <Link to="/dashboard/create">
          <button className="font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add CHANNEL
          </button>
        </Link>
      </div>
      <div className="pb-10">
        <hr className="h-[3px] bg-black " />
      </div>

      {seriesData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Topic</th>
                <th className="py-2 px-4 border-b">Language</th>
                <th className="py-2 px-4 border-b">Narrator</th>
                <th className="py-2 px-4 border-b">Where to Post</th>
                <th className="py-2 px-4 border-b">Generated</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seriesData.map((item) => (
                <tr key={item?._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item?.topic}</td>
                  <td className="py-2 px-4 border-b">{item?.language}</td>
                  <td className="py-2 px-4 border-b">{item?.narrator}</td>
                  <td className="py-2 px-4 border-b">Email</td>
                  <td className="py-2 px-4 border-b">{item?.Vidcount}</td>

                  <td className="py-2 px-4 border-b">
                    <div className="flex flex-col space-y-2">
                      <button
                        className="font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        // className="bg-gradient-to-r from-primary to-blue-700 text-white py-1 px-3 text-sm rounded font-semibold hover:underline cursor-pointer"
                        onClick={() => handleConnectYoutube(item)}
                      >
                        YOUTUBE
                      </button>
                      <button
                        className="font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        // className="bg-gradient-to-r from-primary to-blue-700 text-white py-1 px-3 text-sm rounded font-semibold"
                        onClick={() => handleViewGenerations(item)}
                      >
                        Generations
                      </button>
                      <button
                        className="font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        // className="bg-gradient-to-r from-primary to-blue-700 text-white py-1 px-3 text-sm rounded font-semibold"
                        onClick={() => handleEditVideo(item)}
                      >
                        EDIT / STOP
                      </button>
                    </div>
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
      )}
    </div>
  );
};

export default View;
