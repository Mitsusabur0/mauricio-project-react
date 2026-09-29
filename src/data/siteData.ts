import clinicImage from '../assets/editorial/clinic-consultation.jpg'
import researchImage from '../assets/editorial/medical-research.jpg'
import surgeryImage from '../assets/editorial/minimally-invasive-surgery.jpg'
import endometriosisStudyImage from '../assets/images/investigacion/1.webp'
import cerclageImage from '../assets/images/investigacion/2.webp'
import hysteroscopyImage from '../assets/images/investigacion/3.webp'
import ultrasoundCourseImage from '../assets/images/investigacion/4.webp'
import adenomyosisSurgeryImage from '../assets/images/investigacion/5.webp'

export const images = {
  clinic: clinicImage,
  surgery: surgeryImage,
  research: researchImage,
}

export const treatments = [
  {
    title: 'Endometriosis',
    description:
      'Enfermedad en la que tejido similar al del interior del útero (endometrio) crece fuera de él, provocando en algunos casos dolor, dificultad para embarazarse, entre otros síntomas. Requiere un diagnóstico y manejo en una unidad con un equipo especializado.',
    detailTitle: 'Cirugía de endometriosis',
    detail:
      'Cirugía compleja que requiere especialización y apoyo de un equipo multidisciplinario (coloproctólogo, urólogo, entre otros). El objetivo es resecar los focos de endometriosis en la pelvis u otras zonas preservando la función de los órganos.',
    guideIntro:
      'Puedes visitar la guía para el manejo quirúrgico de la endometriosis diseñada en conjunto con la Sociedad Chilena de Ginecología y Obstetricia (SOCHOG) haciendo click aquí',
    guideLabel:
      'GUÍA INFORMATIVA PARA EL ACOMPAÑAMIENTO EN EL MANEJO QUIRÚRGICO DE LA ENDOMETRIOSIS',
    guideUrl:
      'https://sochog.cl/wp-content/uploads/2025/04/1Informativo-endometriosis-20250414-aprobado.pdf',
  },
  {
    title: 'Adenomiosis',
    description:
      'Condición en que el tejido interior del útero (endometrio) se infiltra en la pared del mismo (miometrio). Puede causar menstruación dolorosa y sangrado abundante. Tratamientos frecuentes son el uso de anticonceptivos, dispositivo intrauterino medicado o, en última instancia, la cirugía.',
  },
  {
    title: 'Extracción del útero (histerectomía)',
    description:
      'Es una cirugía en la que se extirpa el útero. Se indica solo cuando otras alternativas no son suficientes y ya no se desean embarazos.',
    guideIntro:
      'Puedes visitar la guía informativa para la histerectomía diseñada en conjunto con la Sociedad Chilena de Ginecología y Obstetricia (SOCHOG) haciendo click aquí',
    guideLabel: 'GUÍA INFORMATIVA PARA LA REALIZACIÓN DE UNA HISTERECTOMÍA',
    guideUrl:
      'https://sochog.cl/wp-content/uploads/2023/10/GUIA-INFORMATIVA-PARA-LA-REALIZACION-DE-UNA-HISTERECTOMIA.pdf',
  },
  {
    title: 'Histeroscopía (pólipos, miomas, otros)',
    description:
      'Es un procedimiento mínimamente invasivo que permite observar y tratar desde el interior del útero, sin usar incisiones ni heridas. Pueden tratarse condiciones tales como pólipos, miomas, malformaciones uterinas, entre otros.',
  },
  {
    title: 'Quiste ovárico',
    description:
      'Es una imagen que sugiere un problema en alguno de los ovarios. Cuando son de origen benigno pueden tratarse a través de la remoción del quiste (quistectomía) o del ovario (anexectomía). Si sugieren cáncer requieren además la evaluación de un oncólogo.',
  },
  {
    title: 'Laparoscopía',
    description:
      'Es una técnica de cirugía que reemplaza el uso de grandes incisiones por otras pequeñas, a través de las cuales se instalan pinzas y una cámara. Producen menos dolor y permiten una mejor visualización a través de la amplificación de la imagen.',
  },
]

