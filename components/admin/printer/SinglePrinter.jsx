import { TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { showLoading, updateError, updateSuccess } from "../../ui/alerts";
import { ClearIcon, DeleteIcon, EditIcon, SaveIcon } from "../../ui/Icons";
import useEdit from "../../ui/useEdit";

function SinglePrinter({ printer, openRemove, refresh }) {

  const { id, name } = printer
  const { isEdit, closeEdit, openEdit } = useEdit()
  const [edit, setEdit] = useState(name)

  async function savePrinter() {

    showLoading(id, null, `Saving: ${edit}...`)
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/printer/${id}`, {
        name: edit
      })
      refresh()
      closeEdit()
      updateSuccess(id, null, `Saved: ${edit}`)
    }
    catch (err) {
      updateError(id, null, `Failed to save: ${edit}!`)
    }
  }

  return (
    <>
      <div className="flexbox-row full-width" style={{ height: 36, gap: 5 }}>
        {
          isEdit ?
            <TextInput value={edit} onChange={event => setEdit(event.currentTarget.value)} className="full-width" rightSection={isEdit ? <ClearIcon onClick={closeEdit} /> : null} autoComplete="off" /> :
            <div style={{ marginLeft: 8 }}>{printer.name}</div>
        }
        <div className="flexbox-row margin-left" style={{ gap: 5 }}>
          {!isEdit ? <EditIcon onClick={openEdit} /> : null}
          {isEdit ? <SaveIcon onClick={savePrinter} /> : <DeleteIcon onClick={() => openRemove(printer)} />}
        </div>
      </div>
    </>
  );
}

export default SinglePrinter;