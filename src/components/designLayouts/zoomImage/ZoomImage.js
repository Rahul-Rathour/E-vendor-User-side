import React, { useState, useRef, useEffect } from "react";

const ZoomImage = ({ src }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

    const lastTapRef = useRef(0);

    const isDragging = useRef(false);

    const startPoint = useRef({
        x: 0,
        y: 0,
    });

    const startPosition = useRef({
        x: 0,
        y: 0,
    });

    // ==========================================
    // Open Fullscreen
    // ==========================================

    const openFullscreen = () => {
        setIsFullscreen(true);
        setIsZoomed(false);
        setPosition({ x: 0, y: 0 });
    };

    // ==========================================
    // Close Fullscreen
    // ==========================================

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setIsZoomed(false);
        setPosition({ x: 0, y: 0 });
    };

    // ==========================================
    // Reset Zoom
    // ==========================================

    const resetZoom = () => {
        setIsZoomed(false);
        setPosition({
            x: 0,
            y: 0,
        });
    };

    // ==========================================
    // Toggle Zoom
    // ==========================================

    const toggleZoom = () => {
        setIsZoomed((prev) => {
            if (prev) {
                setPosition({
                    x: 0,
                    y: 0,
                });
            }

            return !prev;
        });
    };

    // ==========================================
    // Double Tap
    // ==========================================

    const handleDoubleTap = (e) => {
        if (e) {
            e.stopPropagation();
        }

        toggleZoom();
    };

    // ==========================================
    // Single Click
    // ==========================================

    const handleImageClick = () => {
        if (!isFullscreen) {
            openFullscreen();
        }
    };

    // ==========================================
    // Touch Start
    // ==========================================

    const handleTouchStart = (e) => {

        const now = Date.now();

        // Double tap detection
        if (now - lastTapRef.current < 300) {

            handleDoubleTap(e);

            lastTapRef.current = 0;

            return;
        }

        lastTapRef.current = now;

        // If not zoomed, don't start dragging
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

    // ==========================================
    // Touch Move
    // ==========================================

    const handleTouchMove = (e) => {

        if (!isFullscreen || !isZoomed || !isDragging.current) {
            return;
        }

        e.preventDefault();

        const touch = e.touches[0];

        const deltaX =
            touch.clientX - startPoint.current.x;

        const deltaY =
            touch.clientY - startPoint.current.y;

        const container = containerRef.current;

        if (!container) return;

        const rect =
            container.getBoundingClientRect();

        const moveX =
            (deltaX / rect.width) * 100;

        const moveY =
            (deltaY / rect.height) * 100;

        let newX =
            startPosition.current.x + moveX;

        let newY =
            startPosition.current.y + moveY;

        // Limit movement
        newX = Math.max(
            -30,
            Math.min(30, newX)
        );

        newY = Math.max(
            -30,
            Math.min(30, newY)
        );

        setPosition({
            x: newX,
            y: newY,
        });
    };

    // ==========================================
    // Touch End
    // ==========================================

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    // ==========================================
    // Mouse Double Click
    // ==========================================

    const handleDoubleClick = (e) => {

        e.stopPropagation();

        if (!isFullscreen) {
            openFullscreen();
            return;
        }

        toggleZoom();
    };

    // ==========================================
    // Mouse Down
    // ==========================================

    const handleMouseDown = (e) => {

        if (!isFullscreen || !isZoomed) {
            return;
        }

        isDragging.current = true;

        startPoint.current = {
            x: e.clientX,
            y: e.clientY,
        };

        startPosition.current = {
            ...position,
        };
    };

    // ==========================================
    // Mouse Move
    // ==========================================

    const handleMouseMove = (e) => {

        if (
            !isFullscreen ||
            !isZoomed ||
            !isDragging.current
        ) {
            return;
        }

        const deltaX =
            e.clientX - startPoint.current.x;

        const deltaY =
            e.clientY - startPoint.current.y;

        const container =
            containerRef.current;

        if (!container) return;

        const rect =
            container.getBoundingClientRect();

        const moveX =
            (deltaX / rect.width) * 100;

        const moveY =
            (deltaY / rect.height) * 100;

        let newX =
            startPosition.current.x + moveX;

        let newY =
            startPosition.current.y + moveY;

        newX = Math.max(
            -30,
            Math.min(30, newX)
        );

        newY = Math.max(
            -30,
            Math.min(30, newY)
        );

        setPosition({
            x: newX,
            y: newY,
        });
    };

    // ==========================================
    // Mouse Up
    // ==========================================

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    // ==========================================
    // ESC Key
    // ==========================================

    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.key === "Escape") {

                if (isZoomed) {
                    resetZoom();
                } else if (isFullscreen) {
                    closeFullscreen();
                }
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [isFullscreen, isZoomed]);

    // ==========================================
    // Prevent Body Scroll
    // ==========================================

    useEffect(() => {

        if (isFullscreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };

    }, [isFullscreen]);

    // ==========================================
    // Image Transform
    // ==========================================

    const imageTransform = isZoomed
        ? `scale(2.5) translate(${position.x}%, ${position.y}%)`
        : "scale(1)";

    return (
        <>
            {/* =====================================
                NORMAL PRODUCT IMAGE
            ===================================== */}

            <div
                className="
                    relative
                    w-full
                    h-full
                    overflow-hidden
                    cursor-pointer
                "
                onClick={handleImageClick}
            >

                <img
                    src={src}
                    alt="product"
                    draggable={false}
                    className="
                        w-full
                        h-full
                        object-contain
                        select-none
                    "
                />

                {/* Zoom Hint */}

                <div
                    className="
                        absolute
                        bottom-3
                        right-3
                        bg-black/60
                        text-white
                        text-xs
                        px-3
                        py-2
                        rounded-full
                        pointer-events-none
                    "
                >
                    Tap to view
                </div>

            </div>


            {/* =====================================
                FULLSCREEN VIEWER
            ===================================== */}

            {isFullscreen && (

                <div
                    ref={containerRef}
                    className="
                        fixed
                        inset-0
                        z-[9999]
                        bg-black
                        flex
                        items-center
                        justify-center
                    "
                    onClick={(e) => {

                        // Only close when clicking
                        // the empty background

                        if (
                            e.target === e.currentTarget
                        ) {
                            closeFullscreen();
                        }

                    }}
                    onDoubleClick={handleDoubleClick}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        touchAction:
                            isZoomed
                                ? "none"
                                : "pan-y",
                    }}
                >

                    {/* =================================
                        CLOSE BUTTON
                    ================================= */}

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeFullscreen();
                        }}
                        className="
                            absolute
                            top-5
                            right-5
                            z-50
                            w-11
                            h-11
                            rounded-full
                            bg-white/90
                            text-black
                            flex
                            items-center
                            justify-center
                            text-2xl
                            font-bold
                            shadow-lg
                            hover:bg-white
                            transition
                        "
                    >
                        ×
                    </button>


                    {/* =================================
                        ZOOM STATUS
                    ================================= */}

                    <div
                        className="
                            absolute
                            top-6
                            left-1/2
                            -translate-x-1/2
                            z-40
                            bg-black/60
                            text-white
                            text-xs
                            px-4
                            py-2
                            rounded-full
                            pointer-events-none
                        "
                    >
                        {isZoomed
                            ? "Double tap to zoom out"
                            : "Double tap to zoom"}
                    </div>


                    {/* =================================
                        FULLSCREEN IMAGE
                    ================================= */}

                    <img
                        src={src}
                        alt="product fullscreen"
                        draggable={false}
                        className="
                            max-w-full
                            max-h-full
                            object-contain
                            select-none
                        "
                        style={{
                            transform:
                                imageTransform,

                            transition:
                                isDragging.current
                                    ? "none"
                                    : "transform 0.3s ease",

                            transformOrigin:
                                "center center",

                            cursor:
                                isZoomed
                                    ? "grab"
                                    : "zoom-in",

                            userSelect: "none",
                        }}
                    />

                    {/* =================================
                        BOTTOM HINT
                    ================================= */}

                    <div
                        className="
                            absolute
                            bottom-6
                            left-1/2
                            -translate-x-1/2
                            bg-black/60
                            text-white
                            text-sm
                            px-5
                            py-2
                            rounded-full
                            pointer-events-none
                        "
                    >
                        {isZoomed
                            ? "Swipe to explore"
                            : "Double tap to zoom"}
                    </div>

                </div>
            )}
        </>
    );
};

export default ZoomImage;