import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTag from "../../components/tags/AddTag";
import TagList from "../../components/tags/TagList";
import CloseButton from "../../components/ui/CloseButton";
import Loading from "../../components/ui/Loading";
import { showError } from "../../components/ui/alerts";
import AddIcon from '@mui/icons-material/Add';
import Heading from '../../components/ui/Heading';
import DeleteTag from '../../components/tags/DeleteTag';
import MyModal from '../../components/ui/MyModal';
import DeleteModal from "../../components/ui/DeleteModal"
import EditTag from '../../components/tags/EditTag';
import useRefresh from "../../components/ui/useRefresh"
import useEdit from "../../components/ui/useEdit"
import useRemove from "../../components/ui/useRemove"
import PalletDimensions from '../../components/ui/PalletDimensions';

function Tags() {

  const [tag, setTag] = useState(null)
  const [tags, setTags] = useState(null)
  const [add, setAdd] = useState(false)

  const { edit, isEdit, openEdit, closeEdit } = useEdit()
  const { remove, isRemove, openRemove, closeRemove } = useRemove()
  const { change, refresh } = useRefresh()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTag()
    async function fetchTag() {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tag`)
        setTag(res.data)
        setLoading(false)
      }
      catch (err) {
        showError("server-error", `Server error - tags`, "Contact us!")
      }
    }
  }, [change])

  useEffect(() => {
    fetchTags()
    async function fetchTags() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
      setTags(data)
      console.log("fetch")
    }
  }, [])

  return (
    <>
      <Loading loading={loading} />
      <div className='flexbox-column full-width'>
        <Heading text="Tags" />
        <div className='full-width'>
          <Button onClick={() => setAdd(true)} leftIcon={<AddIcon />} uppercase>New tag</Button>
        </div>
        <TagList tags={tag} openEdit={openEdit} openRemove={openRemove} />
        <MyModal open={add} size="sm">
          <CloseButton onClick={() => setAdd(false)} />
          <AddTag tags={tags} refresh={refresh} close={() => setAdd(false)} />
        </MyModal>
        <DeleteTag tag={tag ? tag[remove] : null} isRemove={isRemove} closeRemove={closeRemove} refresh={refresh} />
        <MyModal open={isEdit} size="sm">
          <EditTag tag={tag ? tag[edit] : null} closeEdit={closeEdit} refresh={refresh} />
        </MyModal>
      </div>
    </>
  );
}

export default withPageAuthRequired(Tags)
