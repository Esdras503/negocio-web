/**
 * Guardas de tema para el Asistente Nexobyte.
 *
 * El prompt es la primera defensa, pero estas comprobaciones evitan llamar al
 * modelo cuando el mensaje es claramente una inyección de instrucciones o una
 * pregunta general ajena a Nexobyte. Se aplican solo a casos de alta confianza:
 * si el mensaje menciona una página, un sitio o una demo, se deja pasar para
 * que el modelo pueda atender el contexto comercial.
 */
const INJECTION_PATTERNS = [
  /\b(?:ignora|ignore|olvida|forget|descarta|disregard)\b[\s\S]{0,50}\b(?:instrucciones|instructions|reglas|rules|prompt)\b/i,
  /\b(?:system|sistema)\s*(?:prompt|instrucciones)\b/i,
  /\b(?:revela|muestra|dame|comparte|show|reveal|print|cu[aá]l es)\b[\s\S]{0,40}\b(?:prompt|instrucciones internas|configuraci[oó]n interna|token|contrase[nñ]a)\b/i,
  /\b(?:dame|revela|muestra|comparte|cu[aá]l es)\b[\s\S]{0,40}\b(?:api\s*key|clave\s*api)\b/i,
  /\b(?:api\s*key|clave\s*api)\b[\s\S]{0,30}\b(?:nexobyte|sistema|servidor|asistente|interna)\b/i,
  /\b(?:variables? de entorno|environment variables?|endpoint interno|configuraci[oó]n interna)\b/i,
  /\b(?:modo desarrollador|developer mode|jailbreak)\b/i,
  /\bact[uú]a como (?:si fueras|otro|otra|un asistente|una ia|un modelo|chatgpt)\b/i,
  /\bact as\b[\s\S]{0,20}\b(?:a|an)?\s*(?:general\s+)?(?:assistant|ai|chatbot|model)\b/i,
  /\b(?:haz de cuenta|pretend|finge)\b[\s\S]{0,30}\b(?:you are|eres|que eres|ser)\b/i,
];

