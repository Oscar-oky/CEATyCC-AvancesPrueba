import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Universidades_Logo } from '../utils/data';
import { ChevronLeft, Building2, Mail, Phone, MapPin, MessageSquare, GraduationCap, Briefcase, Info, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Estadias: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const universityIdFromUrl = queryParams.get('universityId');

  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(universityIdFromUrl);
  const navigate = useNavigate();

  useEffect(() => {
    if (universityIdFromUrl) {
      setSelectedUniversity(universityIdFromUrl);
    }
  }, [universityIdFromUrl]);

  const handleUniversityClick = (shortName: string) => {
    setSelectedUniversity(shortName);
  };

  const handleBackClick = () => {
    if (universityIdFromUrl) {
      navigate(-1);
    } else {
      setSelectedUniversity(null);
    }
  };

  const selectedData = Universidades_Logo.find(uni => uni.shortName === selectedUniversity);

  // Helper to render sections for placeholder universities
  const renderPlaceholderContent = (name: string) => (
    <div className="space-y-10">
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-b border-gray-100 pb-4">
          <Info className="w-6 h-6 text-green-600" />
          <span>Modelo de Estadías - {name}</span>
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          El proceso de estadías profesionales en {name} representa el cierre del ciclo académico, donde los estudiantes consolidan su formación mediante proyectos de alto impacto en el sector productivo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h4 className="font-bold text-green-800 mb-3 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Periodo de Inmersión</span>
            </h4>
            <p className="text-green-700 text-sm leading-relaxed">
              Duración de 4 a 6 meses de práctica profesional intensiva en empresas u organizaciones con convenio vigente.
            </p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Proyecto de Titulación</span>
            </h4>
            <p className="text-emerald-700 text-sm leading-relaxed">
              Desarrollo de una memoria de estadía o tesina que documenta la solución a una problemática real.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h4 className="text-xl font-bold text-gray-800">Requisitos de Vinculación</h4>
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: 'Seguro Facultativo', text: 'Vigencia de derechos del IMSS u otro seguro escolar obligatorio antes del inicio.', icon: ShieldCheck },
            { label: 'Avance Académico', text: 'Haber cubierto el porcentaje de créditos estipulado por el plan de estudios (generalmente 80-90%).', icon: GraduationCap },
            { label: 'Convenio Institucional', text: 'Acuerdo formal entre la universidad y la empresa receptora.', icon: Building2 },
            { label: 'Servicio Social', text: 'Liberación del servicio social como requisito previo en la mayoría de los casos.', icon: Briefcase }
          ].map((req, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="bg-white p-2 rounded-lg shadow-sm"><req.icon className="w-5 h-5 text-green-600" /></div>
              <div>
                <h5 className="font-bold text-gray-800">{req.label}</h5>
                <p className="text-gray-600 text-sm">{req.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-green-100">
      <div className="relative p-4 sm:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-800"
          >
            Estadías Profesionales
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Información técnica sobre el cierre de ciclos académicos y vinculación empresarial de último cuatrimestre.
          </motion.p>
        </header>
      
        <AnimatePresence mode="wait">
          {selectedUniversity === null ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {Universidades_Logo.map((uni, index) => (
                  <motion.div
                    key={uni.shortName}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, translateY: -5 }}
                    className="group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleUniversityClick(uni.shortName)}
                  >
                    <div className="relative w-full aspect-square flex items-center justify-center p-4">
                      <img 
                        src={uni.logo} 
                        alt={uni.shortName} 
                        className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 ${uni.shortName === 'TECNM SJR' ? 'scale-[2.5]' : ''}`} 
                      />
                    </div>
                    <span className="mt-4 text-sm font-bold tracking-wider text-gray-500 group-hover:text-green-600 transition-colors uppercase text-center">
                      {uni.shortName}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="relative"
            >
              <button
                onClick={handleBackClick}
                className="group mb-8 flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors bg-white hover:bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Volver a universidades</span>
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm sticky top-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-center border border-gray-100 shadow-inner">
                        <img src={selectedData?.logo} alt={selectedData?.shortName} className="max-h-full max-w-full object-contain" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {selectedData?.shortName}
                      </h2>
                      <div className="h-1 w-12 bg-green-500 rounded-full mb-8"></div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>Área de Vinculación</span>
                      </h4>
                      
                      <div className="space-y-4 text-sm">
                        {selectedUniversity === 'UPSRJ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Mtro. Diego Armando Mendoza</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> vinculacion@upsrj.edu.mx</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNAQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Nancy Paulina Casares</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> nancy.casares@unaq.mx</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UPQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> vinculacion@upq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Phone className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Teléfono</span> +52 (442) 101 90 00</p>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-start space-x-3">
                            <Info className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-xs">Consulta con el departamento académico de {selectedData?.shortName} para los datos de contacto del responsable actual.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
                    <div className="prose prose-green max-w-none">
                      {selectedUniversity === 'UPSRJ' ? (
                        <div className="space-y-10">
                          <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-b border-gray-100 pb-4">
                              <Info className="w-6 h-6 text-green-600" />
                              <span>Modelo de Estadías UPSRJ</span>
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                              Para la Universidad Politécnica de Santa Rosa Jáuregui, la estadía profesional es la culminación del modelo por competencias y el enfoque bilingüe.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <h4 className="font-bold text-green-800 mb-3 flex items-center space-x-2">
                                  <Clock className="w-5 h-5" />
                                  <span>Periodo</span>
                                </h4>
                                <p className="text-green-700 text-sm leading-relaxed">
                                  <strong>Estadía Profesional:</strong> 600 horas de tiempo completo (4 meses) en el 10º cuatrimestre para ingenierías.
                                </p>
                              </div>
                              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-blue-800 mb-3 flex items-center space-x-2">
                                  <ShieldCheck className="w-5 h-5" />
                                  <span>Enfoque BIS</span>
                                </h4>
                                <p className="text-blue-700 text-sm leading-relaxed">
                                  Posibilidad de realizar el proyecto final en inglés bajo el modelo Bilingüe, Internacional y Sustentable.
                                </p>
                              </div>
                            </div>
                          </section>

                          <section className="space-y-6">
                            <h4 className="text-xl font-bold text-gray-800">Inclusión y Convenios</h4>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="bg-white p-2 rounded-lg shadow-sm"><ShieldCheck className="w-5 h-5 text-green-600" /></div>
                                <div>
                                  <h5 className="font-bold text-gray-800">Programa de Inclusión</h5>
                                  <p className="text-gray-600 text-sm">Adaptación de estadías para estudiantes con discapacidad motriz, visual o auditiva.</p>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      ) : selectedUniversity === 'UPQ' ? (
                        <div className="space-y-10">
                          <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-b border-gray-100 pb-4">
                              <Info className="w-6 h-6 text-green-600" />
                              <span>Modelo Triple Hélice UPQ</span>
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                              La estadía profesional es el pilar del modelo educativo, realizada dentro del Parque Industrial El Marqués.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                { label: 'Duración', text: '480 a 600 horas de práctica profesional intensiva.', icon: Clock },
                                { label: 'Titulación', text: 'Generación de una tesina técnica para titulación automática.', icon: GraduationCap },
                                { label: 'Modelo Dual', text: 'Opción de pasar hasta el 80% del tiempo en la empresa.', icon: ShieldCheck },
                                { label: 'Ubicación', text: 'Contacto directo con más de 100 empresas trasnacionales.', icon: MapPin }
                              ].map((item, idx) => (
                                <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-4">
                                  <div className="bg-white p-2 rounded-lg shadow-sm"><item.icon className="w-5 h-5 text-green-600" /></div>
                                  <div>
                                    <span className="text-green-600 text-xs font-bold uppercase tracking-widest block mb-1">{item.label}</span>
                                    <p className="text-gray-700 text-sm leading-snug">{item.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        </div>
                      ) : selectedUniversity === 'UNAQ' ? (
                        <div className="space-y-10">
                          <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-b border-gray-100 pb-4">
                              <Info className="w-6 h-6 text-green-600" />
                              <span>Estadías Aeronáuticas</span>
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                              Proyectos técnicos especializados en el sector aeronáutico con una duración de un cuatrimestre completo.
                            </p>

                            <div className="space-y-4">
                              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                                  <Briefcase className="w-5 h-5 text-green-600" />
                                  <span>Empresas del Clúster</span>
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                  {['Safran', 'Airbus', 'ITP Aero', 'Bombardier'].map(company => (
                                    <div key={company} className="bg-white p-3 rounded-xl text-center shadow-sm border border-gray-100">
                                      <span className="text-gray-700 text-sm font-medium">{company}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      ) : (
                        renderPlaceholderContent(selectedData?.shortName || '')
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Estadias;
