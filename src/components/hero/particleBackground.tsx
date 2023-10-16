import { tsParticles } from "tsparticles-engine";
import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
    const particlesRef = useRef(null);

    useEffect(() => {
        if (particlesRef.current) {
            tsParticles
                .load("particles", {
                    fpsLimit: 60,
                    backgroundMode: {
                        enable: true,
                        zIndex: 0,
                    },
                    particles: {
                        number: {
                            value: 50,
                        },
                        size: {
                            value: 3,
                        },
                        links: {
                            color: "#ffffff",
                        },
                    },
                })
                .then((container) => {
                    console.log("Particles loaded");
                })
                .catch((error) => {
                    console.error("An error occurred while loading particles:", error);
                });
        }
    }, []);

    return (
        <div
            ref={particlesRef}
            id="particles"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 10,
            }}
        />
    );
};

export default ParticlesBackground;