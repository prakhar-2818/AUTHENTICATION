import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";

import "./App.css";

function App() {

    const [page, setPage] = useState("login");


    return (
        <>

            {page === "login" && (
                <Login
                    goToRegister={() =>
                        setPage("register")
                    }

                    goToForgot={() =>
                        setPage("forgot")
                    }

                    goToHome={() =>
                        setPage("home")
                    }
                />
            )}


            {page === "register" && (
                <Register
                    goToLogin={() =>
                        setPage("login")
                    }
                />
            )}


            {page === "forgot" && (
                <ForgotPassword
                    goToLogin={() =>
                        setPage("login")
                    }

                    goToRegister={() =>
                        setPage("register")
                    }
                />
            )}


            {page === "home" && (
                <Home />
            )}

        </>
    );
}

export default App;