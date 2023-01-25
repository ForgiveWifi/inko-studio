
import { useState, forwardRef, useImperativeHandle } from "react";
import formatPhoneNumber from "../../lib/phoneNumberFormat"
import styles from "../../styles/Home.module.css"

function PhoneNumber(props, ref) {

  const [input, changeInput] = useState("")

  useImperativeHandle(ref, () => ({
    clearInput() {
      changeInput("");
    }
  }));

  const handleInput = e => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    changeInput(formattedNumber)
  }

  return (
    <div className="flexbox-column-start span2" >
      <label className="label">phone number</label>
      <input ref={ref} onChange={e => handleInput(e)} value={input} name="phoneNumber" type="text" className={styles["input-field"]}></input>
    </div>
  );
}

export default forwardRef(PhoneNumber);