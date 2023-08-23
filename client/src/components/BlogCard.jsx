import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "./Modal";

export default function BlogCard({ title, blog }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpened(true)}
        className="group block max-w-lg p-6 border-2 border-purple-500 rounded-lg shadow-md h-48 overflow-hidden bg-white hover:shadow-lg hover:border-purple-700 transition duration-300"
      >
        <h5 className="text-lg md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent h-20 Montserrat font">
          {title}
        </h5>
        <p className="mt-14 text-gray-600 group-hover:text-gray-900 transition duration-300">
          {blog}
        </p>
      </button>

      {isOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <div className="flex flex-col h-96 w-96 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-pink-600">{title}</h2>
              <button
                onClick={() => setIsOpened(false)}
                className="text-gray-500 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="h-2 bg-gray-400 my-2"></div>
            <div className="overflow-y-auto text-black font-normal">{blog}</div>
          </div>
        </Modal>
      )}
    </>
  );
}

// prop validation
BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
};
