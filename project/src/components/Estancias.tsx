import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Universidades_Logo } from '../utils/data';

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
    navigate(-1);
  };

  const selectedData = Universidades_Logo.find(uni => uni.shortName === selectedUniversity);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Estancias</h1>
      
      {selectedUniversity === null ? (
        <div>
          <p className="text-center text-lg text-gray-600 mb-10">
            Selecciona una universidad para ver la información sobre estancias.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Universidades_Logo.map((uni) => (
              <div
                key={uni.shortName}
                className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleUniversityClick(uni.shortName)}
              >
                <img src={uni.logo} alt={uni.shortName} className={`h-24 object-contain ${uni.shortName === 'TECNM SJR' ? 'transform scale-[2.95]' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            onClick={handleBackClick}
            className="mb-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            &larr; Volver a las universidades
          </button>
          
          <div className="flex items-center mb-8">
            <img src={selectedData?.logo} alt={selectedData?.shortName} className="h-20 mr-6" />
            <h2 className="text-2xl font-bold text-gray-800">{selectedData?.shortName}</h2>
          </div>

          <div className="space-y-8">
            {selectedData?.shortName === 'UPSRJ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Para la Universidad Politécnica de Santa Rosa Jáuregui (UPSRJ), el proceso de Estancias Profesionales es fundamental debido a su modelo basado en competencias y su enfoque bilingüe.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área encargada de coordinar las estancias es la Secretaría de Vinculación.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Contacto Principal: Mtro. Diego Armando Mendoza (Secretario de Vinculación)<br />
                    Correo Electrónico: vinculacion@upsrj.edu.mx<br />
                    Teléfono: +52 (442) 196 13 00 (Ext. 104 y 115 para Prácticas y Estadías)<br />
                    Red de Vacantes: Bolsa de Trabajo UPSRJ (Facebook)<br />
                    Ubicación: Carretera Federal 57, Qro-SLP km 31, Santa Rosa Jáuregui, Querétaro
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Información Técnica (Modelo UPSRJ)</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Etapas de Contacto Empresarial:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li><strong>Estancias I y II:</strong> Prácticas cortas de 120 horas que se realizan a mitad de la carrera para que el alumno conozca el entorno laboral.</li>
                      <li><strong>Estadía Profesional:</strong> Se realiza en el último cuatrimestre (10º para ingenierías). Es un periodo de 600 horas (aprox. 4 meses) de tiempo completo en la empresa.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Modelo Bilingüe (BIS):</p>
                    <p className="text-gray-600">Muchos estudiantes realizan sus estancias en inglés, ya que la UPSRJ es una universidad Bilingüe, Internacional y Sustentable.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Inclusión:</p>
                    <p className="text-gray-600">La UPSRJ destaca por su Programa de Inclusión, por lo que las estancias también están adaptadas para estudiantes con discapacidad motriz, visual o auditiva.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Convenios Estratégicos</h4>
                <p className="text-gray-600 mb-4">
                  La UPSRJ tiene alianzas fuertes en sectores de Metrología, Animación Digital y Sistemas Automotrices:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>CENAM (Centro Nacional de Metrología)</li>
                  <li>Continental y Harman (Sector Automotriz)</li>
                  <li>Estudios de animación y desarrollo de software</li>
                </ul>
              </div>
            ) : selectedData?.shortName === 'UNAQ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias</h3>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Área de Vinculación)</h4>
                  <p className="text-gray-600 mb-4">
                    La oficina encargada de gestionar los proyectos de estadía y la relación con las empresas es la Subdirección de Vinculación.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <p className="text-gray-600 font-medium">
                      Responsable Principal: M. en A. Nancy Paulina Casares González<br />
                      Correo Electrónico: nancy.casares@unaq.mx<br />
                      Teléfono Oficial: +52 (442) 101 66 00 (Extensión 6711)<br />
                      WhatsApp de Consulta: (442) 110 8456<br />
                      Bolsa de Trabajo y Vacantes: Vinculación Empresarial UNAQ (Facebook)
                    </p>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Información Técnica de las Estadías</h4>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="font-medium text-gray-700">Definición:</p>
                      <p className="text-gray-600">Es el primer contacto real del estudiante con la industria aeronáutica, donde aplica conocimientos técnicos por un periodo de 4 meses (un cuatrimestre completo).</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Obligatoriedad:</p>
                      <p className="text-gray-600">Es un requisito académico indispensable para la titulación en los niveles de Técnico Superior Universitario (TSU) e Ingeniería.</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Seguro Facultativo:</p>
                      <p className="text-gray-600">Todo estudiante debe contar con su número de seguridad social (IMSS) activo antes de integrarse a cualquier empresa por normatividad de seguridad industrial.</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Entregables:</p>
                      <p className="text-gray-600">El resultado final es una memoria de estadía o tesina, la cual debe ser aprobada por un asesor académico y un asesor industrial.</p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Empresas Colaboradoras</h4>
                  <p className="text-gray-600 mb-4">
                    La UNAQ tiene convenios con empresas del Aeroclúster de Querétaro, tales como:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Safran</li>
                    <li>Airbus</li>
                    <li>ITP Aero</li>
                    <li>Bombardier</li>
                    <li>Pequeñas/medianas empresas especializadas como DIICSA</li>
                  </ul>
                </div>
            ) : selectedData?.shortName === 'UTC' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Para la Universidad Tecnológica de Corregidora (UTC), el proceso de estancias es fundamental debido a su enfoque en el desarrollo regional y sustentable.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  La oficina encargada es la Subdirección de Vinculación, responsable de los convenios con el sector productivo.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Contacto General: vinculacion@utcorregidora.edu.mx<br />
                    Teléfono: +52 (442) 483 03 00 (Ext. 1030 para el área de Prácticas y Estadías).<br />
                    Bolsa de Trabajo: Vinculación UTC (Facebook) (Plataforma donde se anuncian vacantes y ferias de empleo).<br />
                    Ubicación: Carretera Estatal 411, km 12.5, Corregidora, Qro. (Rumbo a Huimilpan).
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Estancias en la UTC</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Periodicidad:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li><strong>TSU:</strong> En el 6to cuatrimestre.</li>
                      <li><strong>Ingeniería:</strong> En el 11vo cuatrimestre.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Tiene una duración de 525 horas (aproximadamente 15 semanas) de trabajo intensivo en la empresa.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">El Proyecto:</p>
                    <p className="text-gray-600">El alumno debe realizar una Memoria de Estancia que es una propuesta de mejora técnica o administrativa. Se asignan dos asesores para validar el rigor científico y práctico del proyecto.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Seguro Facultativo:</p>
                    <p className="text-gray-600">Es obligatorio contar con la vigencia de derechos del IMSS proporcionado por la universidad.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Sectores de Impacto</h4>
                <p className="text-gray-600 mb-4">
                  La UTC se especializa en áreas que benefician directamente a la zona sur de Querétaro:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Biotecnología y Química: Proyectos en laboratorios y plantas de procesamiento.</li>
                  <li>Mantenimiento Industrial y Mecatrónica: Alianzas con empresas en los parques industriales aledaños (como el Parque Industrial Balvanera).</li>
                  <li>Turismo y Tecnologías de la Información: Estancias enfocadas en servicios y desarrollo de software.</li>
                </ul>
              </div>
            ) : selectedData?.shortName === 'UTEQ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Para la Universidad Tecnológica de Querétaro (UTEQ), el proceso de estancias es el cierre de dos etapas formativas diferentes, con un enfoque en la formación práctica y el Modelo Dual Alemán.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área responsable es la Secretaría de Vinculación, que actúa como puente entre los más de 12,000 estudiantes y las empresas.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Contacto Principal: Mtro. Luis Gerardo González López (Secretario de Vinculación).<br />
                    Correo Electrónico: vinculacion@uteq.edu.mx<br />
                    Teléfono Directo: +52 (442) 209 61 00 (Extensiones 1121 y 1122 para el Departamento de Estadías).<br />
                    Bolsa de Trabajo: Bolsa de Trabajo UTEQ (Facebook) (Es el medio más activo para vacantes).<br />
                    Ubicación: Av. Pie de la Cuesta No. 2501, Col. Unidad Nacional, Querétaro, Qro.
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Estancias (Modelo Académico)</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Etapas Formativas:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li><strong>Estancia de TSU:</strong> Se realiza al finalizar el 6to cuatrimestre.</li>
                      <li><strong>Estancia de Ingeniería:</strong> Se realiza al finalizar el 11vo cuatrimestre.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">525 horas (aprox. 15 semanas) de tiempo completo en la empresa.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Desarrollar una Memoria de Estancia que documente la solución a una problemática industrial real, lo cual es el requisito único para la titulación.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Modelo Dual:</p>
                    <p className="text-gray-600">La UTEQ es pionera en el Modelo Dual Alemán, donde los estudiantes pasan gran parte de su formación dentro de la empresa, no solo en la estancia final.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Centros de Innovación:</p>
                    <p className="text-gray-600">Muchos alumnos realizan sus estancias dentro del Centro de Innovación y Creatividad (CIC), colaborando en proyectos tecnológicos con socios como Microsoft y Siemens.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Alianzas:</p>
                    <p className="text-gray-600">Tienen convenios activos con grandes empresas del sector industrial como Brose, Continental, Mabe y Kellogg's.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'TECNM QRO' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Residencia Profesional</h3>
                <p className="text-gray-600 mb-4">
                  Para el Tecnológico Nacional de México, Campus Querétaro (ITQ), el proceso obligatorio para la titulación se denomina Residencia Profesional. Actualmente, el campus ya ha publicado los lineamientos y contactos para el periodo Enero-Junio 2026.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área encargada es el Departamento de Gestión Tecnológica y Vinculación (DGTyV).
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Correo para Residencias: dgtyv_residencias@queretaro.tecnm.mx.<br />
                    Conmutador General: +52 (442) 227 44 00 (Extensión 4405 para Residencias).<br />
                    Bolsa de Trabajo: Bolsa De Trabajo Tecnm Campus Querétaro (Facebook).<br />
                    Información en Redes: Residencias del ITQ (Facebook) donde se publican catálogos de proyectos de empresas externas como el IMT.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de la Residencia Profesional (Enero-Junio 2026)</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Valor Curricular:</p>
                    <p className="text-gray-600">10 créditos académicos.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Un mínimo de 500 horas acumuladas en un periodo de 4 meses (mínimo) a 6 meses (máximo).</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos de Inicio:</p>
                    <p className="text-gray-600">Haber aprobado al menos el 80% de los créditos de la carrera, además de contar con el Servicio Social liberado.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Proyecto:</p>
                    <p className="text-gray-600">Debe centrarse en la resolución de una problemática real en la industria mediante un Informe Técnico Final.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores para tu Presentación</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Ubicación de Planteles:</p>
                    <p className="text-gray-600">Cuenta con el Plantel Centro (Av. Tecnológico) y el Plantel Norte.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Áreas de Especialidad:</p>
                    <p className="text-gray-600">Incluye 10 ingenierías presenciales, como Mecatrónica, Industrial, Logística y Materiales, además de Arquitectura.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Vinculación Internacional:</p>
                    <p className="text-gray-600">Fomenta proyectos de investigación y colaboraciones como el CAN-MEX Lab.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'TECNM SJR' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Residencia Profesional</h3>
                <p className="text-gray-600 mb-4">
                  Para el Tecnológico Nacional de México, Campus San Juan del Río (ITSJR), el proceso obligatorio para la titulación se denomina Residencia Profesional, con enfoque en las necesidades industriales de la zona sur del estado.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El departamento encargado de gestionar los convenios y proyectos es el de Gestión Tecnológica y Vinculación.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Responsable: M.A. María de la Luz de la Torre Macías (Jefa de Depto. de Gestión Tecnológica y Vinculación).<br />
                    Correo Electrónico: gestion@sanjuan.tecnm.mx / vinculacion@sanjuan.tecnm.mx<br />
                    Teléfono: +52 (427) 271 84 00 (Ext. 124 para el área de Residencias).<br />
                    Bolsa de Trabajo: Vinculación ITSJR (Facebook) (Publican vacantes para empresas como Eaton, Mitsubishi y Newell Brands).<br />
                    Ubicación: Av. Tecnológico No. 2, San Juan del Río, Qro. C.P. 76800.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de la Residencia Profesional</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Valor Curricular:</p>
                    <p className="text-gray-600">10 créditos en el plan de estudios.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">500 horas mínimas en un periodo de 4 a 6 meses.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos de Inicio:</p>
                    <p className="text-gray-600">Es obligatorio haber liberado el Servicio Social y el 80% de los créditos académicos.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Tipos de Proyecto:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Sectores productivos (privado o público).</li>
                      <li>Investigación y Desarrollo.</li>
                      <li>Estancias de investigación o innovación.</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas Regionales</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Enfoque Industrial:</p>
                    <p className="text-gray-600">La mayoría de las residencias se realizan en los Parques Industriales de San Juan del Río (Valle de Oro y Nuevo San Juan).</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Carreras Clave:</p>
                    <p className="text-gray-600">Tienen una vinculación muy fuerte en las áreas de Ingeniería Industrial, Sistemas y Gestión Empresarial.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Eventos de Vinculación:</p>
                    <p className="text-gray-600">Realizan la Feria de Empleo y Residencias para conectar directamente a los estudiantes con reclutadores de la zona sur del estado.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'CUAUHTEMOC' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Prácticas Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Para la Universidad Cuauhtémoc Querétaro (UCQ), el enfoque se divide en Prácticas Profesionales y Servicio Social, con un fuerte énfasis en convenios con el sector privado y gubernamental.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área responsable es la Coordinación de Vinculación, que gestiona las alianzas estratégicas.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono General: +52 (442) 238 1111<br />
                    Sección de Alumnos: Prácticas y Servicio Social UCQ<br />
                    Bolsa de Trabajo: Universidad Cuauhtémoc Qro. (Facebook) (Donde publican ferias de empleo y nuevas firmas de convenios).<br />
                    Ubicación: Blvd. Bernardo Quintana #229, Col. Arboledas, Querétaro, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas (Modelo UCQ)</h4>
                <p className="text-gray-600 mb-4">
                  A diferencia de las universidades politécnicas o tecnológicas, la UCQ adapta sus prácticas según la facultad:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Área de Salud:</p>
                    <p className="text-gray-600">Odontología, Fisioterapia, Nutrición: Realizan prácticas clínicas tanto en sus propias clínicas internas como en instituciones de salud pública y privada.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Área de Derecho y Negocios:</p>
                    <p className="text-gray-600">Tienen convenios específicos con organismos como el Consejo de la Judicatura y diversas cámaras de comercio.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Haber cubierto el porcentaje de créditos estipulado por cada plan de estudios (usualmente a partir del 50% o 60%).</li>
                      <li>Contar con el Seguro de Accidentes Escolares vigente.</li>
                      <li>Carta de presentación emitida por la Dirección de Carrera.</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios Multidisciplinarios:</p>
                    <p className="text-gray-600">Su red abarca desde municipios (como Pedro Escobedo) hasta empresas internacionales, permitiendo una visión global.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque Humanista:</p>
                    <p className="text-gray-600">En su misión institucional, destacan que las prácticas buscan la formación integral y ética del estudiante en escenarios reales.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Bolsa de Empleo:</p>
                    <p className="text-gray-600">Los estudiantes tienen acceso a vacantes exclusivas mediante su departamento de empleabilidad.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'UNIQ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Prácticas Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Para la Universidad Internacional de Querétaro (UNIQ), el programa de prácticas está diseñado para complementar su modelo académico, integrando a los estudiantes en escenarios laborales reales.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área de Vinculación y Extensión Universitaria es la responsable de gestionar los convenios para que los alumnos realicen sus prácticas en empresas de prestigio.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 215 50 11<br />
                    Correo Electrónico: vinculacion@uniq.edu.mx<br />
                    Página Oficial: UNIQ - Universidad Internacional de Querétaro<br />
                    Red de Vacantes: Bolsa de Trabajo UNIQ (Facebook)<br />
                    Ubicación: Av. del Junípero s/n, Fracc. Villas del Mesón, Juriquilla, Querétaro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En la UNIQ, las prácticas están diseñadas para complementar el modelo académico de sus licenciaturas e ingenierías (como Derecho, Administración, Negocios e Ingeniería Industrial):
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Integrar al estudiante en escenarios laborales reales para que adquiera experiencia técnica y administrativa antes de egresar.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos Clave:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Haber cubierto un porcentaje mínimo de créditos (generalmente a partir del 60% de la carrera).</li>
                      <li>Contar con la Carta de Aceptación de la empresa receptora.</li>
                      <li>Presentar informes parciales y un reporte final de actividades para validar la liberación.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben completar 480 horas totales, las cuales son requisito indispensable para la titulación.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Ubicación Estratégica:</p>
                    <p className="text-gray-600">Al estar en Juriquilla, la UNIQ tiene una vinculación natural muy fuerte con corporativos, despachos y empresas de servicios de la zona norte de Querétaro.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Alianza con el Sector Industrial:</p>
                    <p className="text-gray-600">Mantiene convenios con empresas del Parque Industrial Querétaro (PIQ) para sus perfiles de ingeniería y logística.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Seguimiento Personalizado:</p>
                    <p className="text-gray-600">Cada alumno tiene un tutor académico que supervisa que las tareas en la empresa coincidan con su perfil de egreso.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'UPQ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Para la Universidad Politécnica de Querétaro (UPQ), el proceso de Estancias es el pilar de su modelo educativo "Triple Hélice".
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área responsable es la Secretaría de Vinculación, ubicada en el edificio de servicios administrativos.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Contacto General: vinculacion@upq.edu.mx<br />
                    Teléfono: +52 (442) 101 90 00 (Ext. 120 y 130 para seguimiento de Estadías)<br />
                    Bolsa de Trabajo: Bolsa de Trabajo UPQ (Facebook) (Aquí publican las vacantes de empresas como Brose, ZF y Siemens)<br />
                    Ubicación: Carretera Estatal 431, km 2.2, Parque Industrial El Marqués, Qro
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura del Programa</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Etapas de Contacto Empresarial:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li><strong>Estancia I:</strong> Se realiza al finalizar el 3er cuatrimestre (aprox. 120 horas).</li>
                      <li><strong>Estancia II:</strong> Se realiza al finalizar el 6to cuatrimestre (aprox. 120 horas).</li>
                      <li><strong>Estadía Profesional:</strong> Es el proyecto final en el 9no cuatrimestre. Consiste en 480 a 600 horas de práctica profesional de tiempo completo en una empresa.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Proyecto de Titulación:</p>
                    <p className="text-gray-600">A diferencia de otras instituciones, en la UPQ la estadía tiene como objetivo principal la generación de una tesina técnica que solucione un problema específico de la organización, lo que permite la titulación automática al aprobarla.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Ubicación Estratégica:</p>
                    <p className="text-gray-600">Al estar dentro del Parque Industrial El Marqués, los alumnos tienen contacto directo con más de 100 empresas trasnacionales.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Modelo Dual:</p>
                    <p className="text-gray-600">La UPQ cuenta con un Modelo de Formación Dual donde el estudiante puede pasar hasta el 80% de su tiempo en la empresa antes de la estadía final.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'UVM' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Universidad del Valle de México (UVM), Campus Querétaro, el proceso se denomina formalmente Prácticas Profesionales, las cuales son un pilar de su modelo de empleabilidad.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área encargada de gestionar los convenios y la plataforma de vacantes es la Coordinación de Experiencia Estudiantil y Egresados.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono General: +52 (442) 211 19 00<br />
                    Plataforma de Vacantes: Bolsa de Trabajo UVM (Powered by Handshake)<br />
                    Red de Vinculación: UVM Querétaro (Facebook) (Donde publican las fechas de su "Professional Development Day").<br />
                    Ubicación: Blvd. Juriquilla No. 1000, Santa Rosa Jáuregui, Juriquilla, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  La UVM estructura sus prácticas bajo lineamientos de competencias internacionales:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Modalidades:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li><strong>Práctica Profesional:</strong> Materia obligatoria en el plan de estudios (usualmente en los últimos semestres).</li>
                      <li><strong>Práctica Clínica:</strong> Exclusiva para el área de Ciencias de la Salud (Medicina, Fisioterapia, Nutrición), realizadas en hospitales con convenios COFRAS.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Generalmente requiere cubrir un mínimo de 480 horas, aunque depende del programa académico específico.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Haber cubierto el 70% de los créditos de la carrera.</li>
                      <li>Estar inscrito en la materia de "Prácticas Profesionales".</li>
                      <li>Contar con el seguro de accidentes personales proporcionado por la universidad.</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Enfoque Global:</p>
                    <p className="text-gray-600">Al ser parte de redes internacionales, facilitan prácticas en empresas transnacionales y tienen convenios para prácticas en el extranjero.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Herramientas Tecnológicas:</p>
                    <p className="text-gray-600">Utilizan la plataforma Handshake para conectar a los alumnos con reclutadores de empresas como Amazon, Google y corporativos locales en Querétaro.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Vinculación Empresarial:</p>
                    <p className="text-gray-600">Mantienen alianzas con cámaras de comercio (COPARMEX, CANACO) para insertar alumnos en proyectos de consultoría y administración.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'UNICEQ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Universidad Central de Querétaro (UNICEQ), las Prácticas Profesionales son un requisito académico clave diseñado para que el alumno aplique sus conocimientos en el sector productivo antes de graduarse.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área de Vinculación Universitaria gestiona los convenios con dependencias públicas y empresas privadas.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 212 02 46<br />
                    Correo Electrónico: vinculacion@uniceq.edu.mx<br />
                    Sitio Web: Vinculación UNICEQ<br />
                    Ubicación: Av. San Roque No. 202, Col. San Roque, Querétaro, Qro. (Plantel Centro).<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas (Modelo UNICEQ)</h4>
                <p className="text-gray-600 mb-4">
                  A diferencia de los modelos intensivos de 4 meses, la UNICEQ permite a sus estudiantes de licenciaturas e ingenierías combinar sus clases con la experiencia laboral:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Fortalecer el aprendizaje mediante la inserción en campos laborales afines al plan de estudios, como Derecho, Administración, Contabilidad e Ingeniería en Sistemas.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Tener cubierto al menos el 60% de los créditos de la carrera.</li>
                      <li>Solicitar la Carta de Presentación ante la coordinación de la carrera.</li>
                      <li>Entregar reportes periódicos de actividades avalados por la organización receptora.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Generalmente se deben completar 480 horas totales para ser liberadas como parte del proceso de titulación.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios de Gobierno:</p>
                    <p className="text-gray-600">Destaca por sus alianzas con diversas dependencias del Gobierno del Estado de Querétaro y municipios para prácticas en el área administrativa y legal.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Flexibilidad:</p>
                    <p className="text-gray-600">Su modelo educativo permite que el alumno realice prácticas en horarios que no interfieran con sus clases, facilitando la retención de talento en las empresas.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Bolsa de Trabajo:</p>
                    <p className="text-gray-600">Cuentan con un seguimiento de egresados para ayudar a que la práctica se convierta en una contratación permanente.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'CESBA' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Centro de Estudios Superiores del Bajío (CESBA), Campus Querétaro, las Prácticas Profesionales se enfocan en la inserción inmediata al sector laboral, especialmente en áreas administrativas, contables y de derecho.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área encargada es la Coordinación de Vinculación y Prácticas Profesionales.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 215 01 02<br />
                    Correo Electrónico: vinculacion@cesba.mx<br />
                    Página Oficial: CESBA - Vinculación<br />
                    Redes Sociales: CESBA Querétaro (Facebook) (Donde comparten convenios con cámaras empresariales).<br />
                    Ubicación: Av. Constituyentes No. 124, Col. El Carrizal, Querétaro, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  El modelo de CESBA busca que el estudiante no solo cumpla horas, sino que genere valor en la empresa:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Requisito de Inicio:</p>
                    <p className="text-gray-600">Contar con al menos el 70% de los créditos de la licenciatura.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben cubrir 480 horas (conforme a los lineamientos generales para licenciaturas en México).</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Proceso:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Solicitar Carta de Presentación en la coordinación de carrera.</li>
                      <li>Entregar Carta de Aceptación de la empresa (debe estar legalmente constituida).</li>
                      <li>Entrega de Reportes Mensuales de actividades.</li>
                      <li>Emisión de Carta de Liberación final.</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios Sectoriales:</p>
                    <p className="text-gray-600">Tienen una vinculación muy fuerte con la CANACO (Cámara Nacional de Comercio) y despachos contables/jurídicos de la región.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Perfil Ejecutivo:</p>
                    <p className="text-gray-600">Dado que muchos alumnos de CESBA trabajan, la universidad facilita que las prácticas puedan realizarse dentro de su mismo lugar de trabajo, siempre y cuando las actividades sean afines a su carrera y se presente un proyecto de mejora.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque en Empleabilidad:</p>
                    <p className="text-gray-600">Su programa está diseñado para que el alumno desarrolle habilidades de liderazgo y ética profesional directamente en el campo de batalla.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'LONDRES' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Universidad de Londres (UDL), Campus Querétaro, las Prácticas Profesionales son un componente esencial de su modelo educativo para que el alumno aplique sus conocimientos en entornos laborales reales.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  La gestión de convenios y seguimiento de alumnos está a cargo de la Coordinación de Vinculación.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 214 59 15<br />
                    Correo Electrónico: vinculacion@udl.edu.mx<br />
                    Página Oficial: Universidad de Londres - Querétaro<br />
                    Ubicación: Calle Ezequiel Montes Norte No. 2, Col. Centro Histórico, Querétaro, Qro. (Plantel sede).<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En la UDL, las prácticas se manejan como una transición hacia la vida laboral:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Desarrollar habilidades prácticas y ética profesional en áreas como Derecho, Psicología, Administración, Diseño y Comunicación.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Haber cubierto un porcentaje aproximado del 70% de los créditos de la licenciatura.</li>
                      <li>Tramitar la Carta de Presentación oficial ante la coordinación académica.</li>
                      <li>Presentar Reportes de Actividades periódicos para validar el aprendizaje.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Generalmente se requiere completar 480 horas, las cuales deben realizarse en una organización que cuente con convenio vigente o que sea aprobada por la universidad.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios en el Centro Histórico:</p>
                    <p className="text-gray-600">Debido a su ubicación, la UDL tiene una vinculación muy estrecha con dependencias gubernamentales, despachos jurídicos de renombre y agencias de publicidad ubicadas en la zona centro de la ciudad.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque Creativo y Humano:</p>
                    <p className="text-gray-600">Tienen una presencia fuerte de practicantes en el área de Psicología y Artes Visuales, con convenios en clínicas y estudios creativos.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Flexibilidad de Horarios:</p>
                    <p className="text-gray-600">Al ser una universidad con turnos matutinos y vespertinos, permiten que el alumno acomode sus prácticas de manera que no afecten su avance académico.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'UNIPLEA' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  Universidad del Planeación y Estrategia (UNIPLEA), las Prácticas Profesionales se gestionan bajo un esquema de vinculación estratégica con el sector empresarial del estado.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área encargada de formalizar los convenios y dar seguimiento a los alumnos es la Coordinación de Vinculación.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 212 55 55<br />
                    Correo Electrónico: vinculacion@uniplea.edu.mx<br />
                    Página Oficial: UNIPLEA - Vinculación<br />
                    Red de Vacantes: UNIPLEA (Facebook) (Donde publican alianzas con empresas y cámaras).<br />
                    Ubicación: Av. Constituyentes No. 124, Col. El Carrizal, Querétaro, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En UNIPLEA, las prácticas están diseñadas para ejecutarse en las etapas finales de la licenciatura (como Negocios, Derecho o Mercadotecnia):
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Requisito de Inicio:</p>
                    <p className="text-gray-600">Tener cubierto al menos el 70% de los créditos de la carrera.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben completar 480 horas (requisito estándar para licenciaturas).</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Entregables:</p>
                    <p className="text-gray-600">El alumno debe presentar reportes mensuales y un reporte final de actividades que demuestre la aplicación de sus competencias en la empresa.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Validación:</p>
                    <p className="text-gray-600">Se requiere una Carta de Aceptación y, al finalizar, una Carta de Liberación emitida por la empresa receptora.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios de Alta Dirección:</p>
                    <p className="text-gray-600">UNIPLEA destaca por su relación con el sector corporativo, permitiendo que sus estudiantes realicen prácticas en áreas de planeación, estrategia y recursos humanos.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Modelo Ejecutivo:</p>
                    <p className="text-gray-600">Sus planes de estudio facilitan que el alumno trabaje y realice prácticas simultáneamente, fomentando una inserción laboral temprana.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque en Empleabilidad:</p>
                    <p className="text-gray-600">Muchos de sus convenios están enfocados en el Parque Industrial Balvanera y zonas corporativas de la ciudad.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'DICORMO' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  El Centro de Estudios de Diseño y Comunicación (DICORMEX - DICORMO), conocido comúnmente como DICORMO, las prácticas profesionales son fundamentales para que los estudiantes de diseño, moda y comunicación se integren a la industria creativa.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  La coordinación académica es la encargada de gestionar los convenios con despachos, agencias y talleres.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 214 43 14<br />
                    Correo Electrónico: vinculacion@dicormo.edu.mx / informes@dicormo.edu.mx<br />
                    Página Oficial: DICORMO - Vinculación<br />
                    Ubicación: Calle José María Morelos No. 174, Col. Centro, Querétaro, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En DICORMO, las prácticas están diseñadas para desarrollar un portafolio profesional real:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Aplicar habilidades en áreas como Diseño de Modas, Diseño Gráfico y Comunicación Visual en escenarios de producción real.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Generalmente se deben cubrir 480 horas (requisito para licenciaturas).</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Proceso:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Emisión de Carta de Presentación por parte de la escuela.</li>
                      <li>Registro de la empresa o taller (debe ser del sector creativo o contar con un departamento afín).</li>
                      <li>Entrega de Bitácoras de Actividades y portafolio de evidencias.</li>
                      <li>Liberación mediante carta oficial del receptor.</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Sector Creativo:</p>
                    <p className="text-gray-600">Destaca por sus convenios con la industria del calzado, textil y agencias de publicidad en Querétaro y la región Bajío.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque en Emprendimiento:</p>
                    <p className="text-gray-600">Muchos alumnos realizan sus prácticas en estudios de diseño independientes o participando en la organización de eventos de moda de nivel nacional.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Ubicación:</p>
                    <p className="text-gray-600">Al estar en el Centro Histórico, facilita el acceso a agencias creativas y talleres artesanales de alta especialidad.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'ATENAS' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  El Instituto de Estudios Superiores Atenas (mejor conocido como la Atenas de Querétaro), el programa de vinculación se enfoca principalmente en sus áreas de Salud, Negocios y Derecho.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  La coordinación académica es la encargada de formalizar los convenios y validar los proyectos de los alumnos.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 215 84 94<br />
                    Correo Electrónico: vinculacion@atenasdequeretaro.edu.mx<br />
                    Página Oficial: Atenas de Querétaro - Vinculación<br />
                    Ubicación: Av. Constituyentes No. 116, Col. El Carrizal, Querétaro, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En la Atenas, las prácticas son un requisito obligatorio para la obtención del título profesional:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Requisito de Inicio:</p>
                    <p className="text-gray-600">Haber acreditado al menos el 70% de los créditos de la licenciatura.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben completar 480 horas (estándar para licenciaturas).</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Seguro:</p>
                    <p className="text-gray-600">El alumno debe contar con su seguro de accidentes escolares o seguro facultativo vigente.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Proceso:</p>
                    <p className="text-gray-600">El alumno solicita su Carta de Presentación, la empresa emite una Carta de Aceptación, y al finalizar se libera mediante un Reporte Final y la carta de terminación de la empresa.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Sector Salud:</p>
                    <p className="text-gray-600">Destaca por sus convenios en el área de Enfermería y Nutrición con hospitales públicos y privados, así como clínicas especializadas.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Sectores Administrativos:</p>
                    <p className="text-gray-600">Tienen una vinculación activa con empresas de la zona de Constituyentes y Parques Industriales para perfiles de administración y contaduría.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Educación Continua:</p>
                    <p className="text-gray-600">La universidad busca que las prácticas sirvan como un puente para que el alumno se especialice en el área de su interés dentro de la misma organización.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'CNCI' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  La Universidad CNCI (Centro de Capacitación Nacional de Informática), Campus Querétaro, las prácticas profesionales son fundamentales para su modelo de flexibilidad y empleabilidad.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  La oficina de Vinculación y Seguimiento Académico es la encargada de gestionar los convenios para que los alumnos apliquen sus conocimientos en empresas del sector privado.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 212 82 22<br />
                    Correo Electrónico: vinculacion.qro@cnci.mx<br />
                    Página Oficial: Universidad CNCI - Querétaro<br />
                    Ubicación: Av. Constituyentes No. 24, Col. Centro, Querétaro, Qro. (Cerca de la Alameda Hidalgo).<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En la CNCI, las prácticas están diseñadas para integrarse con sus modalidades presenciales y virtuales:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Desarrollar competencias laborales en áreas como Derecho, Administración de Empresas, Ingeniería en Sistemas e Ingeniería Industrial.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Requisitos:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Haber cursado aproximadamente el 70% de los créditos de la carrera.</li>
                      <li>Tener el estatus de alumno regular.</li>
                      <li>Contar con el seguro facultativo (IMSS) o seguro escolar vigente.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben cumplir 480 horas totales. El proceso requiere una Carta de Presentación emitida por el plantel y culmina con la Carta de Liberación de la empresa.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios de Bolsa de Trabajo:</p>
                    <p className="text-gray-600">La CNCI utiliza la plataforma OCCMundial para conectar a sus estudiantes con vacantes de prácticas profesionales en empresas de tecnología y servicios.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Perfil Tecnológico:</p>
                    <p className="text-gray-600">Al nacer como una institución de informática, tienen una vinculación muy fuerte con empresas que requieren soporte en TI, programación y automatización.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Flexibilidad:</p>
                    <p className="text-gray-600">Su esquema permite que el alumno realice sus prácticas en horarios que no interfieran con sus cuatrimestres, facilitando la experiencia laboral temprana.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'REAL' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  La Universidad REAL Querétaro, las Prácticas Profesionales se gestionan bajo un enfoque de inserción laboral directa, buscando que el alumno aplique sus conocimientos en empresas del sector productivo y de servicios.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  La coordinación académica es la encargada de formalizar los convenios y supervisar el cumplimiento de las prácticas.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 214 26 44 / +52 (442) 214 25 44<br />
                    Correo Electrónico: vinculacion@unireal.edu.mx<br />
                    Página Oficial: Universidad Real de Querétaro<br />
                    Ubicación: Calle José María Morelos No. 120, Col. Centro, Querétaro, Qro. (Cerca de la zona de museos y dependencias gubernamentales).<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En la REAL, las prácticas son una extensión del aprendizaje en el aula:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Objetivo:</p>
                    <p className="text-gray-600">Fortalecer las competencias profesionales de los estudiantes de carreras como Derecho, Administración de Empresas, Contaduría y Pedagogía.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben cubrir 480 horas totales, conforme al reglamento de la institución y la Secretaría de Educación.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Documentación Requerida:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Carta de Presentación: Emitida por la universidad para el registro en la empresa.</li>
                      <li>Reporte de Actividades: Bitácora mensual de las funciones realizadas.</li>
                      <li>Carta de Liberación: Documento oficial de la empresa que acredita la finalización satisfactoria.</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Convenios Institucionales:</p>
                    <p className="text-gray-600">Al estar ubicada en el Centro Histórico, mantiene una vinculación estrecha con despachos jurídicos y notarías, así como con dependencias del sector público estatal.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque en PyMEs:</p>
                    <p className="text-gray-600">Tienen una fuerte relación con pequeñas y medianas empresas de la región, lo que permite a los practicantes tener una visión general de todas las áreas de una organización.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Modalidad Ejecutiva:</p>
                    <p className="text-gray-600">Sus programas flexibles permiten que alumnos que ya se encuentran laborando en áreas afines puedan acreditar sus prácticas bajo criterios específicos de validación profesional.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'NEW ELEMENT' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias Profesionales</h3>
                <p className="text-gray-600 mb-4">
                  La New Element University (NEU), las Prácticas Profesionales se manejan bajo un concepto de "Inmersión Profesional", buscando que el alumno genere proyectos de alto impacto en empresas tecnológicas y creativas.
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación)</h4>
                <p className="text-gray-600 mb-4">
                  El área responsable es la Dirección de Vinculación y Empleabilidad.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Teléfono de Atención: +52 (442) 800 80 00<br />
                    Correo Electrónico: vinculacion@newelement.edu.mx / admisiones@newelement.edu.mx<br />
                    Página Oficial: New Element University - Vinculación<br />
                    Ubicación: Anillo Vial Fray Junípero Serra No. 2002, El Refugio, Querétaro, Qro.<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas (Modelo NEU)</h4>
                <p className="text-gray-600 mb-4">
                  A diferencia de modelos tradicionales, la NEU enfoca sus prácticas en la metodología de "Learning by doing" (Aprender haciendo):
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Requisito de Inicio:</p>
                    <p className="text-gray-600">Se pueden comenzar una vez que el alumno ha cubierto el 60% de los créditos académicos.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">Se deben completar un total de 480 horas.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Enfoque de Proyectos:</p>
                    <p className="text-gray-600">El alumno no solo asiste a la empresa, sino que debe proponer un Proyecto de Innovación que sea evaluado tanto por su mentor en la empresa como por su tutor académico.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Validación:</p>
                    <p className="text-gray-600">Requiere el set estándar de documentos: Carta de Presentación, Acuerdo de Prácticas (Convenio), Bitácoras mensuales y Carta de Liberación.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Fortalezas para tu Proyecto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Sectores Estratégicos:</p>
                    <p className="text-gray-600">Al ser una universidad con fuerte enfoque en Negocios, Innovación y Tecnología, tienen convenios con startups, agencias de marketing digital y empresas de logística en la zona de El Refugio y Juriquilla.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Networking Empresarial:</p>
                    <p className="text-gray-600">Organizan eventos de vinculación donde directivos de empresas asisten a la universidad para reclutar talento directamente de las aulas.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Internacionalización:</p>
                    <p className="text-gray-600">Fomentan que las prácticas tengan un componente global, buscando empresas con presencia internacional o proyectos que requieran el dominio del inglés.</p>
                  </div>
                </div>
              </div>
            ) : selectedData?.shortName === 'UAQ' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias</h3>
                <p className="text-gray-600 mb-4">
                  La Universidad Autónoma de Querétaro (UAQ), el proceso es muy formal y se gestiona de manera descentralizada a través de cada una de sus 13 facultades. Es importante distinguir entre Servicio Social (obligatorio por ley) y Prácticas Profesionales (obligatorias según el plan de estudios).
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">1. Directorio de Contacto (Vinculación Central)</h4>
                <p className="text-gray-600 mb-4">
                  La oficina que rige los convenios generales es la Secretaría de Vinculación y Servicios Universitarios.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-gray-600 font-medium">
                    Coordinación General: Vinculación UAQ<br />
                    Teléfono: +52 (442) 192 12 00 (Ext. 3590)<br />
                    Correo Electrónico: vinculacion@uaq.mx<br />
                    Bolsa de Trabajo: Bolsa de Empleo UAQ (Conecta con empresas como Santander, Nestlé y Mabe)<br />
                    Ubicación: Edificio de Rectoría, Centro Universitario, Cerro de las Campanas s/n<br />
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">2. Estructura de las Prácticas Profesionales</h4>
                <p className="text-gray-600 mb-4">
                  En la UAQ, las reglas dependen directamente del reglamento interno de cada facultad:
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Requisitos:</p>
                    <p className="text-gray-600">Haber cubierto el porcentaje de créditos exigido (generalmente entre el 70% y 80%). Contar con el Seguro Facultativo (IMSS) vigente. Estar inscrito en la materia o módulo de prácticas si así lo marca el mapa curricular.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración:</p>
                    <p className="text-gray-600">El estándar es de 480 horas, aunque en áreas de salud (Medicina, Enfermería) se manejan por internado rotatorio o ciclos clínicos con horarios específicos.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Trámite:</p>
                    <p className="text-gray-600">El alumno debe acudir a la Coordinación de Vinculación de su propia Facultad para validar que la empresa tenga un convenio activo o para tramitar uno nuevo.</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-gray-700">3. Diferenciadores para tu Presentación</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Presencia Estatal:</p>
                    <p className="text-gray-600">Al tener campus en casi todos los municipios, la UAQ tiene convenios con gobiernos municipales y empresas locales en todo Querétaro.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Investigación y Desarrollo:</p>
                    <p className="text-gray-600">Permite realizar prácticas dentro de sus propios Centros de Investigación (como en la Facultad de Ingeniería), trabajando en proyectos tecnológicos de alto nivel.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Convenios de Gran Escala:</p>
                    <p className="text-gray-600">Tienen alianzas con cámaras como COPARMEX y organismos internacionales para estancias profesionales fuera del país.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-gray-700">Estancias</h3>
                <p className="text-gray-600">
                  Aquí se mostrará la información detallada sobre las estancias disponibles para {selectedData?.shortName}. 
                  Esto puede incluir requisitos, fechas, áreas de especialización y procesos de aplicación. 
                  Por el momento, esta sección está en construcción.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Estancias;
