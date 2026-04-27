import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Universidades_Logo } from '../utils/data';
import { ChevronLeft, Building2, Mail, Phone, MapPin, MessageSquare, GraduationCap, Briefcase, Info, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Estancias: React.FC = () => {
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
          <Info className="w-6 h-6 text-blue-600" />
          <span>Información de Estancias - {name}</span>
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          Es el primer contacto real del estudiante con la industria, donde aplica conocimientos técnicos por un periodo de 4 meses.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Obligatoriedad', text: 'Requisito académico indispensable para la titulación en TSU e Ingeniería.', icon: ShieldCheck },
            { label: 'Seguro IMSS', text: 'Todo estudiante debe contar con su número de seguridad social activo.', icon: ShieldCheck },
            { label: 'Entregables', text: 'Memoria de estadía o tesina aprobada por asesores académicos e industriales.', icon: GraduationCap },
            { label: 'Duración', text: 'Un cuatrimestre completo de inmersión técnica en planta.', icon: Clock }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-4">
              <div className="bg-white p-2 rounded-lg shadow-sm"><item.icon className="w-5 h-5 text-blue-600" /></div>
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-1">{item.label}</span>
                <p className="text-gray-700 text-sm leading-snug">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-blue-100">
      <div className="relative p-4 sm:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-800"
          >
            Estancias Profesionales
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Conecta con el sector productivo y potencia tu futuro profesional a través de convenios estratégicos.
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
                    className="group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleUniversityClick(uni.shortName)}
                  >
                    <div className="relative w-full aspect-square flex items-center justify-center p-4">
                      <img 
                        src={uni.logo} 
                        alt={uni.shortName} 
                        className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 ${uni.shortName === 'TECNM SJR' ? 'scale-[2.5]' : ''}`} 
                      />
                    </div>
                    <span className="mt-4 text-sm font-bold tracking-wider text-gray-500 group-hover:text-blue-600 transition-colors uppercase text-center">
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
                className="group mb-8 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors bg-white hover:bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm"
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
                      <div className="h-1 w-12 bg-blue-500 rounded-full mb-8"></div>
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
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría académica</span> Mtra. María Eugenia Edith Zapata Campos</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-black-900 block font-semibold">Email</span>ezapata@upsrj.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-black-900 block font-semibold">Telefono</span> (442) 196 13 00 ext. 104</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNAQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> Dra. Luz Elena Narváez Hernández</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> informacion@unaq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 101 6600</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UPQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría de Vinculación</span>Dr. Miguel Ángel Viramontes.</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span>miguel.viramontes@upq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 101 90 00</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UTC' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> Mtra. Enriqueta Ortiz Moctezuma</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> enriqueta.ortiz@utcorregidora.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 483 0070</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UTEQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> M. en I. Raúl Noriega Ponce</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> raul.noriega@uteq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 209 61 00</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UTSJR' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Secretaría Académica</span> Dra. María Angélica Luján Vega</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> alujanv@utsjr.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (427) 129 2000</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'CUAUHTEMOC' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Director Académico</span> Dr. Carlos Roberto Romero García</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> rromero@ucq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 161 6263</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNIQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Rector</span> Ing. Luis Kenji Rosales Senday</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> informes@uniq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 962 0202</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UVM' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Rectora de Campus</span> Mtra. Miriam Pérez Gutiérrez</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> cae.queretaro@uvmnet.edu</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 211 1900</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNICEQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Director Académico</span> Mtro. Ricardo F. Guzmán Fernández</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span>contacto@uniceq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 210 27 10</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'CESBA' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Directora Académica</span> Mtra. Lucía Calcáneo Vizcarra</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> informes@cesba-queretaro.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 537 9682</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'Londres' || selectedUniversity === 'LONDRES' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Rectora</span> Dra. Ivonne Wiener Bercovich</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> vinculacion@udlondresqueretaro.com.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 212 01 35</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UNIPLEA' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Mtra. Mónica Monroy</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> hola@uniplea.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 722 6965</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'DICORMO' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Lic. Paulina De los Cobos</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> info.sede.queretaro@dicormo.com</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 223 4685</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'ATENAS' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Dra. Viridiana Cerecedo</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> info@atenas.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 214 3238</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'CNCI' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Nidia Cantú</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> contacto@cnci.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 214 5033</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'REAL' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Angel Ramírez</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> direccion.academica@urq.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 787 6738</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'NEW ELEMENT' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Mtro. José Antonio Ugalde Guerrero</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> direccion.academica@neuniversity.edu.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 348 1818</p>
                            </div>
                          </>
                        ) : selectedUniversity === 'UAQ' ? (
                          <>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Responsable</span> Dr. Rolando Javier Salinas García</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Email</span> secretaria.academica@uaq.mx</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                              <p><span className="text-gray-900 block font-semibold">Telefono</span> (442) 192 1200</p>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 flex items-start space-x-3">
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
                    <div className="prose prose-blue max-w-none">
                      <div className="space-y-10">
                        <section>
                          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-b border-gray-100 pb-4">
                            <Info className="w-6 h-6 text-blue-600" />
                            <span>Modelo de Estancias - {selectedData?.shortName}</span>
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            Es el primer contacto real del estudiante con la industria, donde aplica conocimientos técnicos por un periodo de 4 meses.
                          </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                { label: 'Obligatoriedad', text: 'Requisito académico indispensable para la titulación en TSU e Ingeniería.', icon: ShieldCheck },
                                { label: 'Seguro IMSS', text: 'Todo estudiante debe contar con su número de seguridad social activo.', icon: ShieldCheck },
                                { label: 'Entregables', text: 'Memoria de estadía o tesina aprobada por asesores académicos e industriales.', icon: GraduationCap },
                                { label: 'Duración', text: 'Un cuatrimestre completo de inmersión técnica en planta.', icon: Clock }
                              ].map((item, idx) => (
                                <div key={idx} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex items-start space-x-4">
                                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
                                    <item.icon className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest block mb-1">{item.label}</span>
                                    <p className="text-gray-700 text-xs leading-snug font-medium">{item.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                        </section>
                      </div>
                    </div>
                  </div>

                  {/* Solo el recuadro de Estancias en el componente Estancias */}
                  <div className="mt-6">
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm">
                      <h4 className="font-bold text-blue-800 mb-3 flex items-center space-x-2">
                        <Briefcase className="w-5 h-5" />
                        <span>Estancias I y II</span>
                      </h4>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        Prácticas cortas de 120 horas que se realizan a mitad de la carrera para que el alumno conozca el entorno laboral.
                      </p>
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

export default Estancias;
