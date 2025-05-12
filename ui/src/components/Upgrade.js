const Upgrade = ({ isCollapsed }) => {
    return <div className={`absolute bottom-0 pr-5 transition-all duration-300 ${isCollapsed ? "hidden" : ""} mb-3`}>
        <div class="  bg-violet-600 rounded-lg p-4 text-center shadow-lg">
            <div class="flex justify-center mb-3">
                <div class="bg-blue-500 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21a12.083 12.083 0 01-6.16-10.422L12 14z" />
                    </svg>
                </div>
            </div>
            <h2 class="text-sm font-semibold text-white">Upgrade Premium</h2>
            <p class="text-xs text-gray-300 mt-1 mb-3 leading-tight">
                Elevate your reach to our extensive resume database
            </p>
            <button class="bg-green-300 hover:bg-yellow-400 text-black text-xs font-semibold py-1 px-3 rounded-full">
                Upgrade now
            </button>
        </div>
        <p class="text-center text-[10px] text-white mt-2">
            Copyright © 2023 By Merkulove. <br class="block sm:hidden" /> All Rights Reserved
        </p>
    </div>
}

export default Upgrade;