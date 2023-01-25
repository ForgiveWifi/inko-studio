import { useHover } from '@mantine/hooks';

function SingleImage({ image, onClick, noImage, dark }) {

  const { hovered, ref } = useHover()

  const border = hovered && noImage
  const { art_file, art_url, width, height, x_offset, y_offset } = image
  const isFile = art_file instanceof File

  return (
    <>
      <button
        ref={ref}
        onClick={onClick}
        className="flexbox"
        style={{
          cursor: "pointer",
          outline: border ? `1px dashed ${dark ? "white" : "black" }` : null,
          position: "absolute",
          left: x_offset,
          top: -(y_offset),
        }}>
        <img 
          draggable="false"
          src={ isFile ? URL.createObjectURL(art_file) : art_url }
          alt={ isFile ? art_file.name : art_file}
          style={{ width: parseInt(width), height: parseInt(height) }}
        />
      </button>
    </>
  );
}

export default SingleImage;