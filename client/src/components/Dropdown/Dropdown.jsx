import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./Dropdown.css";

const Dropdown = ({
    options,
    value,
    onChange,
    width = "100%"
}) => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    return (

        <div
            className="dropdown"
            ref={dropdownRef}
            style={{ width }}
        >

            <button
                className="dropdown-btn"
                onClick={() => setOpen(!open)}
                type="button"
            >

                <span>{value}</span>

                <FiChevronDown
                    className={open ? "rotate" : ""}
                />

            </button>

            {
                open && (

                    <div className="dropdown-menu">

                        {

                            options.map(option => (

                                <button
                                    key={option}
                                    className={`dropdown-item ${
                                        option === value ? "active" : ""
                                    }`}
                                    onClick={() => {

                                        onChange(option);
                                        setOpen(false);

                                    }}
                                >

                                    {option}

                                </button>

                            ))

                        }

                    </div>

                )
                

            }

        </div>

    );

};

export default Dropdown;