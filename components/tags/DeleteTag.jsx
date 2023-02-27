import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { showLoading, updateError, updateSuccess } from "../ui/alerts";
import { deleteFirebase } from "../../lib/firebaseFunctions"
import PalletDimensions from '../ui/PalletDimensions';
import DeleteModal from '../ui/DeleteModal';

function DeleteTag({ tag, isRemove, closeRemove, refresh }) {

  const { user } = useUser()

  async function deleteTag() {
    try {
      const { id, tags, design } = tag
      const { size_id } = tags
      showLoading(id, null, `Deleting ${size_id} tag...`)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tag/${id}`)
      await deleteFirebase(user, `tags/${size_id}`, design.art_file)
      refresh()
      closeRemove()
      updateSuccess(id, null, `Deleted ${size_id} tag!`)
    }
    catch (err) {
      updateError(id, `Problem deleting ${size_id} tag`, "Contact us!")
    }
  }

  return (
    <>
      <DeleteModal text={tag ? tag.tags.size_id : null} open={isRemove} cancel={closeRemove} confirm={deleteTag} right={<PalletDimensions pallet={tag ? tag.tags.pallet : null} />}>
        {
          tag ?
            <>
              <img src={tag.design.art_url} className="full-width" style={{ marginTop: 10 }} />
              <div className='flexbox full-width' >
              </div>
            </> :
            null
        }
      </DeleteModal>

    </>
  );
}

export default DeleteTag;