import { useState } from "react";
import { motion } from "framer-motion";

export default function GrafiasModule({ setProgreso }) {

    const [nivel, setNivel] = useState(1);
    const [respuesta, setRespuesta] = useState("");
    const [feedback, setFeedback] = useState("");
    const totalNiveles = 4;
    const progreso = (nivel / totalNiveles) * 100;
    const niveles = {
        1: {
            titulo: "Uso de B y V",
            contenido: `🔹 Se escribe con B:
- Verbos terminados en -bir (escribir, recibir)
- Después de m (también, cambio)

🔹 Se escribe con V:
- Después de n (invitar, enviar)
- Palabras con -ivo/-iva (activo, negativa)`
        },
        2: {
            titulo: "Uso de C, S y Z",
            contenido: `🔹 Se escribe con C:
- Terminaciones -ción (nación, educación)

🔹 Se escribe con S:
- Terminaciones -oso/-osa (hermoso, famosa)

🔹 Se escribe con Z:
- Terminaciones -anza (esperanza, confianza)`
        },
        3: {
            titulo: "Uso de G y J",
            contenido: `🔹 Se escribe con G:
- Palabras con -gen (imagen, origen)

🔹 Se escribe con J:
- Terminaciones -aje (viaje, paisaje)
- Verbos en -jer (tejer, proteger)`
        }
    };

    const verificarRespuesta = (opcion) => {
        setRespuesta(opcion);

        if (nivel === 4) {
            if (opcion === "b") {
                setFeedback("✅ ¡Correcto! 'escribir' se escribe con B.");

                // 🔥 AQUÍ marcas el módulo como completado
                setProgreso(prev => ({
                    ...prev,
                    grafias: true
                }));

            } else {
                setFeedback("❌ Incorrecto. Recuerda: los verbos terminados en -bir llevan B.");
            }
        }
    };

    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Progreso */}
            <p className="text-sm text-gray-500 mb-2">
                Nivel {nivel} de 4

            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progreso}%` }}
                ></div>
            </div>
            <p className="text-sm text-indigo-600 mb-2">
                {progreso === 100
                    ? "🎉 ¡Completaste este módulo!"
                    : "🚀 Vas avanzando, sigue así"}
            </p>

            {/* Contenido teórico */}
            {nivel <= 3 && (
                <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                        {niveles[nivel].titulo}
                    </h2>

                    <p className="whitespace-pre-line text-gray-700">
                        {niveles[nivel].contenido}
                    </p>

                    <p className="mt-4 text-sm text-indigo-600">
                        💡 Consejo: intenta identificar patrones en las palabras.
                    </p>
                </div>
            )}

            {/* Nivel 4: Ejercicio */}
            {nivel === 4 && (
                <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                        Nivel 4: Practica
                    </h2>

                    <p className="mb-2 text-indigo-600">Completa correctamente:</p>
                    <p className="text-lg font-semibold mb-4 text-indigo-600">
                        escri__ir
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => verificarRespuesta("b")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                        >
                            b
                        </button>

                        <button
                            onClick={() => verificarRespuesta("v")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                        >
                            v
                        </button>
                    </div>

                    {feedback && (
                        <p className="mt-4 text-gray-700">{feedback}</p>
                    )}
                </div>
            )}

            {/* Botones navegación */}
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