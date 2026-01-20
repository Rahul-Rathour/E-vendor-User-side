import React from "react";

const ProductThumbnails = ({ productInfo, setSelectedMedia }) => {
    
    const images = [
        productInfo.image,
        productInfo.image2,
        productInfo.image3,
        productInfo.image4,
    ].filter(Boolean);

    // Extract YouTube ID
    const videoID = productInfo.video_link
        ? productInfo.video_link.split("shorts/")[1]?.split("?")[0] ||
          productInfo.video_link.split("v=")[1]?.split("&")[0]
        : null;

    // Always works on mobile
    const videoThumbnail = videoID
        ? `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`
        : null;

    return (
        <div>
            <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
                Product Media
            </h3>

            <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
                
                {/* IMAGES */}
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={`${process.env.REACT_APP_API_URL}/public/${img}`}
                        className="w-24 h-24 object-cover border rounded-md cursor-pointer 
                        hover:opacity-80 flex-shrink-0"
                        onClick={() => setSelectedMedia({ type: "image", value: img })}
                        alt="thumb"
                    />
                ))}

                {/* VIDEO THUMBNAIL */}
                {videoThumbnail && (
                    <div 
                        className="relative cursor-pointer flex-shrink-0"
                        onClick={() => setSelectedMedia({ type: "video", value: videoID })}
                    >
                        <img
                            src={videoThumbnail}
                            className="w-24 h-24 object-cover border rounded-md hover:opacity-75"
                            alt="video-thumb"
                        />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 p-2 rounded-full">
                                ▶
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductThumbnails;
