
import { useRef } from 'react';
import { Group }  from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { cleanNotifications } from "@mantine/notifications";
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { showError } from '../ui/alerts';
import UploadFileIcon from '@mui/icons-material/UploadFile';


export function ImageUpload({ current, addFile, addCurrentToList}) {

  const openRef = useRef(null);

  return (
    <div className='flexbox-column full-width' style={{ position: "relative"}}>
      <Dropzone
        name='File Upload'
        openRef={openRef}
        onDrop={(file) => {
          // if (current.art_file) {
          //   addCurrentToList()
          // }
          addFile(file)
          cleanNotifications()
        }}
        onReject={() => showError("file-error", null, `File error`)}
        radius="md"
        accept={['image/png', 'image/jpeg']}
        maxFiles={1}
        maxSize={10 * 1024 ** 2}
        className="full-width shadow2"
        style={{ marginBottom: "20px", backgroundColor: 'rgba(210,210,210,0.2)', borderColor: "white" }}
      >
        <div style={{ pointerEvents: 'none', padding: 5 }}>
          <Group position="center">
            <Dropzone.Accept>
              <DownloadIcon style={{fontSize: "30px", fill: "white"}}/>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <CloseIcon style={{fontSize: "30px", fill: "rgb(255, 81, 81)"}}/>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <WallpaperIcon style={{fontSize: "30px", fill: "white"}}/>
            </Dropzone.Idle>
          </Group>

          <Dropzone.Accept>
            <h3 className="text-center" style={{ marginTop: 15}}>Drop Image</h3>
          </Dropzone.Accept>
          <Dropzone.Reject>
            <h3 className="text-center" style={{ marginTop: 15}}>Invalid</h3>
          </Dropzone.Reject>
          <Dropzone.Idle>
            <h3 className="text-center" style={{ marginTop: 15}}>Drag Image</h3>
          </Dropzone.Idle>

          <div className='flexbox-column' style={{ margin: "10px 0px 5px"}}>
          <h5 className='text-center' style={{ fontSize: 14, fontWeight: 500}}>
             We recommend .png and .jpeg @300dpi.  You must own rights to images.
          </h5>
          </div>
        </div>
      </Dropzone>

        <div className="flexbox full-width">
          <button onClick={() => openRef.current?.()} className="flexbox white-background max-radius" style={{ position: "absolute", bottom: "2px", width: 120, height: 40}} >
            <div className='flexbox-row' style={{ gap: 5, marginRight: 3 }}>
              <UploadFileIcon style={{fill: "rgb(107, 116, 130)"}}/>
              <h5 className='grey-text' style={{ marginTop: 2 }}>Select</h5>
            </div>
          </button>
        </div>
      </div>
  );
}