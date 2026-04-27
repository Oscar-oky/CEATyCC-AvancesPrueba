import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Universidades_Logo } from '../utils/data';
import { ChevronLeft, Building2, Mail, MessageSquare, GraduationCap, Info, ShieldCheck, Clock, Building } from 'lucide-react';
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
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Info Sidebar (1/3) */}
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
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-black-600 block font-semibold">Telefono</span> (442) 196 13 00 ext. 104</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNAQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> Dra. Luz Elena Narváez Hernández</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> informacion@unaq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 101 6600</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UPQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría de Vinculación</span> Dr. Miguel Ángel Viramontes</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> miguel.viramontes@upq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 101 90 00</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UTC' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> Mtra. Enriqueta Ortiz Moctezuma</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> enriqueta.ortiz@utcorregidora.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 483 0070</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UTEQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> M. en I. Raúl Noriega Ponce</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> raul.noriega@uteq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 209 61 00</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UTSJR' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> Dra. María Angélica Luján Vega</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> alujanv@utsjr.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (427) 129 2000</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'CUAUHTEMOC' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Director Académico</span> Dr. Carlos Roberto Romero García</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> rromero@ucq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 161 6263</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNIQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Rector</span> Ing. Luis Kenji Rosales Senday</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> informes@uniq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 962 0202</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UVM' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Rectora de Campus</span> Mtra. Miriam Pérez Gutiérrez</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> cae.queretaro@uvmnet.edu</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 211 1900</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNICEQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Director Académico</span> Mtro. Ricardo F. Guzmán Fernández</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span>contacto@uniceq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 210 27 10</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'CESBA' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Directora Académica</span> Mtra. Lucía Calcáneo Vizcarra</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> informes@cesba-queretaro.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 537 9682</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'Londres' || selectedUniversity === 'LONDRES' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Rectora</span> Dra. Ivonne Wiener Bercovich</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> vinculacion@udlondresqueretaro.com.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 212 01 35</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNIPLEA' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Mtra. Mónica Monroy</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> hola@uniplea.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 722 6965</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'DICORMO' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Lic. Paulina De los Cobos</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> info.sede.queretaro@dicormo.com</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 223 4685</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'ATENAS' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Dra. Viridiana Cerecedo</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> info@atenas.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 214 3238</p>
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

                {/* Content Section (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Recuadro Blanco Principal */}
                  <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
                    <div className="prose prose-green max-w-none">
                      <div className="space-y-10">
                        <section>
                          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-b border-gray-100 pb-4">
                            <Info className="w-6 h-6 text-green-600" />
                            <span>Modelo de Estadías - {selectedData?.shortName}</span>
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            La estadía es la inmersión técnica final en la industria, donde el estudiante aplica sus conocimientos especializados durante un cuatrimestre completo.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { label: 'Duración', text: 'Un cuatrimestre completo de inmersión técnica en planta (aprox. 4 meses).', icon: Clock },
                              { label: 'Titulación', text: 'Requisito académico indispensable mediante la entrega de una memoria de estadía.', icon: GraduationCap },
                              { label: 'Seguro Social', text: 'Es obligatorio contar con el seguro facultativo vigente (IMSS o algun otro) durante todo el periodo.', icon: ShieldCheck },
                              { label: 'Vinculación Industrial', text: 'Acceso a convenios con empresas líderes del sector para proyectos de innovación tecnológica.', icon: Building }
                            ].map((item, idx) => (
                              <div key={idx} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex items-start space-x-4">
                                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
                                  <item.icon className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest block mb-1">{item.label}</span>
                                  <p className="text-gray-700 text-xs leading-snug font-medium">{item.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>

                  {/* Recuadro de Estadía Profesional (FUERA del recuadro blanco) */}
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
                    <h4 className="font-bold text-emerald-800 mb-3 flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5" />
                      <span>Estadía Profesional</span>
                    </h4>
                    <p className="text-emerald-700 text-sm leading-relaxed">
                      Se realiza en el último cuatrimestre. Es un periodo de 600 horas (aprox. 4 meses) de tiempo completo en la empresa.
                    </p>
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
