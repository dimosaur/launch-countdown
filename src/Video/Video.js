import React, { useRef, useEffect } from 'react';

import styles from './Video.module.css'
import {clsx} from "clsx";

const GreenScreenRemover = ({mirrored}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const processFrame = () => {
            const { width = 1920, height = 1080 } = {};
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(video, 0, 0, width, height);

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];

                // Example: Remove green pixels (adjust this according to your specific green screen color)
                if (green > 100 && red < 100 && blue < 100) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(processFrame);
        };

        video.addEventListener('loadedmetadata', () => {
            processFrame();
        });

        video.play();

        return () => {
            video.removeEventListener('loadedmetadata', () => {
                processFrame();
            });
        };
    }, []);

    return (
        <div className={clsx(styles.wrapper, {[styles.mirrored]: mirrored})}>
            <video className={styles.video} ref={videoRef} src="/explosion.mp4" autoPlay muted  />
            <canvas ref={canvasRef} />
        </div>
    );
};

export default GreenScreenRemover;
