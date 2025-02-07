import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3s1yg-s4g8bS0VPZvlgmkD2Pc_qPxACw",
  authDomain: "login-de792.firebaseapp.com",
  projectId: "login-de792",
  storageBucket: "login-de792.firebasestorage.app",
  messagingSenderId: "952393807464",
  appId: "1:952393807464:web:3f2c0d20d4af1ab90eeddd",
  measurementId: "G-CH0YN4TMJN"
};

const app = initializeApp(firebaseConfig);
export default app

{/* <div className="w-full max-w-96 px-5 md:px-2">
          <h1 className="text-4xl font-medium text-center text-white md:text-slate-800 mb-5">
            Tizimga kirish
          </h1>
          <div className="flex flex-col gap-5">
            <FormInput onChange={handleChange} placeholder="Ism" type="text" name="name" />
            <FormInput onChange={handleChange} placeholder="Login" type="text" name="login" />
            <FormInput onChange={handleChange} placeholder="Parol" type="password" name="password" />
          </div>
          <button
            onClick={handleLogin}
            type="button"
            className="w-[90%] flex justify-center mx-auto py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all mt-4"
          >
            Kirish
          </button>
          <button
            onClick={() => navigate(`/SignIn`)}
            type="button"
            className="w-[90%] flex justify-center mx-auto py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all mt-4"
          >
            Ro'yxatdan o'tish
          </button>
          <p className="mt-2 text-[12px] text-center font-serif">Ro'yxatdan o'tmagan bo'lsangiz ro'yxatdan o'ting</p>
        </div> */}