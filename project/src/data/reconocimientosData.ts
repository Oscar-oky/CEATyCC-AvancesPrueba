import { Award, Users, Trophy } from 'lucide-react';

export type Winner = {
  nombre: string;
  email: string;
  pdfUrl: string;
};

export type Premio = {
  titulo: string;
  año: string;
  ganador: string;
  ganadores: (string | Winner)[];
  color: string;
  icon: any;
  categoria?: string;
};

export type Categoria = {
  nombre: string;
  descripcion: string;
  criterios: string[];
  premio: string;
  pdfs: { nombre: string; email: string; pdfUrl: string; }[];
};

export const premiosStaticos: Premio[] = [
  {
    titulo: "Torneo de Prog. Categoria Básica",
    año: "1.er lugar",
    ganador: "Universidad Autónoma de Querétaro",
    ganadores: [
      { nombre: "Alejandro Barrios Martinez", email: "alejandro.barrios@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Alejandro Barrios Martinez.pdf" },
      { nombre: "Diego Martell Rodriguez", email: "diego.martell@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Diego Martell Rodriguez.pdf" },
      { nombre: "Jesus Enrique Lopez Zavala", email: "jesus.lopez@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Jesus Enrique Lopez Zavala.pdf" },
      { nombre: "Maria Jose Resendiz Medellin", email: "maria.resendiz@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Maria Jose Resendiz Medellin.pdf" }
    ],
    color: "bg-blue-600",
    icon: Award,
    categoria: "Torneo de Programación Básica"
  },
  {
    titulo: "Torneo de Prog. Categoria Avanzada",
    año: "1.er lugar",
    ganador: "Universidad Tecnológica de Querétaro",
    ganadores: [
      { nombre: "Ariadna Vanessa López Gómez", email: "ariadna.lopez@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Ariadna Vanessa López Gómez.pdf" },
      { nombre: "Hugo Alberto Miralrio Espinoza", email: "hugo.miralrio@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Hugo Alberto Miralrio Espinoza.pdf" },
      { nombre: "Jesús Enrique Rojas Guerrero", email: "jesus.rojas@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Jesús Enrique Rojas Guerrero.pdf" },
      { nombre: "José Gabriel Reyes Vargas", email: "jose.reyes@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/José Gabriel Reyes Vargas.pdf" }
    ],
    color: "bg-red-600",
    icon: Award,
    categoria: "Torneo de Programación Avanzada"
  },
  {
    titulo: "Torneo de Prog. Categoria Básica",
    año: "2.do lugar",
    ganador: "Instituto Tecnológico de Querétaro",
    ganadores: [
      { nombre: "Ailín Briseño Álvarez", email: "ailin.briseno@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Ailín Briseño Álvarez.pdf" },
      { nombre: "Diego Castro Mendoza", email: "diego.castro@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Diego Castro Mendoza.pdf" },
      { nombre: "Jafet Giovanni León Licea", email: "jafet.leon@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Jafet Giovanni León Licea.pdf" },
      { nombre: "Yamil Alamillo Piña", email: "yamil.alamillo@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Yamil Alamillo Piña.pdf" }
    ],
    color: "bg-blue-600",
    icon: Award,
    categoria: "Torneo de Programación Básica"
  },
  {
    titulo: "Torneo de Prog. Categoria Avanzado",
    año: "2.do lugar",
    ganador: "Instituto Tecnológico de Querétaro",
    ganadores: [
      { nombre: "Brian Emmanuel Hernández Zúñiga", email: "brian.hernandez@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Brian Emmanuel Hernández Zúñiga.pdf" },
      { nombre: "Edgar Leonardo Aguirre Bautista", email: "edgar.aguirre@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Edgar Leonardo Aguirre Bautista.pdf" },
      { nombre: "Roberto Rojas Campos", email: "roberto.rojas@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/2do Lugar/Roberto Rojas Campos.pdf" },
      { nombre: "Sofia González Vargas", email: "sofia.gonzalez@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/2do Lugar/Sofia González Vargas.pdf" }
    ],
    color: "bg-red-600",
    icon: Award,
    categoria: "Torneo de Programación Avanzada"
  }
];

