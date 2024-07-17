import { Carousel } from "flowbite-react";

const EventDetailsPage = () => {
    return (
        <div className="w-screen h-screen flex flex-column flex-wrap">


            <div className="w-full h-[50%] flex flex-row border-[1px] border-green-500">
                <div className="w-[50%] h-[100%] border-[1px] border-red-600">

                    <Carousel slideInterval={1500}>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                    </Carousel>

                </div>
                <div className="w-[50%] h-[100%] border-[1px] border-blue-600">
                    <img src="https://tradfallarlaget.se/wp-content/uploads/2021/08/map-dummy-1400x583.jpg" className="w-full h-full" alt="" />
                </div>
            </div>


            <div className="w-full h-[50%] flex flex-row">
                <div className="w-[33.33%] h-full border-[1px] border-black">
                </div>
                <div className="w-[33.33%] h-full border-[1px] border-black"></div>
                <div className="w-[33.33%] h-full border-[1px] border-black"></div>
            </div>


        </div>
    )
}

export default EventDetailsPage
