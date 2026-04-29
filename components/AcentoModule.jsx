import { useState } from "react";
import { motion } from "framer-motion";

export default function AcentoModule({ setProgreso }) {
    const [nivel, setNivel] = useState(1);
    const [respuesta, setRespuesta] = useState("");
    const [feedback, setFeedback] = useState("");

    const niveles = {
        1: {
            titulo: "Reglas básicas de acentuación",
            contenido: `🔹 Agudas: llevan tilde si terminan en vocal, n o s
Ej: canción, café

🔹 Graves (llanas): llevan tilde si NO terminan en vocal, n o s
Ej: árbol, lápiz

🔹 Esdrújulas: SIEMPRE llevan tilde
Ej: música, rápido`
        },
        2: {
            titulo: "Diptongo e hiato",
            contenido: `🔹 Diptongo: dos vocales juntas (no se separan)
Ej: cielo, causa

🔹 Hiato: se separan y llevan tilde
Ej: país, día`
        },
        3: {
            titulo: "Tilde diacrítica",
            contenido: `Se usa para diferenciar palabras iguales:

tú (pronombre) / tu (posesivo)
más (cantidad) / mas (pero)
él (pronombre) / el (artículo)`
        }
    };

    const verificarRespuesta = (opcion) => {
        setRespuesta(opcion);

        if (nivel === 4) {
            if (opcion === "árbol") {
                setFeedback("✅ ¡Correcto! 'árbol' es palabra grave con tilde.");

                // 🔥 marcar progreso
                setProgreso(prev => ({
                    ...prev,
                    acento: true
                }));

            } else {
                setFeedback("❌ Incorrecto. Recuerda: las palabras graves llevan tilde si no terminan en vocal, n o s.");
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
                        💡 Consejo: identifica la sílaba tónica.
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
                    <p className="text-lg font-semibold mb-4 text-indigo-700">
                        arbol
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => verificarRespuesta("arbol")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            arbol
                        </button>

                        <button
                            onClick={() => verificarRespuesta("árbol")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            árbol
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