import { FC } from 'react';
import { Carousel } from 'rsuite';

const images = {
    english: [
        './english/1.webp',
        './english/2.webp',
        './english/3.webp',
        './english/4.webp',
    ],
    kannada: [
        './kannada/1.webp',
        './kannada/2.webp',
        './kannada/3.webp',
        './kannada/4.webp',
    ],
}

const Banner:FC<{language:"kannada" | "english"}> = ({language}) => {
    return (
      <Carousel autoplay className="banner-slider">
            {images[language].map((image, index) => (
                <img src={image} key={index} />
            ))}
        </Carousel>
    );
}

export default Banner
