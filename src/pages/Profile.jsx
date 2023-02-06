import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {db} from "../firebase";
import { FcHome } from "react-icons/fc"

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    // e.preventDefault();
    try {
      if(auth.currentUser.displayName !== name){
        //update displayName in firebase auth
        await updateProfile(auth.currentUser, {
          displayName:name,
        })

        // update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        })
        toast.success("Profile details updated");
      }
    } catch (error) {
      toast.error("Could not update the profile details")
    }
  }
  return (
    <>
      <section className="max-w-6xl flex justify-center items-center flex-col m-auto">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetails}
              className={`mb-6 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetails && "bg-red-200 focus:bg-red-200"
              }`}              
              onChange={onChange}
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              value={email}
              className="mb-6 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              disabled
            />
            <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetails && onSubmit();
                    setChangeDetails((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetails ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button type="submit" className="w-full px-7 py-3 uppercase bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded transition duration-200 ease-in-out text-sm font-medium shadow-md hover:shadow-lg">
          <Link to="/create-listing" className="flex justify-center items-center">
          <FcHome className="rounded-full bg-red-200 text-3xl mr-2 p-1 border-2"/>
            Sell or rent your home
          </Link>  
          </button>
        </div>
      </section>
    </>
  );
}
