import { useState } from "react";

function useRemove() {

  const [remove, setRemove] = useState(0)
  const [isRemove, setIsRemove] = useState(false)

  function openRemove(value) {
    setRemove(value)
    setIsRemove(true)
  }

  function closeRemove() {
    setIsRemove(false)
  }

  return ({ remove, isRemove, openRemove, closeRemove });
}

export default useRemove; 