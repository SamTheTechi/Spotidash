import React from "react";
const Login = () => {
  return (
    <>
      <main className="bg-black  h-screen w-screen flex justify-center items-center">
        <article className="bg-gray-800 min-w-[70vh] aspect-[1.4/1] flex justify-center text-white items-center flex-col">
          <section className=" flex items-start justify-start h-[20%]  overflow-hidden">
            <img
              src="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
              alt=""
              className=" p-1 min-h-[70%]"
            />
            <h2 className=" p-1">SpotiDash</h2>
          </section>
          <section className=" h-[50%] ">Login in to SpotiDash</section>
          <section className=" h-[30%] ">
            <button>Log in</button>
          </section>
        </article>
      </main>
    </>
  );
};

export default Login;
