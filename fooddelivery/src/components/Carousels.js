import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Carousels = () => {
    return (
        <>
            <div className='carousel'>
                <Carousel
                    showArrows={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    emulateTouch={true}
                    showThumbs={false}
                    showStatus={false}
                    interval={3000}
                >
                    <img src='/landing.jpg' alt='carousel' />
                    <img src='/1.jpg' alt='carousel' />
                    <img src='/2.jpg' alt='carousel' />
                </Carousel>
            </div>
        </>
    )
}