export const faqs = [
  {
    question: '¿Es normal tener dolor pélvico?',
    answer:
      'El dolor pélvico no es normal. Por mucho tiempo se pensó que el dolor durante la menstruación era algo "normal", pero la medicina actual reconoce que síntomas como dolor abdominal intenso, dolor durante la actividad sexual o al defecar pueden ser señales de endometriosis o adenomiosis.',
  },
  {
    question: '¿Cómo agendo mi cirugía si soy de otra región?',
    answer:
      'Para agendar tu cirugía desde otra región puedes completar el formulario para evaluación de cirugía prioritaria haciendo click aquí. Nos contactaremos contigo lo antes posible.',
    linkText: 'haciendo click aquí',
    linkUrl: 'https://tally.so/r/3jGjNY',
  },
  {
    question: '¿Qué es el Bono PAD de endometriosis profunda?',
    answer:
      'El Bono PAD Fonasa (Pago Asociado a Diagnóstico) es un beneficio que te permite acceder a ciertos procedimientos y cirugías con un precio conocido de antemano, lo que evita sorpresas en el presupuesto. Incluye:',
    bullets: [
      'Honorarios médicos',
      'Pabellón',
      'Hospitalización',
      'Exámenes',
      'Controles post operatorios',
    ],
    extra:
      'El Bono PAD cubre parte importante del tratamiento quirúrgico en pacientes con endometriosis ovárica y/o profunda. Incluye cirugía de endometriosis profunda y/o ovárica, hospitalización, seguimiento a 15 días y complicaciones directas en este periodo. El diagnóstico y tratamiento requiere un equipo especializado en esta enfermedad.',
    footnote: 'Se excluyó de este PAD la endometriosis intestinal.',
  },
  {
    question: '¿Qué es la cirugía mínimamente invasiva?',
    answer:
      'La cirugía mínimamente invasiva es un método quirúrgico que evita grandes incisiones en el abdomen. Los cirujanos utilizan esta técnica para causar el menor trauma posible durante el procedimiento. Las incisiones más pequeñas reducen el riesgo de dolor, complicaciones y el tiempo de recuperación. La cirugía laparoscópica, un tipo de cirugía de mínima invasión, permite además una mayor visualización, lo que mejora la calidad de la cirugía.',
  },
]

export const credentials = [
  'Ginecólogo',
  'Especialista en cirugía de mínima invasión y endometriosis',
  'Doctorado en Ciencias Médicas Ph.D.',
  'Director Dolor Pélvico y Endometriosis, Clínica Alemana Valdivia',
  'Director Instituto Ginecología y Obstetricia, Universidad Austral de Chile',
  'Miembro Directorio del Capítulo Cirugía Mínimamente Invasiva SOCHOG',
]

export type Publication = {
  slug: string
  date: string
  dateTime: string
  title: string
  description: string
  image: string
  imageAlt: string
  body: string[]
  participants?: string[]
  externalLink?: { label: string; url: string }
}

