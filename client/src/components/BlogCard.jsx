import PropTypes from "prop-types";

export default function BlogCard({ title, blog }) {
  return (
    <a
      href="#"
      className="group block max-w-lg p-6 border-2 border-purple-500 rounded-lg shadow-md h-48 overflow-hidden bg-white hover:shadow-lg hover:border-purple-700 transition duration-300"
    >
      <h5 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent h-14 Montserrat font">
        {title}
      </h5>
      {console.log(blog)}
    </a>
  );
}

// prop validation
BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
};
