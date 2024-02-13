import { useState } from "react";
import { Input } from "antd";

import "./profile.scss";

const FloatInput = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, required, onChange } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  return (
    <div
      className="float-label mt-3"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input onChange={onChange} type={type} defaultValue={value} />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;
