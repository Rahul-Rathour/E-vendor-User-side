import React, { useState, useRef } from "react";

const ZoomImage = ({ src }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Base image */}
            <img
                src={src}
                alt="product"
                className="w-full object-cover transition-opacity"
            />

            {/* Zoomed image */}
            {isZoomed && (
                <img
                    src={src}
                    alt="zoomed"
                    className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                    style={{
                        transform: "scale(2.5)",  // Zoom strength (Amazon-ish)
                        transformOrigin: `${position.x}% ${position.y}%`,
                    }}
                />
            )}
        </div>
    );
};

export default ZoomImage;
