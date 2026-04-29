import { useState } from "react";
import Mascota from "./mascota";

export default function MascotaFlotante() {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Mensaje */}
            {hover && (
                <div className="mb-2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm animate-fadeIn">
                    ¡Hola, excelente escritor! 👋
                </div>
            )}

            {/* Mascota */}
            <div
                className={`transition duration-300 ${hover ? "scale-110 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]" : ""
                    }`}
            >
                <Mascota />
            </div>
        </div>
    );
}