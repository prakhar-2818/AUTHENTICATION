import "./Register.css";

function Register({ goToLogin }) {

    const handleRegister = async (e) => {

        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword =
            e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
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

            alert("Account created successfully!");

            goToLogin();

        } catch (error) {

            console.error(error);

            alert(
                "Cannot connect to backend. " +
                "Make sure Node.js server is running."
            );
        }
    };


    return (
        <div className="register-container">

            <div className="register-box">

                <h1>Create Account</h1>

                <form onSubmit={handleRegister}>

                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                    />

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

                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?

                    <span onClick={goToLogin}>
                        {" "}Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;