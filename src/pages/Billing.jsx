import axios from "axios";
import GradientHeading from "../components/GradientHeading";
import { useContext, useState } from "react";
import { serverbaseURL } from "../constant/index";
import { AuthContext } from "../provider/AuthProvider";
import correct from "../assets/icons8-correct-50.png";
import wrong from "../assets/icons8-wrong-50.png";

const Billing = () => {
  const { user } = useContext(AuthContext);
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e, price) => {
    e.preventDefault();
    // if(!userPlan){
    //   alert("Please refresh the window and try again.")
    //   return
    // }
    const amount = price * 100;
    const currency = "INR";
    const receipt = `receipt_${Math.random().toString(36).substring(7)}`;

    const paymentData = {
      userId: user,
      amount,
      currency,
      receipt,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/order",
      headers: {
        "Content-Type": "application/json",
      },
      data: paymentData,
    };

    axios
      .request(config)
      .then((response) => {
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.error("error at", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: "rzp_test_GcZZFDPP0jHtC4",
      amount: amount,
      currency: "INR",
      name: "AutoMovieCreator",
      description: "Payment to AutoMovieCreator",
      image: "https://papayacoders.com/demo.png",
      handler: async function (response) {
        setResponseId(response.razorpay_payment_id);

        // Make the second API call after Razorpay payment is completed
        try {
          const paymentResponse = await axios.get(
            `http://localhost:3000/payment/${response.razorpay_payment_id}`
          );
          setResponseState(paymentResponse.data);
          setIsModalOpen(true); // Open modal with payment details
        } catch (error) {
          console.error("Error occurred while fetching payment details", error);
        }
      },
      prefill: {
        name: "Auto Movie Creator",
        email: "tech@automoviecreator.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Modal component
  const PaymentModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        {responseState.length !== 0 && (
          <ul>
            <li>Amount: {responseState.amount / 100} Rs.</li>
            <li>Currency: {responseState.currency}</li>
            <li>Status: {responseState.status}</li>
            <li>Method: {responseState.method}</li>
          </ul>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="pt-20 px-5 pb-5">
        <GradientHeading text="CURRENT PLAN" />
      </div>
      <div className="px-5">
        <div className="bg-slate-600 max-w-2xl  px-8 py-10 md:px-16 shadow-xl rounded-lg ">
          <p className="text-lg text-white">
            <span className="font-bold">Current Plan:</span> Free
          </p>
          <p className="text-lg text-white">
            <span className="font-bold">Max Series:</span> 1
          </p>
          <p className="text-lg text-white">
            <span className="font-bold">Frequency:</span> 1 Video Creation
          </p>
        </div>
      </div>
      <div className="pt-14 px-5 pb-5">
        <GradientHeading text="CHANGE PLAN" />
      </div>
      {/* card container */}
      <div className="bg-gradient-to-r from-primary to-blue-700 p-5 rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">
        {/* card 1 */}
        <div className=" bg-white rounded-lg p-8 hover:scale-105 transition-all duration-700">
          <p className="text-center text-gray-400 font-bold pb-2">FREE</p>
          <h1 className="font-bold text-4xl text-textColor text-center pb-6">
            $0
          </h1>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>
              Create <span className="font-bold">1 Video</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>1 Series</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>Edit & Preview Videos</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={wrong} alt="" className="h-5 w-5" />
            <p className="line-through text-gray-400">Auto Post To Channel</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={wrong} alt="" className="h-5 w-5" />
            <p className="line-through text-gray-400">HD Video Resolution</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={wrong} alt="" className="h-5 w-5" />
            <p className="line-through text-gray-400">Background Music</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={wrong} alt="" className="h-5 w-5" />
            <p className="line-through text-gray-400">No Watermark</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={wrong} alt="" className="h-5 w-5" />
            <p className="line-through text-gray-400">Download Videos</p>
          </div>

          <button className="bg-gray-500 text-white py-2 mt-5 w-full text-xs rounded-lg font-bold">
            {" "}
            BUY
          </button>
        </div>
        {/* card 2 */}
        <div className=" bg-white rounded-lg p-8 hover:scale-105 transition-all duration-700">
          <p className="text-center text-gray-400 font-bold pb-2">STARTER</p>
          <h1 className="font-bold text-4xl text-textColor text-center pb-6">
            $19
          </h1>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>
              Posts <span className="font-bold">3 Times A Week</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>1 Series</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>Edit & Preview Videos</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Auto Post To Channel</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">HD Video Resolution</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Background Music</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">No Watermark</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Download Videos</p>
          </div>

          <button
            className="bg-gradient-to-r from-primary to-blue-700 text-white py-2 mt-5 w-full text-xs rounded-lg font-bold"
            onClick={(e) => handlePayment(e, 19)}
          >
            {" "}
            BUY
          </button>
        </div>
        {/* card 3 */}
        <div className=" bg-white rounded-lg p-8 hover:scale-105 transition-all duration-700">
          <p className="text-center text-gray-400 font-bold pb-2">DAILY</p>
          <h1 className="font-bold text-4xl text-textColor text-center pb-6">
            $39
          </h1>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>
              Posts <span className="font-bold">Once A Day</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>1 Series</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>Edit & Preview Videos</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Auto Post To Channel</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">HD Video Resolution</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Background Music</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">No Watermark</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Download Videos</p>
          </div>

          <button
            className="bg-gradient-to-r from-primary to-blue-700 text-white py-2 mt-5 w-full text-xs rounded-lg font-bold"
            onClick={(e) => handlePayment(e, 39)}
          >
            {" "}
            BUY
          </button>
        </div>
        {/* card 4 */}
        <div className=" bg-white rounded-lg p-8 hover:scale-105 transition-all duration-700">
          <p className="text-center text-gray-400 font-bold pb-2">HARDCORE</p>
          <h1 className="font-bold text-4xl text-textColor text-center pb-6">
            $69
          </h1>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>
              Posts <span className="font-bold">Twice A Day</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>1 Series</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p>Edit & Preview Videos</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Auto Post To Channel</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">HD Video Resolution</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Background Music</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">No Watermark</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <img src={correct} alt="" className="h-5 w-5" />
            <p className="">Download Videos</p>
          </div>

          <button
            className="bg-gradient-to-r from-primary to-blue-700 text-white py-2 mt-5 w-full text-xs rounded-lg font-bold"
            onClick={(e) => handlePayment(e, 69)}
          >
            {" "}
            BUY
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && <PaymentModal />}
    </div>
  );
};

export default Billing;
