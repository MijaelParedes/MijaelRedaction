import { useState } from "react";
import { motion } from "framer-motion";

export default function MayusculasModule({ setProgreso }) {
    const [nivel, setNivel] = useState(1);
    const [respuesta, setRespuesta] = useState("");
    const [feedback, setFeedback] = useState("");

    const niveles = {
        1: {
            titulo: "Uso básico de mayúsculas",
            contenido: `🔹 Se usa mayúscula al inicio de una oración
Ej: El estudiante estudia.

🔹 Se usa en nombres propios
Ej: María, Perú, Arequipa`
        },
        2: {
            titulo: "Instituciones y lugares",
            contenido: `🔹 Instituciones
Ej: Ministerio de Educación

🔹 Lugares geográficos
Ej: América Latina, Río Amazonas

🔹 Festividades
Ej: Navidad, Año Nuevo`
        },
        3: {
            titulo: "Títulos y siglas",
            contenido: `🔹 Títulos de obras
Ej: Cien años de soledad

🔹 Siglas
Ej: ONU, UNESCO

🔹 Días y meses NO llevan mayúscula
Ej: lunes, enero`
        }
    };

    const verificarRespuesta = (opcion) => {
        setRespuesta(opcion);

        if (nivel === 4) {
            if (opcion === "El Perú es un país diverso") {
                setFeedback("✅ ¡Correcto! Uso adecuado de mayúsculas.");

                // 🔥 marcar progreso
                setProgreso(prev => ({
                    ...prev,
                    mayusculas: true
                }));

            } else {
                setFeedback("❌ Revisa el uso de mayúsculas en nombres propios.");
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
                        💡 Consejo: las mayúsculas destacan información importante.
                    </p>
                </div>
            )}

            {/* Nivel 4 */}
            {nivel === 4 && (
                <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                        Nivel 4: Practica
                    </h2>

                    <p className="mb-2 text-indigo-700">Selecciona la forma correcta:</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => verificarRespuesta("el perú es un país diverso")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            el perú es un país diverso
                        </button>

                        <button
                            onClick={() => verificarRespuesta("El Perú es un país diverso")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            El Perú es un país diverso
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