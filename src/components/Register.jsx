import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "./FormInput";
import "../../firebase/config";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Layout from "../Layout/Layout";
import { Context1 } from "../App";

function Register() {
  const { userCredentials, setCreds,setIsAuthenticated,isAuthenticated } = useContext(Context1);
  const [isLogout, setIsLogout] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log("ok");
      })
      .catch((error) => {
        console.error("Error setting persistence: ", error);
      });
  }, [auth]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged user: ", user);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);
  const handleChange = (e) => {
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
                      
  const userSignUp = () => {
    if(!userCredentials.email || !userCredentials.password){
      alert("❌ Iltimos, email va parolni to‘ldiring!");
    }
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        alert("✅ Ro‘yxatdan o‘tish muvaffaqiyatli!");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("Siz hali ro‘yxatdan o‘tmagansiz!");
        } else if (error.code === "auth/wrong-password") {
          alert("Parol noto‘g‘ri. Iltimos, qaytadan urinib ko‘ring!");
        } else {
          alert("Xatolik yuz berdi: " + error.message);
        }
      });
  };

  const userSignIn = () => {
  if (!userCredentials.email || !userCredentials.password) {
    alert("❌ Iltimos, email va parolni to‘ldiring!");
    return;
  }
  signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then(() => {
      setPersistence(auth, browserSessionPersistence) 
        .then(() => {
          setIsAuthenticated(true);
          alert("✅ Kirish muvaffaqiyatli!");
        });
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/invalid-login-credentials") {
        alert("❌ Siz hali ro‘yxatdan o‘tmagansiz!");
      } else if (error.code === "auth/wrong-password") {
        alert("❌ Parol noto‘g‘ri. Iltimos, qaytadan urinib ko‘ring!");
      } else {
        alert("❌ Xatolik yuz berdi: " + error.message);
      }
    });
};

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        sessionStorage.clear(); 
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
      });
  };
  
  if (isAuthenticated) {
    return ( <Layout />   
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:block bg-[url('https://cdn.britannica.com/48/179448-138-40EABF32/Overview-New-York-City.jpg')] bg-cover bg-center w-[60%]"></div>
      <div className="md:w-[40%] w-full flex justify-center items-center bg-[url('https://cdn.britannica.com/48/179448-138-40EABF32/Overview-New-York-City.jpg')] bg-cover bg-center md:bg-none">
        <form onSubmit={handleSubmit} className="w-full max-w-96 px-8 md:px-2">
          <h1 className="text-4xl font-medium text-center text-white md:text-slate-800 my-8">
            {isLogout ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
          </h1>
          <div className="flex flex-col gap-5 gap-y-6">
            <FormInput
              onChange={handleChange}
              placeholder="Email"
              type="email"
              name="email"
            />
            <FormInput
              onChange={handleChange}
              placeholder="Parol"
              type="password"
              name="password"
            />
          </div>
          {!isLogout ? (
            <>
              <button
                type="button"
                onClick={userSignIn}
                className="w-[90%] flex justify-center mx-auto py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition-all mt-4"
              >
                Kirish
              </button>
              <button
                onClick={() => setIsLogout(true)}
                type="button"
                className="w-[90%] flex justify-center mx-auto py-2 px-4 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700 transition-all mt-4"
              >
                Ro'yxatdan o'tish
              </button>
            </>
          ) : (
            <div>
              <button
              onClick={userSignUp}
              type="button"
              className="w-[90%] flex justify-center mx-auto py-2 px-4 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600 transition-all mt-7"
            >
              Ro'yxatdan o'tish
            </button>
            <button
                type="button"
                onClick={() => setIsLogout(false)}
                className="w-[90%] flex justify-center mx-auto py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition-all mt-4"
              >
                Orqaga
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