export const publications: Publication[] = [
  {
    slug: 'estudio-nacional-endometriosis-reconocimiento',
    date: '01-12-25',
    dateTime: '2025-12-01',
    title: 'Estudio nacional sobre endometriosis recibió importante reconocimiento',
    description:
      'Los datos preliminares del Estudio Nacional de Endometriosis fueron reconocidos como el Mejor Trabajo de Ginecología en el Congreso Nacional SOCHOG 2025.',
    image: endometriosisStudyImage,
    imageAlt: 'Recorte de prensa sobre el reconocimiento del estudio nacional de endometriosis',
    body: [
      'Se destacó el importante reconocimiento obtenido por el estudio sobre endometriosis liderado por el Dr. Mauricio Correa, director del Instituto de Obstetricia y Ginecología UACh, académico de la especialidad de la Escuela de Graduados y doctor en Ciencias Médicas por la UACh.',
      'Este primer estudio nacional es desarrollado por un equipo altamente comprometido, integrado también por el Dr. Ignacio Miranda y las matronas Octavia Ihnen y Paula Cayún, además del respaldo de la Fundación Chilena de Endometriosis, Fuchen.',
      'El estudio fue reconocido como el mejor trabajo en ginecología por la Sociedad Chilena de Obstetricia y Ginecología, un impulso clave para avanzar en más investigación y mejores políticas públicas en salud femenina.',
    ],
    participants: [
      'Dr. Ignacio Miranda',
      'Matrona Octavia Ihnen',
      'Matrona Paula Cayún',
      'Fundación Chilena de Endometriosis',
      'Agrupaciones de mujeres con endometriosis',
      'Cada una de las pacientes participantes del estudio',
    ],
    externalLink: {
      label: 'Leer la noticia completa',
      url: 'https://www.diariodevaldivia.cl/noticia/salud/2025/12/estudio-nacional-sobre-endometriosis-recibio-importante-reconocimiento',
    },
  },
  {
    slug: 'cerclaje-cervicoistmico-laparoscopico',
    date: '06-12-24',
    dateTime: '2024-12-06',
    title:
      'Cerclaje cervicoístmico laparoscópico: un abordaje sin agujas para el manejo de la insuficiencia cervical en pacientes embarazadas y no embarazadas.',
    description:
      'Publicación realizada junto a Ignacio Miranda-Mendoza, Rocío Durán-Cuiza, Paz Navarrete-Rey, Álvaro Carrasco, Bernardita Walker, Álvaro Insunza y Manuel Parra.',
    image: cerclageImage,
    imageAlt: 'Portada del artículo sobre cerclaje cervicoístmico laparoscópico',
    body: [
      'Junto a Ignacio Miranda-Mendoza, Rocío Durán-Cuiza, Paz Navarrete-Rey, Álvaro Carrasco, Bernardita Walker, Álvaro Insunza y Manuel Parra publicamos en la Revista Europea de Obstetricia, Ginecología y Biología Reproductiva un artículo sobre cerclaje laparoscópico.',
    ],
    externalLink: {
      label: 'Acceder al artículo',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0301211524005633',
    },
  },
  {
    slug: 'capitulo-tecnicas-histeroscopia-quirurgica',
    date: '13-10-24',
    dateTime: '2024-10-13',
    title: 'Nueva publicación de capítulo sobre técnicas de histeroscopía quirúrgica',
    description:
      'C.A. Buitrago Duque, I. Alonso Pacheco, I. Miranda Mendoza y M.E. Correa Duclos, autores del capítulo 52 del libro Histeroscopía y Cirugía Intrauterina.',
    image: hysteroscopyImage,
    imageAlt: 'Portada del libro Histeroscopía y Cirugía Intrauterina y su capítulo 52',
    body: [
      'Junto a C.A. Buitrago Duque, I. Alonso Pacheco, I. Miranda Mendoza y M.E. Correa Duclos fuimos autores del capítulo 52 “Técnicas quirúrgicas IV: adenomiosis, cuerpos extraños, cérvix restantes y malformaciones arteriovenosas” del libro Histeroscopía y Cirugía Intrauterina.',
    ],
  },
  {
    slug: 'curso-ecografia-ginecologica-avanzada',
    date: '28-09-24',
    dateTime: '2024-09-28',
    title: 'Curso de ecografía ginecológica avanzada',
    description: 'Organizado por Dr. Correa, Dr. Nelson Burgos, Dra. Preisler, Dr. Miranda.',
    image: ultrasoundCourseImage,
    imageAlt: 'Afiche del curso de ecografía ginecológica avanzada en Valdivia',
    body: [
      'Organizado por Dr. Correa, Dr. Nelson Burgos, Dra. Preisler y Dr. Miranda.',
      'Se realizó con mucho éxito el curso de ecografía ginecológica avanzada en Valdivia los días 27 y 28 de septiembre del 2024. Contamos con la presencia de destacados especialistas nacionales, quienes expusieron sobre cómo mejorar la planificación preoperatoria a través de la ecografía.',
      'Actualmente existe un cambio de paradigma, que transita desde la exploración quirúrgica “diagnóstica” hacia un diagnóstico ecográfico de precisión que permite una planificación preoperatoria detallada.',
      'Agradecemos a los especialistas y expositores por su participación.',
    ],
  },
  {
    slug: 'cirugia-adenomiosis-conservacion-uterina',
    date: '07-04-24',
    dateTime: '2024-04-07',
    title: 'Cirugía adenomiosis con conservación uterina',
    description:
      'Junto a la Dra. Franzel Álvarez y el Dr. Cristian Miranda desarrollamos un artículo científico sobre una técnica quirúrgica para tratar la adenomiosis con conservación uterina, una alternativa real a la histerectomía.',
    image: adenomyosisSurgeryImage,
    imageAlt: 'Artículo sobre tratamiento quirúrgico conservador de la adenomiosis',
    body: [
      'Junto a la Dra. Franzel Álvarez y el Dr. Cristian Miranda desarrollamos un artículo científico sobre una técnica quirúrgica para tratar la adenomiosis con conservación uterina, una alternativa real a la histerectomía.',
    ],
    externalLink: {
      label: 'Leer el artículo completo',
      url: 'https://www.rechog.com/frame_esp.php?id=270',
    },
  },
]
