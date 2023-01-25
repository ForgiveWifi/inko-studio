import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';

function LineCarousel() {


  return (
    <Carousel
      sx={{ maxWidth: 150 }}
      mx="auto"
      withIndicators
      height={150}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
}

export default LineCarousel;