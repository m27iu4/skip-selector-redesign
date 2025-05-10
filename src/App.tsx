import React, { useEffect, useState } from "react";

type Skip = {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  is_road_permitted: boolean;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

  const skipImages: Record<number, string> = {
    4: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
    6: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
    8: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg",
    10: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg",
    12: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg",
    14: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/14-yarder-skip.jpg",
    16: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/16-yarder-skip.jpg",
    20: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/18-yarder-skip.jpg",
    40: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg"
  };

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setSkips(data || []);
      });
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Choose Your Skip Size
        </h1>
        <h3 className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          Select the skip size that best suits your needs
        </h3>

        <div className="text-center mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:opacity-90 transition"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skips.map((skip) => (
            <div
              key={skip.id}
              className={`flex flex-col justify-between h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-105 ${
                selectedSkipId === skip.id
                  ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <img
                src={skipImages[skip.size]}
                alt={`${skip.size} Yard Skip`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skip.size} Yard Skip
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {skip.hire_period_days}-day hire period
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-bold">
                  {skip.transport_cost ? `£${skip.transport_cost}` : "Price on Request"}
                </p>
                {!skip.is_road_permitted && (
                  <p className="text-xs text-red-500 mt-1">🚫 Not Allowed On The Road</p>
                )}
                <button
                  onClick={() => setSelectedSkipId(skip.id)}
                  className={`mt-auto w-full py-2 rounded font-semibold transition ${
                    selectedSkipId === skip.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {selectedSkipId === skip.id ? "Selected" : "Select This Skip"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-24" /> {/* Spacer to prevent content behind bottom bar */}

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 sm:px-8">
          <button className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white font-semibold py-2 px-4 rounded">
            ⬅ Back
          </button>
          <button
            disabled={!selectedSkipId}
            className={`py-2 px-4 rounded font-semibold transition ${
              selectedSkipId
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;