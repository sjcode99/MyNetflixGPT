import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/slice/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/slice/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/slice/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  // console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGptSearchView = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Signed In
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img
        className={
          user ? "mx-auto md:mx-0 w-[10rem] md:ml-[3%]" : "w-[15rem] md:ml-[3%"
        }
        src={NETFLIX_LOGO}
        alt="Netflix-Logo"
      />
      <div className="flex p-2 justify-between md:justify-center items-center">
        {/* <img
          className="w-12 h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS2RCLUPq1JgEPmHByabXOF8kuno6klS2moQ&usqp=CAU"
          alt="userIcon"
        /> */}
        {user && (
          <>
            <select
              defaultValue={"en"}
              className="p-2 m-2 bg-gray-900 text-white rounded-[4px]"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map(({ label, code }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <button
              className="text-white py-2 px-4 m-2 bg-purple-800 rounded-[4px]"
              onClick={handleGptSearchView}
            >
              {showGptSearch ? "HomePage" : "GPT Search"}
            </button>

            <button
              className="bg-[#e50914] rounded-[4px] text-white w-[90px] h-[40px]"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
