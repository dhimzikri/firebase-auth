import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { app } from '../config/firebase.config'
import {useNavigate} from 'react-router-dom'
import { async } from '@firebase/util'
import { validateToken } from '../api'
import {useStateValue} from '../context/StateProvider'
import reducer, { actionType } from '../context/reducer'

const Login = () => {
  const firebaseAuth = getAuth(app);
  const google_provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const gitProvider = new GithubAuthProvider()
  const [{user}, dispatch] = useStateValue();

  const loginWithGmail = async () => {
    await signInWithPopup(firebaseAuth, google_provider).then((userCred)=> {
      if(userCred) {
        firebaseAuth.onAuthStateChanged((cred) => {
          cred.getIdToken().then((token) =>{
            validateToken(token).then((data) => {
              // console.log(data)
              dispatch({
                type: actionType,
                user: data.data,
              });
              navigate("/", {replace:true})
            })
          })
        })
      }
    })
  }

  const loginWithGithub = async () => {
    await signInWithRedirect(firebaseAuth, gitProvider).then((data) => {
      console.log(data)
    })
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full sm:w-96 border border-gray-200 bg-gray-100 p-4 rounded-md flex-col items-center justify-center gap-4">
        <div
          className="w-full px-6 py-3 bg-white rounded-full cursor-pointer gap-3 flex items-center justify-center hover:shadow-md"
          onClick={loginWithGmail}
        >
          <FcGoogle className="text-4xl" />
          <p className="text-lg font-semibold text-gray-600">
            Signin with Gmail
          </p>
        </div>
        <div
          className="w-full px-6 py-3 bg-white rounded-full cursor-pointer gap-3 flex items-center justify-center mt-2 hover:shadow-md"
          onClick={loginWithGithub}
        >
          <FaGithub className="text-4xl" />
          <p className="text-lg font-semibold text-gray-600">
            Signin with GitHub
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login