import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Mascota from "/components/Mascota";
import MascotaFlotante from "/components/MascotaFlotante";
import GrafiasModule from "/components/GrafiasModule";
import ProgresoGeneral from "/components/ProgresoGeneral";
import AcentoModule from "/components/AcentoModule";
import SignosModule from "/components/SignosModule";
import MayusculasModule from "/components/MayusculasModule";

export default function Student() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');
  const [cargando, setCargando] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('ruta');
  const [dimensionSeleccionada, setDimensionSeleccionada] = useState(null);
  const [progreso, setProgreso] = useState({
    grafias: false,
    acento: false,
    signos: false,
    mayusculas: false
  });

  const verificarRespuesta = async () => {
    if (!respuesta.trim()) {
      setFeedback('Por favor, escribe una oración.');
      return;
    }

    setCargando(true);
    setFeedback('');

    try {
      const respuestaAPI = await fetch('https://api.languagetoolplus.com/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: respuesta,
          language: 'es',
        }),
      });

      const data = await respuestaAPI.json();

      if (data.matches.length === 0) {
        setFeedback('✅ ¡Muy bien! No se encontraron errores.');
      } else {
        const sugerencias = data.matches.map((m) => (
          `• ${m.message} → sugerencia: ${m.replacements?.[0]?.value || 'ninguna'}`
        )).join('\n\n');

        setFeedback(`🔍 Se encontraron ${data.matches.length} posibles errores:\n\n${sugerencias}`);
      }
    } catch (error) {
      console.error('Error con LanguageTool:', error);
      setFeedback('❌ Error al conectar con LanguageTool.');
    } finally {
      setCargando(false);
    }
  };

  const ejerciciosGrafias = [
    { oracion: 'La ____aca del volcán se volvió peligrosa.', opcion: 'b', solucion: 'b' },
    { oracion: 'Mi no____io es muy atento.', opcion: 'v', solucion: 'v' },
  ];

  const ejerciciosAcento = [
    { palabra: 'camion', correcta: 'camión' },
    { palabra: 'facil', correcta: 'fácil' },
  ];

  const ejerciciosSignos = [
    { oracion: 'Vamos a casa dijo mamá.', sugerido: 'Vamos a casa, dijo mamá.' },
    { oracion: 'Hola cómo estás?', sugerido: 'Hola, ¿cómo estás?' },
  ];

  const ejerciciosMayusculas = [
    { frase: 'el presidente visitó arequipa.', corregida: 'El presidente visitó Arequipa.' },
    { frase: 'mañana empieza el mes de agosto.', corregida: 'Mañana empieza el mes de agosto.' },
  ];

  return (
    <motion.div
      className="relative min-h-screen flex items-start justify-center px-4 py-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MascotaFlotante />
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-100 transition"
      >
        ← Volver al inicio
      </Link>

      <aside className="hidden lg:block fixed top-24 left-6 w-64 bg-white rounded-xl shadow-md p-4 space-y-4 z-50">
        <button
          onClick={() => { setVistaActiva('ruta'); setDimensionSeleccionada(null); }}
          className={`block w-full text-left px-4 py-2 rounded transition font-medium ${vistaActiva === 'ruta'
            ? 'bg-emerald-600 text-white'
            : 'hover:bg-emerald-200'
            }`}
        >
          Ruta de aprendizaje
        </button>
        <button
          onClick={() => setVistaActiva('ejercicio')}
          className={`block w-full text-left px-4 py-2 rounded transition font-medium ${vistaActiva === 'ejercicio'
            ? 'bg-indigo-600 text-white'
            : 'hover:bg-emerald-200'
            }`}
        >
          Ejercicio Ortográfico
        </button>
        <button
          onClick={() => setVistaActiva('extras')}
          className={`block w-full text-left px-4 py-2 rounded transition font-medium ${vistaActiva === 'extras'
            ? 'bg-yellow-500 text-white'
            : 'hover:bg-emerald-200'
            }`}
        >
          Más ejercicios prácticos
        </button>
      </aside>

      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl space-y-6 text-center ml-0 lg:ml-64">

        {vistaActiva === 'ruta' && (
          <motion.div
            key="ruta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-left space-y-6"
          >
            <h2 className="text-3xl font-bold text-emerald-700">Ruta de Aprendizaje Ortográfica</h2>

            {!dimensionSeleccionada && (
              <div className="space-y-4">
                <div onClick={() => setDimensionSeleccionada('grafias')} className="bg-emerald-100 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                  <h3 className="font-semibold text-lg text-emerald-800">1. Uso de grafías (b/v, c/s/z, g/j)</h3>
                  <p className="text-emerald-700 text-sm">Explora reglas ortográficas comunes y confusiones frecuentes.</p>
                </div>
                <div onClick={() => setDimensionSeleccionada('acento')} className="bg-emerald-100 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                  <h3 className="font-semibold text-lg text-emerald-800">2. Uso del acento ortográfico</h3>
                  <p className="text-emerald-700 text-sm">Diferencia entre agudas, graves y esdrújulas. Aprende los casos especiales.</p>
                </div>
                <div onClick={() => setDimensionSeleccionada('signos')} className="bg-emerald-100 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                  <h3 className="font-semibold text-lg text-emerald-800">3. Uso de signos ortográficos</h3>
                  <p className="text-emerald-700 text-sm">Conoce el papel de los signos de puntuación, diacríticos y auxiliares.</p>
                </div>
                <div onClick={() => setDimensionSeleccionada('mayusculas')} className="bg-emerald-100 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                  <h3 className="font-semibold text-lg text-emerald-800">4. Uso de mayúsculas y minúsculas</h3>
                  <p className="text-emerald-700 text-sm">Aplica correctamente las reglas de uso formal y estilístico.</p>
                </div>
              </div>
            )}

            {dimensionSeleccionada === 'grafias' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-800">Teoría: Uso de grafías</h3>
                <button onClick={() => setDimensionSeleccionada(null)} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Volver a la Ruta</button>
                <GrafiasModule setProgreso={setProgreso} />
              </div>

            )}

            {dimensionSeleccionada === 'acento' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-800">Teoría: Uso del acento ortográfico</h3>
                <button onClick={() => setDimensionSeleccionada(null)} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Volver a la lista</button>
                <AcentoModule setProgreso={setProgreso} />
              </div>
            )}

            {dimensionSeleccionada === 'signos' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-800">Teoría: Uso de signos ortográficos</h3>
                <button onClick={() => setDimensionSeleccionada(null)} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Volver a la lista</button>
                <SignosModule setProgreso={setProgreso} />
              </div>
            )}

            {dimensionSeleccionada === 'mayusculas' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-800">Teoría: Uso de mayúsculas y minúsculas</h3>
                <button onClick={() => setDimensionSeleccionada(null)} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Volver a la lista</button>
                <MayusculasModule setProgreso={setProgreso} />
              </div>
            )}
          </motion.div>
        )}

        {vistaActiva === 'ejercicio' && (
          <motion.div
            key="ejercicio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ejercicio Ortográfico</h2>
            <p className="text-lg text-gray-700 mb-4">
              Escribe una oración y la IA verificará si contiene errores ortográficos.
            </p>

            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Escribe aquí tu oración..."
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />

            <button
              onClick={verificarRespuesta}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={cargando || !respuesta.trim()}
            >
              {cargando ? 'Verificando...' : 'Verificar'}
            </button>

            {feedback && (
              <motion.div
                className="mt-6 text-left text-base font-medium text-gray-800 bg-gray-100 p-4 rounded-lg shadow-inner whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {feedback}
              </motion.div>
            )}
          </motion.div>
        )}

      </div>

      <div className="flex gap-6">

        {/* IZQUIERDA */}
        <div className="flex-1">
          {/* tu módulo actual */}
        </div>

        {/* DERECHA */}
        <ProgresoGeneral progreso={progreso} />

      </div>

    </motion.div>
  );
}
