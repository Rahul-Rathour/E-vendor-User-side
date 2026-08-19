import React, { useState, useRef } from "react";

const ZoomImage = ({ src }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

    const lastTapRef = useRef(0);

    const isDragging = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 });
    const startPosition = useRef({ x: 0, y: 0 });

    // ==============================
    // Double Tap / Double Click
    // ==============================

    const handleDoubleTap = () => {
        setIsZoomed((prev) => {
            if (prev) {
                setPosition({ x: 0, y: 0 });
            }

            return !prev;
        });
    };

    // ==============================
    // Touch Start
    // ==============================

    const handleTouchStart = (e) => {
        const now = Date.now();

        if (now - lastTapRef.current < 300) {
            // Double tap
            handleDoubleTap();
        }

        lastTapRef.current = now;

        if (!isZoomed) return;

        const touch = e.touches[0];

        isDragging.current = true;

        startPoint.current = {
            x: touch.clientX,
            y: touch.clientY,
        };

        startPosition.current = {
            ...position,
        };
    };

    // ==============================
    // Touch Move / Swipe
    // ==============================

    const handleTouchMove = (e) => {
        if (!isZoomed || !isDragging.current) return;

        const touch = e.touches[0];

        const deltaX = touch.clientX - startPoint.current.x;
        const deltaY = touch.clientY - startPoint.current.y;

        const container = containerRef.current;

        if (!container) return;

        const rect = container.getBoundingClientRect();

        // Convert movement into percentage
        const moveX = (deltaX / rect.width) * 100;
        const moveY = (deltaY / rect.height) * 100;

        let newX = startPosition.current.x - moveX;
        let newY = startPosition.current.y - moveY;

        // Limit movement
        newX = Math.max(-25, Math.min(25, newX));
        newY = Math.max(-25, Math.min(25, newY));

        setPosition({
            x: newX,
            y: newY,
        });
    };

    // ==============================
    // Touch End
    // ==============================

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    // ==============================
    // Mouse Double Click
    // ==============================

    const handleDoubleClick = () => {
        handleDoubleTap();
    };

    // ==============================
    // Mouse Drag
    // ==============================

    const handleMouseDown = (e) => {
        if (!isZoomed) return;

        isDragging.current = true;

        startPoint.current = {
            x: e.clientX,
            y: e.clientY,
        };

        startPosition.current = {
            ...position,
        };
    };

    const handleMouseMove = (e) => {
        if (!isZoomed || !isDragging.current) return;

        const deltaX = e.clientX - startPoint.current.x;
        const deltaY = e.clientY - startPoint.current.y;

        const container = containerRef.current;

        if (!container) return;

        const rect = container.getBoundingClientRect();

        const moveX = (deltaX / rect.width) * 100;
        const moveY = (deltaY / rect.height) * 100;

        let newX = startPosition.current.x - moveX;
        let newY = startPosition.current.y - moveY;

        newX = Math.max(-25, Math.min(25, newX));
        newY = Math.max(-25, Math.min(25, newY));

        setPosition({
            x: newX,
            y: newY,
        });
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden ${
                isZoomed ? "cursor-grab" : "cursor-pointer"
            }`}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                touchAction: isZoomed ? "none" : "pan-y",
            }}
        >
            <img
                src={src}
                alt="product"
                draggable={false}
                className="w-full h-full object-contain select-none"
                style={{
                    transform: isZoomed
                        ? `scale(2.5) translate(${position.x}%, ${position.y}%)`
                        : "scale(1)",

                    transition: isDragging.current
                        ? "none"
                        : "transform 0.3s ease",

                    transformOrigin: "center center",
                }}
            />
        </div>
    );
};

export default ZoomImage;