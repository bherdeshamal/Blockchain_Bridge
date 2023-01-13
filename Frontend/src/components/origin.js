import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

function OriginToken() {
  const [values, setValues] = useState({ amount: "" });
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["address"]);
  const [account, setDefaultAccount] = useState(null);

  console.log("address ", cookies.address);
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cookies.address != null) {
      try {
        setLoading(true);
        const resultApprove = await axios.post(
          "http://localhost:4000/ApproveOrigin",
          {
            amount: values.amount,
          }
        );

        const result = await axios.post(
          "http://localhost:4000/transferTokenOnOrigin",
          {
            amount: values.amount,
            //   userId: JSON.parse(localStorage.getItem("user")),
          }
        );

        setLoading(false);
        console.log(result, resultApprove);
        toast(`${result.data}🦄`, {
          // theme: "dark",
          position: "bottom-right",
        });
      } catch (ex) {
        setLoading(false);
        console.log(ex);
        toast(`${ex}🦄`, {
          // theme: "dark",
          position: "bottom-right",
        });
      }
    } else {
      generateError("please sign in to metamask first");
    }
  };

  useEffect(() => {
    setValues({ ...values });
    setCookie(cookies.address);
    // userId: JSON.parse(localStorage.getItem("user")) });
  }, []);

  return (
    <>
      <div className="container">
        <div className="card w-full md:w-196 items-center shadow-1xl bg-base-80">
          <br />
          <div class="flex space-x-2 justify-center">
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              ETH TO MATIC
            </button>
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              MATIC TO ETH
            </button>
          </div>
        </div>
        <br />
        <h3 className="text-center normal-case text-2xl">
          Bridge from Goerli ETH to Mumbai Matic side
        </h3>
        <br />
        <h3 className="text-center normal-case text-2xl">
          This Bridge is allows you to send chainstack Dollars from Goerli ETH
          side to Mumbai Matic side
        </h3>

        <br />

        <div class="flex justify-center">
          <div>
            <br />
            <ToastContainer />

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="card-body w-full lg:w-96"
            >
              <h3 className="text-center normal-case text-2xl">
                Connected Address is
                {(e) => setValues({ ...values, amount: e.target.value })}
              </h3>

              <div class="mb-3 xl:w-96">
                <label
                  for="exampleFormControlInput2"
                  class="form-label inline-block mb-2 text-gray-700 text-xl"
                >
                  <br />
                  How much CHSD do you want to bridge
                </label>

                <input
                  type="text"
                  class=" form-control block w-full px-4 py-2 text-xl font-normal text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                  id="exampleFormControlInput2"
                  placeholder="Enter Amount of Tokens"
                  name="amount"
                  onChange={(e) =>
                    setValues({ ...values, amount: e.target.value })
                  }
                />
              </div>
              <div class="flex space-x-2 justify-center">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Bridge To Mumbai Network"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default OriginToken;
