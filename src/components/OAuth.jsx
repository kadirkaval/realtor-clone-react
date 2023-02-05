import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { serverTimestamp, getDoc, setDoc, doc } from 'firebase/firestore';
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import {db} from "../firebase"

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try{
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp()
        });
      }
      navigate("/");
    }catch (error){
      toast.error("Could not authorize with Google");
    }
  }
  return (
    <button onClick={onGoogleClick} className="w-full bg-red-700 text-white px-7 py-2 font-medium text-sm uppercase rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-900 flex items-center justify-center"
    type="button">
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with google</button>
  )
}
