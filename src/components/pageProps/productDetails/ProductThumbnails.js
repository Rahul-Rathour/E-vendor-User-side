import React from "react";

const ProductThumbnails = ({ productInfo, selectedColor, setSelectedMedia }) => {
    const mainImages = [
        productInfo.image,
        productInfo.image2,
        productInfo.image3,
        productInfo.image4,
    ].filter(Boolean);

    const colorImages = selectedColor?.images || [];

    // Combine main images + selected color images
    const allThumbnails = [...mainImages, ...colorImages.map((img) => img.image_path)];

    const videoID = productInfo.video_link
        ? productInfo.video_link.split("shorts/")[1]?.split("?")[0] ||
        productInfo.video_link.split("v=")[1]?.split("&")[0]
        : null;

    return (
        <div>
            <h3 className="font-semibold text-xl mb-4">Product Gallery</h3>

            <div className="flex gap-3 overflow-x-auto pb-4 md:flex-col md:overflow-visible">
                {allThumbnails.map((img, i) => (
                    <img
                        key={i}
                        src={`${process.env.REACT_APP_API_URL}/public/${img}`}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-200 hover:border-black"
                        onClick={() => setSelectedMedia({ type: "image", value: img })}
                        alt=""
                    />
                ))}

                {/* Video Thumbnail */}
                {videoID && (
                    <div
                        className="relative w-20 h-20 flex-shrink-0 cursor-pointer"
                        onClick={() => setSelectedMedia({ type: "video", value: videoID })}
                    >
                        <img
                            src={`https://img.youtube.com/vi/${videoID}/mqdefault.jpg`}
                            className="w-full h-full object-cover rounded-lg"
                            alt="video"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                            ▶
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductThumbnails;