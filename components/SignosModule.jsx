import { useState } from "react";
import { motion } from "framer-motion";

export default function SignosModule({ setProgreso }) {
    const [nivel, setNivel] = useState(1);
    const [respuesta, setRespuesta] = useState("");
    const [feedback, setFeedback] = useState("");

    const niveles = {
        1: {
            titulo: "Uso del punto y la coma",
            contenido: `🔹 Punto (.): indica una pausa completa
Ej: El estudiante estudia. Luego descansa.

🔹 Coma (,): separa elementos o ideas
Ej: Compré pan, leche y frutas.`
        },
        2: {
            titulo: "Uso de la coma en oraciones",
            contenido: `🔹 Se usa para separar elementos en una lista
Ej: Juan, Pedro y María vinieron.

🔹 Se usa antes de conectores
Ej: Estudió mucho, pero no aprobó.`
        },
        3: {
            titulo: "Signos auxiliares",
            contenido: `🔹 Interrogación (¿ ?)
Ej: ¿Cómo estás?

🔹 Exclamación (¡ !)
Ej: ¡Qué sorpresa!`
        }
    };

    const verificarRespuesta = (opcion) => {
        setRespuesta(opcion);

        if (nivel === 4) {
            if (opcion === "Hola, ¿cómo estás?") {
                setFeedback("✅ ¡Correcto! Usaste correctamente la coma y el signo de interrogación.");

                // 🔥 marcar progreso
                setProgreso(prev => ({
                    ...prev,
                    signos: true
                }));

            } else {
                setFeedback("❌ Revisa el uso de la coma y los signos de interrogación.");
            }
        }
    };

    const totalNiveles = 4;
    const progreso = (nivel / totalNiveles) * 100;

    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Progreso */}
            <p className="text-sm text-gray-500 mb-1">
                Nivel {nivel} de 4
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
                <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${progreso}%` }}
                ></div>
            </div>

            {/* Contenido */}
            {nivel <= 3 && (
                <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                        {niveles[nivel].titulo}
                    </h2>

                    <p className="whitespace-pre-line text-gray-700">
                        {niveles[nivel].contenido}
                    </p>

                    <p className="mt-4 text-sm text-indigo-600">
                        💡 Consejo: los signos organizan el sentido del texto.
                    </p>
                </div>
            )}

            {/* Nivel 4 */}
            {nivel === 4 && (
                <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                        Nivel 4: Practica
                    </h2>

                    <p className="mb-2 text-indigo-700">Selecciona la oración correcta:</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => verificarRespuesta("Hola como estas")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            Hola como estas
                        </button>

                        <button
                            onClick={() => verificarRespuesta("Hola, ¿cómo estás?")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            Hola, ¿cómo estás?
                        </button>
                    </div>

                    {feedback && (
                        <p className="mt-4 text-gray-700">{feedback}</p>
                    )}
                </div>
            )}

            {/* Navegación */}
            <div className="flex justify-between mt-6">
                {nivel > 1 && (
                    <button
                        onClick={() => {
                            setNivel(nivel - 1);
                            setRespuesta("");
                            setFeedback("");
                        }}
                        className="bg-gray-300 px-4 py-2 rounded-lg"
                    >
                        ← Anterior
                    </button>
                )}

                {nivel < 4 && (
                    <button
                        onClick={() => {
                            setNivel(nivel + 1);
                            setRespuesta("");
                            setFeedback("");
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        Siguiente →
                    </button>
                )}
            </div>
        </motion.div>
    );
}