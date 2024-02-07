import "./styles/input.scss";
import Text from "./text";

const Input = ({ setInputValue, placeholder, type, label , errorlabel, validity }) => {
  
  return (
    <span className="inputFlex">
      <div className={`inputwrapper ${!validity && 'error'}` }>
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          onChange={setInputValue}
        />
      </div>
      <Text variant={validity ? "caption" : "caption-error"}  text={validity ? label: errorlabel}/>
    </span>
  );
};


Input.defaultProps = {
    validity: true,
};

export default Input;
