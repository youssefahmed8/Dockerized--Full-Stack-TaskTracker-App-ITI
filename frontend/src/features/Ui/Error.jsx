import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://i.postimg.cc/2yrFyxKv/giphy.gif"
            alt="404 gif"
            className="mx-auto w-64"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">This page is gone.</h1>
        <p className="text-lg  mb-6">
          maybe you are looking for another page....
        </p>
        <Link to="/" className="text-red-400">
          home page
        </Link>
      </div>
    </div>
  );
}

export default Error;
