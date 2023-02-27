import { useState } from "react";

function useEdit() {

  const [edit, setEdit] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  function openEdit(value) {
    setEdit(value)
    setIsEdit(true)
  }

  function closeEdit() {
    setIsEdit(false)
  }

  return ({ edit, isEdit, openEdit, closeEdit });
}

export default useEdit; 