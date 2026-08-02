
const StatCard = ({
    title,
    value,
    subtitle,
    icon:Icon
}) => {

    return(

        <div className="stat-card">

            <div className="stat-top">

                <span className="stat-title">

                    {title}

                </span>

                <Icon className="stat-icon"/>

            </div>

            <h2>

                {value}

            </h2>

            <p>

                {subtitle}

            </p>

        </div>

    )

}

export default StatCard;