import "./Stats.css";

import {
    FiClipboard,
    FiCheckCircle,
    FiClock,
    FiArchive
} from "react-icons/fi";

import StatCard from "./StatCard";

const Stats = () => {

    const stats = [

        {
            title:"Total Tasks",
            value:24,
            subtitle:"+4 today",
            icon:FiClipboard
        },

        {
            title:"Completed",
            value:16,
            subtitle:"67% done",
            icon:FiCheckCircle
        },

        {
            title:"Pending",
            value:6,
            subtitle:"Needs attention",
            icon:FiClock
        },

        {
            title:"Archived",
            value:2,
            subtitle:"Older tasks",
            icon:FiArchive
        }

    ];

    return(

        <section className="stats">

            {

                stats.map((stat,index)=>(

                    <StatCard
                        key={index}
                        {...stat}
                    />

                ))

            }

        </section>

    )

}

export default Stats;