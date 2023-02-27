import { TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import AddButton from "../../ui/AddButton";
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import DeleteModal from "../../ui/DeleteModal";
import useRefresh from "../../ui/useRefresh";
import useRemove from "../../ui/useRemove";
import SinglePrinter from "./SinglePrinter";
import usePrinters from "./usePrinters";

function Printer() {

  const [name, setName] = useState("")
  const { change, refresh } = useRefresh()
  const { printers } = usePrinters(change)
  const { remove, isRemove, openRemove, closeRemove } = useRemove()

  async function postPrinter() {
    if (!name) {
      showError("name", null, `Missing printer name!`)
      return
    }
    showLoading(name, null, `Adding printer: ${name}...`)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/printer`, {
        name: name
      })
      refresh()
      setName("")
      updateSuccess(name, null, `Added printer:  ${name}`)
    }
    catch (err) {
      updateError(name, null, `Failed to add printer!`)
    }
  }

  async function deletePrinter() {
    const { id, name } = remove
    showLoading(id, null, `Deleting: ${name}...`)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/printer/${id}`)
      refresh()
      closeRemove()
      updateSuccess(id, null, `Deleted: ${name}`)
    }
    catch (err) {
      console.log(err)
      updateError(id, null, `Failed to delete: ${name}!`)
    }
  }

  const list = !printers ? [] : printers

  return (
    <>
      <DeleteModal text={remove.name} open={isRemove} cancel={closeRemove} confirm={deletePrinter} />
      <div className="full-width" style={{ maxWidth: 325 }}>
        <h2>Printer</h2>
        <div className="flexbox-column full-width" style={{ gap: 5 }}>
          <div className="flexbox-row full-width" style={{ height: 36, gap: 5 }}>
            <TextInput value={name} onChange={event => setName(event.currentTarget.value)} className="full-width" placeholder="Name" autoComplete="off" />
            <div className="flexbox-row margin-left" style={{ gap: 5 }}>
              <AddButton text="printer" onClick={postPrinter} />
            </div>
          </div>
          {
            list.map((printer, i) => {
              return (
                <SinglePrinter key={printer.id} printer={printer} openRemove={openRemove} refresh={refresh} />
              )
            })
          }
        </div>
      </div>

    </>
  );
}

export default Printer;