export const categoriasData: Categoria[] = [
  {
    nombre: "Ponentes y Moderadores",
    descripcion: "Reconoce a instituciones que han demostrado liderazgo en la implementación de tecnologías",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "Ángel Martínez Velázquez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19/Ángel Martínez Velázquez.pdf" },
      { nombre: "Carlos Santiago De León Avila", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19/Carlos Santiago De León Ávila.pdf" },
      { nombre: "Cristian Barac Fabregat Gallegos", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19/Cristian Barac Fabregat Gallegos.pdf" },
      { nombre: "Emma Reséndiz Juárez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19/Emma Reséndiz Juárez.pdf" },
      { nombre: "Jonathan Israel González Ruiz", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19/Jonathan Israel González Ruiz.pdf" },
      { nombre: "Valeria Osorio Ferreiro", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19/Valeria Osorio Ferreiro.pdf" },
      { nombre: "Andrea Montserrat Cruz Rodríguez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Andrea Montserrat Cruz Rodríguez.pdf" },
      { nombre: "Brenda Guadalupe Luna Álvarez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Brenda Guadalupe Luna Álvarez.pdf" },
      { nombre: "Daniel Ferruzca", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Daniel Ferruzca.pdf" },
      { nombre: "David Adissi", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/David Adissi.pdf" },
      { nombre: "Diana Laura González Camacho, Vanessa Rangel", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Diana Laura González Camacho, Vanessa Rangel.pdf" },
      { nombre: "Dr. Chieng Moua", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Dr. Chieng Moua.pdf" },
      { nombre: "Dr. Víctor Alberto Gómez Pérez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Dr. Víctor Alberto Gómez Pérez.pdf" },
      { nombre: "E. Donjuán, E. Navarro, J. Cabrera y D. García", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/E. Donjuán, E. Navarro, J. Cabrera y D. García.pdf" },
      { nombre: "Fernando Nava Velázquez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Fernando Nava Velázquez.pdf" },
      { nombre: "Gerardo Jair Aguilar Belmonte, Lucy Carmona Vieyra, Jorge Emiliano Gutiérrez Ramírez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Gerardo Jair Aguilar Belmonte, Lucy Carmona Vieyra, Jorge Emiliano Gutiérrez Ramírez.pdf" },
      { nombre: "Hugo Mauricio Romero Rodríguez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Hugo Mauricio Romero Rodríguez.pdf" },
      { nombre: "Jorge Luis Medellín Martín", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Jorge Luis Medellín Martín.pdf" },
      { nombre: "José Antonio Reséndiz Muñoz", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/José Antonio Reséndiz Muñoz.pdf" },
      { nombre: "José Luis González Pérez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/José Luis González Pérez.pdf" },
      { nombre: "Juan Antonio Villalpando Sandoval, Pedro Eduardo Leal Villalvazo, Jacinto Eliseo Quintana Landaverde", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Juan Antonio Villalpando Sandoval, Pedro Eduardo Leal Villalvazo, Jacinto Eliseo Quintana Landaverde.pdf" },
      { nombre: "Luis Morales-Velázquez, Arturo Y. Jaen- Cuellar,Luis A. Morales-Hernández", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Luis Morales-Velázquez, Arturo Y. Jaen- Cuellar,Luis A. Morales-Hernández.pdf" },
      { nombre: "MIP. Rodrigo Ortiz Sánchez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/MIP. Rodrigo Ortiz Sánchez.pdf" },
      { nombre: "Magdiel Elienai Jiménez Tabla", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Magdiel Elienai Jiménez Tabla.pdf" },
      { nombre: "Marcos Cortés", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Marcos Cortés.pdf" },
      { nombre: "Mauricio Sánchez Herrera, Xana Karen Mendoza Camacho, Eliel Bustamante Arroyo", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Mauricio Sánchez Herrera, Xana Karen Mendoza.pdf" },
      { nombre: "Milton Adán Becerra Maqueda, MiriamEdithGarcíaMiguel, Oliver Giovanni Jara Dionicio, ArturoMartínezMarcos,Eduardo Pimentel Ochoa Almaraz, Eduardo AguilarLuis,Uriel Romero Martínez, Esryil Falcón Vidales Peña", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Milton Adán Becerra Maqueda, Miriam Edith García.pdf" },
      { nombre: "Miriam Wendoline Ruiz Loredo, Gerardo Cruz Gudiño,Carlos Enrique Villarreal Barrón, Emma ReséndizJuárez,Francisco Arturo Munguía López, José Omar GarcíaCruz,César Eduardo Estrada Fragoso, Antonio Jesús HernándezOrozco", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Miriam Wendoline Ruiz Loredo, Gerardo Cruz Gudiño,.pdf" },
      { nombre: "Rubén Gabriel Aguilar Santiago", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Rubén Gabriel Aguilar Santiago.pdf" },
      { nombre: "Sandra Eugenia Beristain Arroyo", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Sandra Eugenia Beristain Arroyo.pdf" },
      { nombre: "Víctor Alejandro González Huitrón", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/19 y 20/Víctor Alejandro González Huitrón.pdf" },
      { nombre: "Aldo Mendoza Mendoza", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Aldo Mendoza Mendoza .pdf" },
      { nombre: "Aldo Rogelio Hernández Martínez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Aldo Rogelio Hernández Martínez .pdf" },
      { nombre: "Alejandro Serrano García", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Alejandro Serrano García.pdf" },
      { nombre: "Axel Fabricio Colchado Juárez", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Axel Fabricio Colchado Juárez.pdf" },
      { nombre: "Betsy Valeria Licona Cruz", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Betsy Valeria Licona Cruz .pdf" },
      { nombre: "Cesar Eduardo Estada Fragoso", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Cesar Eduardo Estada Fragoso.pdf" },
      { nombre: "Emiliano Focil Torres", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Emiliano Focil Torres.pdf" },
      { nombre: "Estrada Fragoso Cesar Eduardo", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Estrada Fragoso Cesar Eduardo.pdf" },
      { nombre: "Francisco Javier Gutiérrez Araujo", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Francisco Javier Gutiérrez Araujo.pdf" },
      { nombre: "Gabriel Martínez Mendoza", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Gabriel Martínez Mendoza .pdf" },
      { nombre: "Hernández Martínez Aldo Rogelio", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Hernández Martínez Aldo Rogelio.pdf" },
      { nombre: "Melissa Mata Almaraz", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Melissa Mata Almaraz .pdf" },
      { nombre: "Miriam Wendoline Ruiz Loredo", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Miriam Wendoline Ruiz Loredo.pdf" },
      { nombre: "Osvaldo Peña Navarrete", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Osvaldo Peña Navarrete.pdf" },
      { nombre: "Ulises Yasua Ángeles Arteaga", email: "", pdfUrl: "/docs/2do Foro de Educación en Alta/20/Ulises Yasua Ángeles Arteaga.pdf" }
    ]
  },
  {
    nombre: "Participantes en Concursos de Programación categoría Avanzado",
    descripcion: "Reconoce la destacada participación de estudiantes en competencias avanzadas de programación.",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "Alejandro Barrios Martínez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Alejandro Barrios Martínez.pdf" },
      { nombre: "Antonio Jesús Hernández Orozco", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Antonio Jesús Hernández Orozco.pdf" },
      { nombre: "Jesús Enrique López Zavala", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Jesús Enrique López Zavala.pdf" },
      { nombre: "Leonardo Valdelamar Martínez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Leonardo Valdelamar Martínez.pdf" },
      { nombre: "María José Reséndiz Medellín", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/María José Reséndiz Medellín.pdf" },
      { nombre: "Mariana Guadalupe Cano Márquez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Mariana Guadalupe Cano Márquez.pdf" },
      { nombre: "Mateo David Dwyer Morris", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Mateo David Dwyer Morris.pdf" },
      { nombre: "Yerik Axel Rodríguez González", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel avanzado/19/Yerik Axel Rodríguez González.pdf" }
    ]
  },
  {
    nombre: "Participantes en Concursos de Programación categoría Básico",
    descripcion: "Reconoce la destacada participación de estudiantes en competencias básicas de programación.",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "Aldo Damián Gómez Pichardo", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Aldo Damián Gómez Pichardo.pdf" },
      { nombre: "Alejandra López Franco", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Alejandra López Franco.pdf" },
      { nombre: "Alejandro Banda Suárez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Alejandro Banda Suárez.pdf" },
      { nombre: "Alejandro Serrano García", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Alejandro Serrano García.pdf" },
      { nombre: "Alexis Sánchez Sixto", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Alexis Sánchez Sixto.pdf" },
      { nombre: "Ali Gael López Casimiro", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Ali Gael López Casimiro.pdf" },
      { nombre: "Alondra Daniela Sánchez Domínguez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Alondra Daniela Sánchez Domínguez.pdf" },
      { nombre: "Andrés González Licea", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Andrés González Licea.pdf" },
      { nombre: "Antonio Jesús Hernández Orozco", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Antonio Jesús Hernández Orozco.pdf" },
      { nombre: "Antonio Jesús Hernández Orozco", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Antonio Jesús Hernández Orozco .pdf" },
      { nombre: "Ariel de Jesús Ortega López", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Ariel de Jesús Ortega López.pdf" },
      { nombre: "Axel Fabricio Colchado Juárez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Axel Fabricio Colchado Juárez.pdf" },
      { nombre: "Betel Alejandra Montes Muñoz", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Betel Alejandra Montes Muñoz.pdf" },
      { nombre: "Bryan Gerardo García González", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Bryan Gerardo García González.pdf" },
      { nombre: "Bryan de Jesús Santiago Gutiérrez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Bryan de Jesús Santiago Gutiérrez.pdf" },
      { nombre: "Cesar de Jesús Moreno Colchado", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Cesar de Jesús Moreno Colchado .pdf" },
      { nombre: "Cesar de Jesús Moreno Colchado", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Cesar de Jesús Moreno Colchado.pdf" },
      { nombre: "David Merino Domínguez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/David Merino Domínguez.pdf" },
      { nombre: "Davis Alejandro Perera Allen", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Davis Alejandro Perera Allen.pdf" },
      { nombre: "Eliel Priske Alanis", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Eliel Priske Alanis .pdf" },
      { nombre: "Elizabeth Reséndiz Ramos", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Elizabeth Reséndiz Ramos.pdf" },
      { nombre: "Emiliano Antonio Lara Sánchez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Emiliano Antonio Lara Sánchez.pdf" },
      { nombre: "Emiliano García Perales", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Emiliano García Perales.pdf" },
      { nombre: "Emilio Antonio Lara Sánchez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Emilio Antonio Lara Sánchez.pdf" },
      { nombre: "Emilio Rojas Badillo", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Emilio Rojas Badillo.pdf" },
      { nombre: "Favián Orduña Suárez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Favián Orduña Suárez.pdf" },
      { nombre: "Francisco Arturo Munguía López", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Francisco Arturo Munguía López .pdf" },
      { nombre: "Fátima Trejo Zarazúa", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Fátima Trejo Zarazúa.pdf" },
      { nombre: "Georgina Flores Carrillo", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Georgina Flores Carrillo.pdf" },
      { nombre: "Hanniel Olvera Mata", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Hanniel Olvera Mata.pdf" },
      { nombre: "Héctor Alejandro Xolocotzi Girón", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Héctor Alejandro Xolocotzi Girón.pdf" },
      { nombre: "Itzel Ramírez Medina", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Itzel Ramírez Medina.pdf" },
      { nombre: "Jesús Iglesias Heredia", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Jesús Iglesias Heredia.pdf" },
      { nombre: "Jesús Yeray Nila Bello", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Jesús Yeray Nila Bello.pdf" },
      { nombre: "Jocelyn Sánchez Leal", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Jocelyn Sánchez Leal.pdf" },
      { nombre: "Joshua Ortiz Garcia", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Joshua Ortiz Garcia.pdf" },
      { nombre: "José Emiliano Gutiérrez Méndez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/José Emiliano Gutiérrez Méndez.pdf" },
      { nombre: "Leslie Daniela Gómez Martínez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Leslie Daniela Gómez Martínez.pdf" },
      { nombre: "Lizeth Bocanegra Martínez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Lizeth Bocanegra Martínez.pdf" },
      { nombre: "Lizeth Bonegra", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Lizeth Bonegra.pdf" },
      { nombre: "Luis Everardo Moreno Caracheo", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Luis Everardo Moreno Caracheo.pdf" },
      { nombre: "Melina Dannaé Ayala Sandoval", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Melina Dannaé Ayala Sandoval.pdf" },
      { nombre: "Melissa Mata Almaraz", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Melissa Mata Almaraz.pdf" },
      { nombre: "Octavio Cuevas Jiménez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Octavio Cuevas Jiménez.pdf" },
      { nombre: "Osvaldo Peña Navarrete", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Osvaldo Peña Navarrete.pdf" },
      { nombre: "Raquel de León Vázquez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Raquel de León Vázquez.pdf" },
      { nombre: "Raúl Fernando Moreno Gómez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Raúl Fernando Moreno Gómez.pdf" },
      { nombre: "Ricardo Sosa Chico", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Ricardo Sosa Chico.pdf" },
      { nombre: "Roberto Carlos Jiménez Rodríguez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Roberto Carlos Jiménez Rodríguez.pdf" },
      { nombre: "Rodrigo Bautista Sánchez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Rodrigo Bautista Sánchez.pdf" },
      { nombre: "Rubén Gabriel Aguilar Santiago", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Rubén Gabriel Aguilar Santiago.pdf" },
      { nombre: "Sam Angen Iniestra Miranda", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Sam Angen Iniestra Miranda.pdf" },
      { nombre: "Schoenstatt Olalde Campos", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Schoenstatt Olalde Campos.pdf" },
      { nombre: "Sergio Altamira Mojarro", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Sergio Altamira Mojarro.pdf" },
      { nombre: "Tanny Geraldine Correa Chávez", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Tanny Geraldine Correa Chávez.pdf" },
      { nombre: "Ulises Eduardo López Acosta", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Ulises Eduardo López Acosta.pdf" },
      { nombre: "Uriel Moreno González", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Uriel Moreno González.pdf" },
      { nombre: "Xolocotzi Girón Héctor Alejandro", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Xolocotzi Girón Héctor Alejandro.pdf" },
      { nombre: "Zelinda Flores Cantú", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Zelinda Flores Cantú.pdf" },
      { nombre: "Ángel Antonio Arvizu Herrera", email: "", pdfUrl: "/docs/concurso de programación en categoría nivel Básico/19/Ángel Antonio Arvizu Herrera.pdf" }
    ]
  },
  {
    nombre: "Mujeres STEM",
    descripcion: "Reconoce a mujeres destacadas del CEATyCC por su excelencia en Ciencia, Tecnología y Ingeniería.",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "Ing. Abigail Santamaría Ramírez", email: "", pdfUrl: "/docs/Mujeres STEM/Ing. Abigail Santamaría Ramírez.pdf" },
      { nombre: "Ing. Alejandra Belén Medina Cruz", email: "", pdfUrl: "/docs/Mujeres STEM/Ing. Alejandra Belén Medina Cruz.pdf" },
      { nombre: "Ing. Alondra María García Callejas", email: "", pdfUrl: "/docs/Mujeres STEM/Ing. Alondra María García Callejas.pdf" }
    ]
  },
  {
    nombre: "Constancias Jueces",
    descripcion: "Reconoce la valiosa participación de los profesores que fungieron como jueces en los concursos de programación, garantizando la calidad y la imparcialidad de las evaluaciones.",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "Dr. José Alejandro Ascencio Laguna", email: "", pdfUrl: "/docs/Constancias Jueces/Dr. José Alejandro Ascencio Laguna.pdf" },
      { nombre: "Ing. Adriana Yazmín Contreras Álvarez", email: "", pdfUrl: "/docs/Constancias Jueces/Ing. Adriana Yazmín Contreras Álvarez.pdf" },
      { nombre: "Ing. Julio Alejandro Villeda Maldonado", email: "", pdfUrl: "/docs/Constancias Jueces/Ing. Julio Alejandro Villeda Maldonado.pdf" },
      { nombre: "Mtra. Ma. Elena Montes Almanza", email: "", pdfUrl: "/docs/Constancias Jueces/Mtra. Ma. Elena Montes Almanza.pdf" },
      { nombre: "Mtro. Edgar Emmanuel Sánchez Coronado", email: "", pdfUrl: "/docs/Constancias Jueces/Mtro. Edgar Emmanuel Sánchez Coronado.pdf" },
      { nombre: "Mtro. Gabriel González Milina", email: "", pdfUrl: "/docs/Constancias Jueces/Mtro. Gabriel González Milina.pdf" },
      { nombre: "Mtro. Gregorio Rodríguez Miranda", email: "", pdfUrl: "/docs/Constancias Jueces/Mtro. Gregorio Rodríguez Miranda.pdf" },
      { nombre: "Mtro. Omar Eden Mendez Gomez", email: "", pdfUrl: "/docs/Constancias Jueces/Mtro. Omar Eden Mendez Gomez.pdf" }
    ]
  },
  {
    nombre: "Egresados",
    descripcion: "Reconoce a los egresados del CEATyCC por su excelencia académica.",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "Brenda Leticia Contreras Beltrán", email: "", pdfUrl: "/docs/Egresados/Brenda Leticia Contreras Beltrán.pdf" },
      { nombre: "Isidro Amarildo Bárcenas Reséndiz", email: "", pdfUrl: "/docs/Egresados/Isidro Amarildo Bárcenas Reséndiz.pdf" },
      { nombre: "Magdiel Elienai Jiménez Tabla", email: "", pdfUrl: "/docs/Egresados/Magdiel Elienai Jiménez Tabla.pdf" },
      { nombre: "Sandra Anahí Ibarra Navarrete", email: "", pdfUrl: "/docs/Egresados/Sandra Anahí Ibarra Navarrete.pdf" }
    ]
  },
  {
    nombre: "Empresas",
    descripcion: "Reconoce a las empresas colaboradoras del CEATyCC por su apoyo y compromiso con la formación de talento en tecnologías de la información y comunicaciones.",
    criterios: [""],
    premio: "",
    pdfs: [
      { nombre: "38 Grados Lab", email: "", pdfUrl: "/docs/Empresas/38 Grados Lab.pdf" },
      { nombre: "ADDITEQ by 3D PRYNXZ", email: "", pdfUrl: "/docs/Empresas/ADDITEQ by 3D PRYNXZ.pdf" },
      { nombre: "CBS México", email: "", pdfUrl: "/docs/Empresas/CBS México.pdf" },
      { nombre: "Chill Byte Solutions", email: "", pdfUrl: "/docs/Empresas/Chill Byte Solutions.pdf" },
      { nombre: "CQESH", email: "", pdfUrl: "/docs/Empresas/CQESH.pdf" },
      { nombre: "Faltantes empresas", email: "", pdfUrl: "/docs/Empresas/Faltantes empresas.pdf" },
      { nombre: "Gentres Talent Activation", email: "", pdfUrl: "/docs/Empresas/Gentres Talent Activation.pdf" },
      { nombre: "Grupo Lehren Artek", email: "", pdfUrl: "/docs/Empresas/Grupo Lehren Artek.pdf" },
      { nombre: "Health System", email: "", pdfUrl: "/docs/Empresas/Health System.pdf" },
      { nombre: "NOVATECH", email: "", pdfUrl: "/docs/Empresas/NOVATECH.pdf" },
      { nombre: "Open Source Integrators (OSI)", email: "", pdfUrl: "/docs/Empresas/Open Source Integrators (OSI).pdf" },
      { nombre: "TRIBUU", email: "", pdfUrl: "/docs/Empresas/TRIBUU.pdf" },
      { nombre: "Universidad IDESUM", email: "", pdfUrl: "/docs/Empresas/Universidad IDESUM.pdf" }
    ]
  }
];

export const estadisticasData = [
  { numero: "36", label: "Reconocimiento Ponentes y Conferencistas", icon: Award },
  { numero: "1116", label: "Asistencias", icon: Users },
  { numero: "8", label: "Reconocimiento de Programacion Basico", icon: Trophy },
  { numero: "8", label: "Reconocimiento de Programacion Avanzado", icon: Trophy }
];
