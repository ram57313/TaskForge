import "./WelcomeCard.css";

import { FiPlus } from "react-icons/fi";
import {FaFacebook, FaFan, FaRegFrown, FaRegSadTear, FaUserSecret} from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";

import {useAuth} from "../../context/AuthContext";

const WelcomeCard = ({stats}) => {

    const {user}=useAuth();

    const hour = new Date().getHours();
 
    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    }

    // Temporary until backend is connected
    const userName =user.isGuest?"The' I'll Just Guest Login 'Guy ":user.name.toUpperCase();

    const completedTasks = stats.completed;
    const totalTasks = stats.total;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    return (

        <section className="welcome-card">

            <div className="welcome-left">

                <h1>

                    {greeting},{" "}
                    <span>{userName}</span>
                    {" "}
                   <MdOutlineWavingHand color="blue" className="wave"/>

                </h1>

                <p>

                    Stay focused. Complete today's priorities one task at a time.

                </p>

                {/* <button className="welcome-btn">

                    <FiPlus />

                    <span>Create Task</span>

                </button> */}

            </div>

            <div className="welcome-right">

                <h3>Today's Progress</h3>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <div className="progress-info">

                    <span>

                        {completedTasks} Completed

                    </span>

                    <span>

                        {totalTasks - completedTasks} Remaining

                    </span>

                </div>

            </div>

        </section>

    );

};

export default WelcomeCard;