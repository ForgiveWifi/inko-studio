import { Carousel } from '@mantine/carousel'
import { useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr"

function ProductCarousel({images, name, setCurrentSlide}) {

  const [loaded, setLoaded] = useState(false)
  
  if (false) { //(images.length > 1) {
  return (
    <>
      <Carousel 
        sx={{width: "100%"}} 
        slideSize="100%" 
        height="100%" 
        withIndicators 
        loop={true}
        nextControlIcon={<GrFormNextLink />}
        previousControlIcon={<GrFormPreviousLink/>}
        onSlideChange={e => setCurrentSlide(e)}>
        {
          images.map((image, i) => {
            return(
              <img key={i} src={image} alt={name} className="full-width radius10" draggable={false}/>
            )
          })
        }
      </Carousel>
    </>
  )
  } else {
  return(
    <>
      <div className="full-width radius10" stlye={{ width: 600}}>
        <img src={images[0]} alt={name} onLoad={() => setLoaded(true)} className="radius10" style={loaded ? { width: "100%"} : { display: "none"}} />
        {/* { !loaded ? <div className="flexbox full-width background3 radius10" stlye={{ width: 500, height: 100}}></div> : null} */}
      </div>
    </>
  )}
}

export default ProductCarousel;