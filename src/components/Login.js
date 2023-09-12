import React, { useRef, useState } from "react";
import Header from "./Header";
import { ValidateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleFormData = () => {
    const message = ValidateData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:w-screen md:h-screen"
          src={BACKGROUND_URL}
          alt="backgroundPic"
        />
      </div>

      <form
        className="w-full absolute bg-black md:min-h-[80vh] md:max-w-[450px] my-36 right-0 left-0 p-12 mx-auto bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-white text-[32px] font-[500] mb-[28px]">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-[16px] my-3 bg-[#333] rounded-[4px] w-full text-white"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-[16px] my-3 bg-[#333] rounded-[4px] w-full text-white"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-[16px] my-3 bg-[#333] rounded-[4px] w-full text-white"
        />
        <p className="text-[#e87c03] font-medium py-3 text-[13px">
          {errorMessage}
        </p>
        <button
          className="p-[16px] my-3 bg-[#e50914] rounded-[4px] w-full text-white font-[500] text-center"
          onClick={handleFormData}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-[#737373]">
          {isSignInForm ? "New to Netflix? " : "Already Registered? "}
          <span className="text-white cursor-pointer" onClick={toggleForm}>
            {isSignInForm ? "Sign Up" : "Sign In"} now
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
