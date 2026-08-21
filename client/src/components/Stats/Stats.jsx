import "./Stats.css";

import {
    FiClipboard,
    FiCheckCircle,
    FiClock,
    FiArchive
} from "react-icons/fi";

import StatCard from "./StatCard";


const Stats = ({statsdata}) => {
   
  const finished=((statsdata.total-statsdata.pending)*100)/statsdata.total;

  const res=Number(finished.toFixed(0));

    const stats = [

        {
            title:"Total Tasks",
            value:statsdata.total,
            subtitle:statsdata.total==0?"none":"Active",
            icon:FiClipboard
        },

        {
            title:"Completed",
            value:statsdata.completed,
            subtitle:`${res}% done`,
            icon:FiCheckCircle
        },

        {
            title:"Pending",
            value:statsdata.pending,
            subtitle:"Needs attention",
            icon:FiClock
        },

        {
            title:"Archived", 
            value:statsdata.archived,
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