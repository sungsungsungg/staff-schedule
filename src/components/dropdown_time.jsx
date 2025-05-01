import React, { useState } from 'react';

const TimeDropdown = ({day,which}) => {
    // Define the times for the dropdown
    const timeOptions = [
        "open", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", 
        "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "close"
    ];

    // State to store user input and the filtered options
    const [input, setInput] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(timeOptions);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Function to handle input change and filter dropdown options
    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase().trim();
        setInput(value);

        // Filter the options based on the input
        const filtered = timeOptions.filter(option => 
            option.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
        setDropdownVisible(true); // Show the dropdown when typing
    };

    // Function to handle when an option is selected
    const handleOptionClick = (option) => {
        setInput(option); // Set the input field value to the selected option
        setDropdownVisible(false); // Close the dropdown
    };

    // Function to close dropdown if clicked outside
    const handleOutsideClick = (e) => {
        if (!e.target.closest('.dropdown')) {
            setDropdownVisible(false);
        }
    };

    // Attach event listener to close dropdown when clicking outside
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="dropdown">
            <input
                id={`${day+which}`}
                className="form-control-sm"
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder=""
                aria-label="Search for a time"
                autoComplete="off"
                style={{
                    maxWidth: '4rem'
                }}
            />
            {/* Conditionally show the dropdown */}
            {dropdownVisible && (
                <ul className="dropdown-menu show"
                    style={{
                        maxHeight: '200px', 
                        overflowY: 'auto'   
                    }}
                    aria-labelledby="timeInput">
                    {/* Render the filtered options */}
                    {filteredOptions.map((option, index) => (
                        <li key={index}>
                            <a className="dropdown-item"  href="#" onClick={() => handleOptionClick(option)}>
                                {option}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TimeDropdown;
