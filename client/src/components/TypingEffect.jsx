import { TypeAnimation } from "react-type-animation";
import PropTypes from "prop-types";

const TypingEffect = ({ phrases, repeat, speed, style }) => {
  return (
    <TypeAnimation
      sequence={phrases}
      wrapper="span"
      speed={speed}
      style={style}
      repeat={repeat}
    />
  );
};

// validate props
TypingEffect.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
  repeat: PropTypes.number,
  speed: PropTypes.number,
  style: PropTypes.object,
};

export default TypingEffect;
