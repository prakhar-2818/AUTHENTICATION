import "./Home.css";

function Home({ user }) {
    return (
        <div className="home-container">

            <div className="home-card">

                <div className="welcome-icon">
                    👋
                </div>

                <h1>
                    Hello, {user?.name || "User"}!
                </h1>

                <p>
                    Welcome to your application
                </p>

                <div className="home-line"></div>

                <span className="home-message">
                    You have successfully logged in.
                </span>

            </div>

        </div>
    );
}

export default Home;