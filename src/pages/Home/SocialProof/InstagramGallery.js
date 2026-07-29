import React from "react";

// Replace these with your actual images
// import insta1 from "../../../assets/images/instagram/insta1.jpg";
// import insta2 from "../../../assets/images/instagram/insta2.jpg";
// import insta3 from "../../../assets/images/instagram/insta3.jpg";
// import insta4 from "../../../assets/images/instagram/insta4.jpg";
// import insta5 from "../../../assets/images/instagram/insta5.jpg";
// import insta6 from "../../../assets/images/instagram/insta6.jpg";

const InstagramGallery = () => {
//   const images = [
//     insta1,
//     insta2,
//     insta3,
//     insta4,
//     insta5,
//     insta6,
//   ];

  return (
    <div className="grid grid-cols-3 gap-4">

      {images.map((image, index) => (

        <div
          key={index}
          className="
            overflow-hidden
            rounded-xl
            cursor-pointer
          "
        >
          <img
            src='image'
            alt={`Instagram ${index + 1}`}
            className="
              w-full
              aspect-square
              object-cover
              transition-transform
              duration-500
              hover:scale-110
            "
          />
        </div>

      ))}

    </div>
  );
};

export default InstagramGallery;