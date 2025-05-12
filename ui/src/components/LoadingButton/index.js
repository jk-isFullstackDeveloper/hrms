import React from "react";

const LoadingButton = ({ isLoading, label, onClick, disabled }) => {
    return (
        <button
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition duration-200"
            onClick={onClick}
            disabled={isLoading || disabled}
        >
            {isLoading ? (
                <>
                    <svg
                        className="w-5 h-5 mr-2 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 018 8z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                label
            )}
        </button>
    );
};

export default LoadingButton;
