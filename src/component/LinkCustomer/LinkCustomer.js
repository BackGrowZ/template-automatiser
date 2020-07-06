import React from 'react'
import { useHistory } from "react-router-dom";

export default function LinkCustomer(props) {
  let history = useHistory();     
  function handleClick(link) {
    history.push(link);
  }

  return (
    <span type="button" onClick={() => handleClick(props.link)}>
      {props.children}
    </span>
  );
}