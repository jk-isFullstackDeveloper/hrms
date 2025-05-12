import React, { useState } from "react";
import { Phone, PhoneOff, CircleDot,  Video } from "lucide-react"; // using lucide-react icons

const Index = ( ) => {
    const [isCalling, setIsCalling] = useState(false);

    return (
        <div>
             <button onClick={()=>setIsCalling(true)} className="text-gray-600 hover:text-blue-500">
                <Video color="white" size={18} />
              </button>
            {isCalling && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-600 transition-opacity duration-300"
                />
            )}
            {isCalling && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white shadow-2xl rounded-2xl px-10 py-8 w-96   animate-fade-in text-center space-y-8">

                        <div className="flex flex-col items-center space-y-4">
                            {/* User Image */}
                            <div className="w-20 h-20 rounded-full ring ring-violet-400 overflow-hidden shadow-lg">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg" // Dummy image for Andy
                                    alt="Andy"
                                    className="w-25 h-25 object-cover "
                                />
                            </div>
                            <span className="text-sm font-semibold text-violet-800">Calling Andy...</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-around mt-10">
                            <button
                                onClick={() => setIsCalling(false)}
                                className="p-4  bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all shadow-md"
                                title="Disconnect"
                            >
                                <PhoneOff className="w-7 h-7" />
                            </button>

                            <button
                                onClick={() => alert("Call connected")}
                                className="p-4 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-all shadow-md"
                                title="Accept"
                            >
                                <Phone className="w-8 h-8" />
                            </button>

                            <button
                                onClick={() => alert("Recording started")}
                                className="p-4 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-all shadow-md"
                                title="Start Recording"
                            >
                                <CircleDot className="w-7 h-7" />
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Index;
