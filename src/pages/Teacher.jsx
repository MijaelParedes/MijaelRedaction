import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Teacher() {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-8 flex flex-col lg:flex-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white rounded-xl shadow-md p-6 space-y-4 mb-6 lg:mb-0 lg:mr-6">
        {/* Botón volver */}
        <Link
          to="/"
          className="block text-center bg-indigo-200 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-300 transition"
        >
          ← Volver al inicio
        </Link>
        <h2 className="text-xl font-bold text-indigo-700">Panel Docente</h2>
        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => setSelectedSection('dashboard')}
            className={`text-left px-4 py-2 rounded-lg transition font-medium ${selectedSection === 'dashboard' ? 'bg-yellow-500' : 'bhover:bg-purple-500 text-purple-200'
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelectedSection('grupos')}
            className={`text-left px-4 py-2 rounded-lg transition font-medium ${selectedSection === 'grupos' ? 'bg-green-600' : 'hover:bg-green-500 text-green-600'
              }`}
          >
            Gestión de Grupos
          </button>
          <button
            onClick={() => setSelectedSection('progreso')}
            className={`text-left px-4 py-2 rounded-lg transition font-medium ${selectedSection === 'progreso' ? 'bg-yellow-500' : 'hover:bg-yellow-500 text-yellow-600'
              }`}
          >
            Seguimiento de Estudiantes
          </button>
          <button
            onClick={() => setSelectedSection('reportes')}
            className={`text-left px-4 py-2 rounded-lg transition font-medium ${selectedSection === 'reportes' ? 'bg-red-500 text-white' : 'hover:bg-red-100 text-red-600'
              }`}
          >
            Reportes y Estadísticas
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-8">
        {selectedSection === 'dashboard' && (
          <div>
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">Bienvenido al Área del Docente</h3>
            <p className="text-gray-700">Desde aquí podrás gestionar tus grupos, visualizar el progreso de tus estudiantes y generar reportes automáticos.

              <div className="mt-6">
                <img
                  src="https://img.freepik.com/vector-gratis/coleccion-graficos-kpi-informacion-importante_23-2148584356.jpg"
                  alt="Indicadores estadísticos"
                  className="mx-auto w-full max-w-md rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Ejemplo visual de indicadores de rendimiento estudiantil.</p>
              </div></p>
          </div>
        )}

        {selectedSection === 'grupos' && (
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Gestión de Grupos</h3>
            <p className="text-gray-700">Aquí podrás crear, editar o eliminar grupos de estudiantes. También podrás asignarles actividades.</p>
          </div>
        )}

        {selectedSection === 'progreso' && (
          <div>
            <h3 className="text-xl font-bold text-yellow-700 mb-2">Seguimiento de Estudiantes</h3>
            <p className="text-gray-700">Consulta el historial de participación, resultados en actividades y observaciones por estudiante.</p>
          </div>
        )}

        {selectedSection === 'reportes' && (
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-2">Reportes y Estadísticas</h3>
            <p className="text-gray-700">Genera reportes automáticos con métricas de rendimiento por grupo, estudiante o dimensión ortográfica.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 
