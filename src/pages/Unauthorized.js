import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col w-full max-w-md max-h-sm justify-start p-5 rounded-xl drop-shadow-2xl bg-red-400 ">
      <h1 className="text-white">Unauthorized!</h1>
      <br />
      <p className="text-white">
        You do not have access to the requested page.
      </p>
      <div className="">
        <button
          className="text-white p-1 px-4 mt-4 shadow-lg bg-red-900 rounded-xl"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
