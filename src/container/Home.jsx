import { getAuth } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Home = () => {
  const firebaseAuth = getAuth(app);
  const nav = useNavigate()
  const [{ user }, dispatch] = useStateValue();
  const logOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch({type: actionType.SET_USER, user : null})
      nav("/login", {replace:true})
    })
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-60 bg-gray-50 shadow-md rounded-md p-4 flex items-center justify-center flex-col gap-6">
        <img
          src={user?.picture}
          alt=""
          referrerPolicy="no-referrer"
          className="w-24 h-24 rounded-md shadow-md"
        />
        <p className="text-lg font-sans">{user?.name}</p>
        <button
          className="px-4 py-2 border-none outline-none rounded-md cursor-pointer shadow-md bg-red-300"
          onClick={logOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
