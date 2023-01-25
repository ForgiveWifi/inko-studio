import { v4 } from "uuid"
import { storage } from "./storage";
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import html2canvas from "html2canvas";

async function uploadFirebase(user, folder, name, image) {
  const uuid = name + v4()
  const image_ref = ref(storage, `${user.email}/${folder}/${uuid}`)
  await uploadBytes(image_ref, image)
  const url = await getDownloadURL(image_ref)
  return({
    name: uuid,
    url: url,
    ref: image_ref
  })
}

async function deleteFirebase(user, folder, name) {
  const image_ref = ref(storage, `${user.email}/${folder}/${name}`)
  deleteObject(image_ref)
}

async function screenshot(user, id, name) {
  const canvas = await html2canvas(document.getElementById(id))
  const screenshot = await new Promise((resolve) => canvas.toBlob( async function(blob) {
    const image = new Image()
    image.src = blob
    let file = new File([blob], "preview.jpg", { type: "image/jpeg" })
    const image_ref = ref(storage, `${user.email}/${id}/${name}_${id}`)
    await uploadBytes(image_ref, file)
    const url = await getDownloadURL(image_ref) 
    resolve({
      name: name,
      url: url,
      ref: image_ref
    })
  }))
  return(screenshot)
}

export { uploadFirebase, deleteFirebase, screenshot };