
import {FiClock, FiMoreHorizontal} from "react-icons/fi"
import "./Settings.css"
const Settings = () => {

    return (

        <section className="settings-page">
            
            <h1 className="settings-header">Settings</h1>
            
            <div className="future-updates-modal">
                <FiClock size={50} className="logo"/>
                <div className="content">
                   <p>More features coming soon,working on it.If u have any ideas suggest them 🫡</p>
                </div>
            </div>

        </section>

    );

};

export default Settings;