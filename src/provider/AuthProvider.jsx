import  { createContext,  useEffect, useState } from "react";
import { GoogleAuthProvider,  getAuth, onAuthStateChanged, signInWithPopup, signOut,  } from 'firebase/auth'
import app from "../firebase/firebase.config";
import axios from "axios";
import Loading from "../components/Loading";
import {serverbaseURL} from '../constant/index';



export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  // const user = localStorage.getItem('user');
  const [loading, setLoading] = useState(false)
  const [userPlan, setUserPlan] = useState(null)
  const [postLoginCallback, setPostLoginCallback] = useState(null);
  
  const googleSignIn = () => {
      return signInWithPopup(auth, googleProvider)
  }
  const logOut = () => {
    localStorage.removeItem('user');
    return signOut(auth)
  }


 useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
        if (postLoginCallback) {
          await postLoginCallback();
          setPostLoginCallback(null); // Clear callback after execution
        }
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
      // setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [postLoginCallback]);
  
  

// Getting user data in the database
const getUserData = async (userData) => { 
    try {
      setLoading(true)
        const response = await axios.post(`${serverbaseURL}user`, userData)
        // const response = await axios.get(`${serverbaseURL}userAuth/googleLogin?username=${userData.email}`)
        const data = await response?.data;
        if(data?.email){
            setUserPlan(data)
        }
    } catch (error) {
        console.error(`Error in getting user data, ${error}`)
    } finally {
      setLoading(false)
    }
 }




 useEffect(() => {
  if (user && user?.email && !userPlan) {
    const userData = {
      email: user?.email,
    };
    getUserData(userData);
  }
}, [user, userPlan]);


  // if(loading){
  //   return <Loading/>
  // }

  const authInfo = {
    user, 
    loading,
    googleSignIn, 
    // setUser,
    logOut,
    userPlan,
    setLoading, setPostLoginCallback, setUserPlan
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// export const useAuth = useContext(AuthContext)