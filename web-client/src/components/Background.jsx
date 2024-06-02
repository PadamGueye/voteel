import React, {useCallback} from "react";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

const Background = () => {

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
    }, []);




    return (
        <Particles
            className="absolute "
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {

                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: ["push", "remove"],
                        },
                        onHover: {
                            enable: true,
                            mode: ["grab"],
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        grab: {
                            distance: 100,
                            line_linked: {
                                opacity: 0.8
                            }
                        },
                        remove: {
                            quantity: 4
                        }
                    },
                },
                particles: {
                    color: {
                        value: "#4ade80",
                    },
                    links: {
                        color: "#4ade80",
                        distance: 140,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: {min : 1, max: 2},
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1000,
                        },
                        value: 70,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                            type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default Background;