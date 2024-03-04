"use client";

import cambodiaGazetteer from "cambodia-gazetteer";
import { useState } from "react";

// import { useState } from "react";

export default function Home() {
  const [country, setCountry] = useState("phnom penh");
  const [weather, setWeather] = useState();

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=f66c6717703ba6c5b739cc1b8aa8650a&units=metric`
      );
      const responseData = await response.json();
      setWeather(responseData);
      console.log("Data inserted successfully:", responseData);

      // Update UI to reflect success
    } catch (error) {
      console.error("Error:", error);
      // Handle errors and display user-friendly messages
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between px-5 py-5 md:w-[600px] m-auto">
      {/* {console.log([data])} */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-center text-base font-semibold leading-7 text-gray-900">
              Choose One Province
            </h2>
            <p className=" text-center mt-1 text-sm leading-6 text-gray-600">
              Check weather your province or other
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Province Cambodia
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="h-[50px] block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  >
                    <option value={"phnom penh"}>Phnom Penh</option>

                    {cambodiaGazetteer.cambodia_gazetterr.map((item, id) => (
                      <option value={item.latin} key={id}>
                        {" "}
                        {item.latin}
                      </option>
                    ))}
                    {/* <option>Mexico</option> */}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Weather
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    defaultValue={
                      weather !== undefined
                        ? Math.ceil(weather.main.temp) + "°C"
                        : ""
                    }
                    autoComplete="address-level2"
                    className=" h-[50px] block w-full rounded-md  px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-[0.7px] border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Check
          </button>
        </div>
      </form>
    </main>
  );
}
