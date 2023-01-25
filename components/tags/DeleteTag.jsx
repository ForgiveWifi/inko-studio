import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { showLoading, updateError, updateSuccess } from "../ui/alerts";
import { deleteFirebase } from "../../lib/firebaseFunctions"
import HorzDivider from "../ui/HorzDivider";

function DeleteTag({tag, close, toggleChange}) {

  const { user } = useUser()

  async function deleteTag() {
    const { size, design } = tag
    try {
      showLoading(size, null, `Deleting ${size} tag...`)
      await deleteFirebase(user, "tags", design.art_file)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tags/${size}`)
      close()
      updateSuccess(size, null, `Deleted ${size} tag!`)
      toggleChange()
    }
    catch (err) {
      console.log(err)
      updateError(size, `Server error: delete ${size} tag`, "Contact Us!")
    }
  }

  if (!tag) {
    return null
  }
  return (
    <>
      <div className="flexbox-column-start" style={{ width: 275}}>
        <h3>{`Delete ${tag.size} tag?`}</h3>
        <HorzDivider margin="10px 0px"/>
        <div className="flexbox-row margin-left" style={{ gap: 5, marginTop: 5}}>
          <button onClick={close} style={{ padding: "2px 6px" }}>cancel</button>
          <button onClick={() => deleteTag()} className="flexbox margin-left radius5 red-background" style={{ padding: "2px 6px" }}>
            delete
          </button>
        </div>
      </div> 
    </>
  );
}

export default DeleteTag;