import PropTypes from "prop-types";

export default function Loading({ text }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="animate-spin rounded-full border-t-4 border-purple-700 border-opacity-100 h-16 w-16"></div>
      <div className="text-white text-2xl font-bold ml-4">{text}</div>
    </div>
  );
}

Loading.defaultProps = {
  text: "Loading...",
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};