const OFF_TOPIC_PATTERNS = [
  // Deportes.
  /\b(?:quien (?:gano|va a ganar)|como (?:quedo|salio|termino)|resultado|marcador)\b[\s\S]{0,40}\b(?:partido|futbol|beisbol|baloncesto|liga|champions|mundial)\b/i,
  /\b(?:partido de futbol|champions league|mundial de futbol|liga de futbol)\b/i,
  /\b(?:que es|como se juega|reglas de)\b[\s\S]{0,30}\b(?:futbol|beisbol|baloncesto|tenis)\b/i,

  // Inteligencia artificial general.
  /\b(?:inteligencia artificial|\bia\b)\b[\s\S]{0,80}\b(?:reemplaz\w*|sustitu\w*|humano|humanos|futuro|trabajo|empleo|peligros?\w*|conciencia|sient\w*|piens\w*)\b/i,
  /\b(?:reemplaz\w*|sustitu\w*)\b[\s\S]{0,80}\b(?:humano|humanos|\bia\b|inteligencia artificial)\b/i,
  /\b(?:que es|como funciona|para que sirve)\b[\s\S]{0,40}\b(?:inteligencia artificial|\bia\b|chatgpt|gemini|modelo de lenguaje)\b/i,
  /\b(?:chatgpt|gemini)\b/i,

  // Política.
  /\b(?:elecciones|presidente|presidenta|diputado|alcalde|partido politico|candidato)\b/i,

  // Religión.
  /\b(?:quien es|existe|que es|crees en|hablame de|cuentame sobre)\b[\s\S]{0,30}\b(?:dios|religion|biblia|jesus|ala)\b/i,
  /\b(?:que es|quien es|existe|hablame de|cuentame sobre)\b[\s\S]{0,30}\b(?:iglesia|oracion|rezar)\b/i,

  // Noticias.
  /\b(?:que paso|que opinas|has visto|leiste|cuentame)\b[\s\S]{0,40}\b(?:noticias|periodico|actualidad nacional|ultima hora)\b/i,
  /\bultima hora\b/i,

  // Historia y filosofía.
  /\b(?:historia universal|segunda guerra|primera guerra|imperio romano|revolucion francesa|independencia de|filosofia|filosofo|kant|nietzsche)\b/i,

  // Relaciones personales.
  /\b(?:consejos? (?:de|para) (?:pareja|amor)|problemas? de pareja|mi (?:novia|novio|pareja) me (?:dejo|engano)|relacion de pareja)\b/i,
  /\b(?:como|problema|consejo|salvar)\b[\s\S]{0,30}\b(?:matrimonio|divorcio)\b/i,
  /\b(?:cuanto cuesta|precio de) un divorcio\b/i,

  // Tareas escolares.
  /\b(?:tarea|deberes|examen)\b[\s\S]{0,30}\b(?:escuela|colegio|universidad|clase|materia|matematicas|fisica|quimica)\b/i,
  /\b(?:ayudame|resuelve|hazme)\b[\s\S]{0,30}\b(?:tarea|deberes|examen|matematicas|fisica|quimica)\b/i,

  // Programación general.
  /\b(?:aprender a programar|como programar|curso de programacion)\b/i,
  /\b(?:python|javascript|typescript|java|c\+\+|html|css|sql|algoritmo|react|node\.?js)\b/i,

  // Medicina, legal y finanzas personales.
  /\b(?:diagnostico|sintomas?|medicamento|dosis|receta medica|me duele|enfermedad)\b/i,
  /\b(?:necesito|busco|contratar|consejo de|asesoria de)\b[\s\S]{0,30}\b(?:abogado|demanda judicial|problema legal)\b/i,
  /\b(?:demanda judicial|asesoria legal|problema legal|contrato de arrendamiento)\b/i,
  /\b(?:como|donde|debo|me conviene|consejo|asesoria)\b[\s\S]{0,40}\b(?:invertir|inviert\w*|inversi[oó]n(?:es)?|finanzas personales|creditos?|deudas?|hipotecas?)\b/i,
  /\b(?:mis finanzas|mi deuda|mi hipoteca|mi credito)\b/i,
];

const WEB_CONTEXT_PATTERN =
  /\b(?:p[aá]gina|sitio|web|nexobyte|demo|cat[aá]logo|cotizaci[oó]n|presupuesto|dise[nñ]o|desarrollo|men[uú]|whatsapp|formulario|contacto|chatbot)\b/i;

const OFF_TOPIC_REDIRECT =
  'Mi función es ayudarte con los servicios de Nexobyte y las páginas web para tu negocio. Si quieres, puedo mostrarte una demo o preparar una cotización.';

const INJECTION_REDIRECT =
  'No puedo compartir instrucciones ni información interna. Puedo ayudarte con los servicios de Nexobyte, las demos o una cotización para tu negocio.';

function normalize(message) {
  if (typeof message !== 'string') return '';

  // Se quitan los acentos solo para comparar. Así los límites de palabra (\b)
  // funcionan también en palabras como "quién", "fútbol" o "política".
  return message
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getTopicGuardReply(message) {
  const text = normalize(message);
  if (!text) return null;

  if (INJECTION_PATTERNS.some((pattern) => pattern.test(text))) {
    return { kind: 'injection', reply: INJECTION_REDIRECT };
  }

  // Una consulta que menciona el sitio, una página o una demo puede ser
  // comercial aunque incluya palabras de otro ámbito. En ese caso decide el
  // prompt, no esta lista de palabras.
  if (WEB_CONTEXT_PATTERN.test(text)) return null;

  if (OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(text))) {
    return { kind: 'off-topic', reply: OFF_TOPIC_REDIRECT };
  }

  return null;
}
