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
import EditTag from '../../components/tags/EditTag';
import DeleteModal from '../../components/ui/DeleteModal';

function Tags() { 

  const [tags, setTags] = useState(null)
  const [add, setAdd] = useState(false)
  const [remove, setRemove] = useState(null)
  const [edit, setEdit] = useState(null)
  const [change, setChange] = useState(false)
  const [loading, setLoading] = useState(false)

  const available_sizes = ["S", "M", "L", "XL"]
  const sizes = tags?.map((tag) => tag.size)
  const missingTags = available_sizes.filter((size) => !sizes?.includes(size))

  useEffect(() => {
    fetchTags()
    async function fetchTags() {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
        setTags(res.data)
        setLoading(false)
      }
      catch (err) {
        showError("server-error", `Server error - tags`, "Contact Us!")
      }
    }
  }, [change])

  function toggleChange() {
    setChange(!change)
  }

  return (
    <>
      { loading && <Loading /> }
      <div className='flexbox-column full-width'>
        <Heading text="Neck Tags" />
        <div className='full-width'>
          { missingTags.length !== 0 ? <Button onClick={() => setAdd(true)} leftIcon={<AddIcon/>} uppercase>New tag</Button> : null}
        </div>
        <TagList tags={tags} toggleChange={toggleChange} setRemove={setRemove} setEdit={setEdit}/>
        <MyModal open={add} size="sm">
          <CloseButton onClick={() => setAdd(false)}/>
          <AddTag missingTags={missingTags} toggleChange={toggleChange} close={() => setAdd(false)}/> 
        </MyModal>
        <MyModal open={remove !== null}>
          <DeleteTag tag={remove !== null ? tags[remove] : null} close={() => setRemove(null)} toggleChange={toggleChange}/>
        </MyModal>
        <MyModal open={edit !== null} >
          <EditTag tag={edit !== null  ? tags[edit] : null} close={() => setEdit(null)} toggleChange={toggleChange}/>
        </MyModal>
      </div>
    </>
  );
}

export default withPageAuthRequired(Tags)
