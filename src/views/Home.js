import React, { useState, useEffect } from "react";
import WorkoutAccordion from "../components/workout_accordion";
import Menu from "../components/menu";
import Loader from "../components/loader"; // Assuming Loader is a component to show while loading
import "./styles/global.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const processData = (fetchedData) => {
    return fetchedData.map((session) => ({
      sessionId: session.sessionId,
      workoutName: session.workout.name,
      exercises: session.exerciseMetrics
        .filter((exerciseMetric) => exerciseMetric.metrics.length > 0) // Filter out exercises with empty metrics
        .map((exerciseMetric) => ({
          exerciseName: exerciseMetric.exerciseID, // Using 'exerciseID' as the name
          metrics: exerciseMetric.metrics,
        })),
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/log-in");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api/training-session/${userId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("userId");
          navigate("/log-in");
          return;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedData = await response.json();
        const processedData = processData(fetchedData);
        setSessionsData(processedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="default-screen-container">
      {!isMobileView && <Menu active="home" />}
      <div className="default-home-container">
        <div className="home-container">
          <p className="text--heading bold">Welcome back!</p>
          <p className="text--subheading">
            Weight Lifting Progress Visualizations
          </p>
          <div className="accordion-container">
            {sessionsData.map((session) => (
              <WorkoutAccordion
                key={session.sessionId}
                sessionId={session.sessionId}
                workoutName={session.workoutName}
                exercises={session.exercises}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
