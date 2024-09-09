import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { serverbaseURL } from "../constant/index";

const Pricing = () => {
  const navigate = useNavigate();
  const { userPlan, setLoading } = useContext(AuthContext);

  const handleBuyPlan = async (plan) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        userEmail: user?.email,
        plan: plan,
      };
      const response = await axios.post(
        `${serverbaseURL}channels/buyplan`,
        data
      );
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="pricing-container">
      <h1>Choose Your Plan</h1>
      <div className="pricing-grid">
        {[
          {
            name: "Basic",
            price: "$9.99",
            features: ["Feature 1", "Feature 2", "Feature 3"],
          },
          {
            name: "Standard",
            price: "$19.99",
            features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
          },
          {
            name: "Premium",
            price: "$29.99",
            features: [
              "Feature 1",
              "Feature 2",
              "Feature 3",
              "Feature 4",
              "Feature 5",
            ],
          },
          {
            name: "Enterprise",
            price: "$49.99",
            features: [
              "Feature 1",
              "Feature 2",
              "Feature 3",
              "Feature 4",
              "Feature 5",
              "Feature 6",
            ],
          },
        ].map((plan, index) => (
          <div key={index} className="pricing-card">
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}/month</p>
            <ul>
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            {userPlan === plan.name ? (
              <button className="current-plan" disabled>
                Current Plan
              </button>
            ) : (
              <button
                className="buy-plan"
                onClick={() => handleBuyPlan(plan.name)}
              >
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
