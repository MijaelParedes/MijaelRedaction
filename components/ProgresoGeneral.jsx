export default function ProgresoGeneral({ progreso }) {
    const dimensiones = [
        { nombre: "Grafías", clave: "grafias" },
        { nombre: "Acento", clave: "acento" },
        { nombre: "Signos", clave: "signos" },
        { nombre: "Mayúsculas", clave: "mayusculas" }
    ];

    const total = dimensiones.length;
    const completadas = dimensiones.filter(d => progreso[d.clave]).length;
    const porcentaje = (completadas / total) * 100;

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-64">
            <h3 className="font-bold text-indigo-700 mb-3">
                Progreso general
            </h3>

            {/* Barra */}
            <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
                <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${porcentaje}%` }}
                ></div>
            </div>

            <p className="text-sm text-gray-600 mb-3">
                {Math.round(porcentaje)}% completado
            </p>

            {/* Lista */}
            <div className="space-y-2">
                {dimensiones.map((dim) => (
                    <div key={dim.clave} className="flex items-center gap-2">
                        <span>
                            {progreso[dim.clave] ? "✅" : "⬜"}
                        </span>
                        <span className="text-gray-700">
                            {dim.nombre}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}