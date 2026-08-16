import "./Login.css";

function Login({ goToRegister, goToForgot, goToHome }) {

    const handleLogin = async (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                return;
            }

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login successful!");

            goToHome();

        } catch (error) {

            console.error(error);

            alert(
                "Cannot connect to backend. " +
                "Make sure Node.js server is running."
            );
        }
    };


    return (
        <div className="login-container">

            <div className="login-box">

                <h1>Login</h1>

                <form onSubmit={handleLogin}>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p
                    className="forgot-link"
                    onClick={goToForgot}
                >
                    Forgot Password?
                </p>

                <p>
                    Don't have an account?

                    <span onClick={goToRegister}>
                        {" "}Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;