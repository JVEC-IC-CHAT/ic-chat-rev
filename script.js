document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     IC-Chat — Configuración de EmailJS (misma cuenta que el IC-APP)
     ========================================================================== */
  const EMAILJS_PUBLIC_KEY = '0Q8JX5Zz32f-rVjSd';
  const EMAILJS_SERVICE_ID = 'service_fhswc2x';
  const EMAILJS_TEMPLATE_ID = 'template_b13wfy9';

  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  /* ==========================================================================
     IC-Chat — BLOQUE 1
     Objetivo de este bloque: esqueleto visual de burbujas + selección de
     idioma + mensaje de bienvenida funcionando. Sin formularios todavía.
     La lógica de flujo (appState, i18n, motor de burbujas) está diseñada
     para que los próximos bloques solo AGREGUEN pasos, sin reescribir esto.
     ========================================================================== */

  // ---------- i18n (se irá completando bloque a bloque) ----------
  const i18n = {
    en: {
      chatHeaderTitle: "IC-Chat",
      chatHeaderSubtitle: "Jaime Ventura Energy Consultant",
      welcomeMessage: "Welcome to IC-Chat. It will be a pleasure to learn a little about your project — a few brief questions will help us connect you with the IC Ambassador best suited to accompany you.",
      restartButton: "🔄 Restart",
      continueButton: "Continue",
      langEN: "English",
      langSP: "Español",

      userTypeQuestion: "To begin, could you tell us which of the following best describes you?",
      userTypeUserBtn: "Solutions User",
      userTypeSupplierBtn: "Solutions Provider",
      userTypeInfoBtn: "What's the difference?",
      userTypeUserInfo: "As a Solutions User, you might be an end user, property owner, installer, or project designer — or, at a larger scale, a distributor or wholesaler — interested in energy-saving, backup power, or power quality solutions, with meaningful savings and a unified warranty.",
      userTypeSupplierInfo: "As a Solutions Provider, your company manufactures, distributes, or installs solutions with locally available stock, and you are interested in joining our Integration Coefficient (IC) model to offer complete solutions — not just products — to our Solutions Users.",
      userTypeInfoBackButton: "← Back to the question",
      block2Placeholder: "✅ Block 2 is working — your profile has been recorded as: ",

      exitConfirmQuestion: "Are you sure you would like to close this conversation?",
      exitConfirmYes: "Yes, close",
      exitConfirmNo: "Continue here",
      exitIncompleteNote: "Understood. The information you have shared so far will be saved as an incomplete inquiry, in case a brief follow-up could be useful to you.",
      exitGoodbyeMessage: "Thank you for your time. Whenever you would like to continue, this window will be here for you.",
      nothingToGoBackNote: "There is no previous question to go back to yet.",

      roleQuestion: "To guide you more precisely, which of the following best describes your role in this project?",
      roleInstaller: "🔧 Installer",
      roleEndUser: "🏠 End User",
      roleDesigner: "📐 Project Designer",
      roleDistributor: "📦 Distributor / Wholesaler",
      roleInfoButton: "If needed, please read a brief description of each Solutions User type to help you choose.",
      roleInfoInstaller: "Installer: aims to grow margin and installation volume with unified-warranty, kit-type solutions, closer to factory pricing through shared FCL purchases with other installers.",
      roleInfoEndUser: "End User: individuals or companies seeking significant savings (up to 60%) and a smooth energy transition, with proven solutions from leading brands.",
      roleInfoDesigner: "Project Designer: uses our pre-designed, tested solutions and technical consulting to sharpen project accuracy and grow service sales.",
      roleInfoDistributor: "Distributor / Wholesaler: high-volume buyers who qualify for additional factory discounts as strategic allies of the IC model.",
      backToQuestionButton: "← Back to the question",

      nameQuestion: "What is your full name, or your company name if this request is for business purposes?",
      nameInputLabel: "Name:",
      nameEmptyError: "Please share your name to continue.",

      phoneQuestion: "What phone number or WhatsApp can we reach you at, including your country?",
      phoneCountryLabel: "Country",
      phoneNumberPlaceholder: "Phone number",
      phoneEmptyError: "Please enter your phone number.",
      phoneInvalidError: "Please enter a valid phone number (digits only, 6 to 15 digits).",

      emailQuestion: "What is your email address?",
      emailInputLabel: "Email:",
      emailEmptyError: "Please enter a valid email address.",

      addressQuestion: "What is your address, including country?",
      addressInputLabel: "Address:",
      addressEmptyError: "Please share your address.",

      postalCodeQuestion: "And your postal code?",
      postalCodeInputLabel: "Postal code:",
      postalCodeEmptyError: "Please enter your postal code.",

      titleQuestion: "What is your title? If this request is personal rather than business, you may simply write \"Personal.\"",
      titleInputLabel: "Title:",
      titleEmptyError: "Please complete this field.",

      howHearQuestion: "How did you hear about us?",
      refBlogs: "Blogs", refLinkedIn: "LinkedIn", refWeb: "Surfing the web",
      refReferredUser: "Referral", refSocial: "Social Media", refOther: "Other",
      referrerNameQuestion: "Wonderful — could you share the name of the person who referred you? (optional)",
      referrerNameInputLabel: "Referrer's name:",
      referrerEmailQuestion: "And their email, if you have it? (optional)",
      referrerEmailInputLabel: "Referrer's email:",
      referrerPhoneQuestion: "And their phone/WhatsApp, if you have it? (optional)",
      skipButton: "Skip this field",

      solutionsQuestion: "Which type(s) of solution do you need? You may choose more than one.",
      solutionsConfirmButton: "Continue with this selection",
      solutionsEmptyError: "Please select at least one option.",
      subSolutionsQuestionPrefix: "Within ",
      subSolutionsQuestionSuffix: ", could you specify which option(s)?",
      specialRequirementsQuestionUser: "Please briefly describe your requirement:",
      specialRequirementsQuestionSupplier: "Please briefly describe those additional solutions:",
      specialRequirementsInputLabel: "Details:",
      specialRequirementsEmptyError: "Please share a brief description so we can review it.",

      timeframeQuestion: "What is the estimated timeframe for this project?",
      tfNow: "Now", tf1to3Months: "1–3 months", tf4to6Months: "4–6 months",
      tfWithinYear: "Within this year", tfReviewing: "Still under review",

      inAHurryQuestion: "Are you in a hurry (right now)? Expedited local solutions may also be available — would you like us to check for you?",
      yesButton: "Yes", noButton: "No", maybeButton: "Maybe",

      block3Summary: "✅ Block 3 complete. Here is a summary of what was recorded:",
      block3SummaryNote: "In Block 6, this information will be sent automatically to your IC Ambassador via EmailJS.",

      businessNameQuestion: "What is your business name? If you are self-employed, your personal name is fine.",
      supplierTypeQuestion: "To guide you more precisely, which of the following best describes your business?",
      supplierTypeAsianMfr: "🏭 Asian Manufacturer",
      supplierTypeLocalMfr: "🏗️ Local/Regional Manufacturer",
      supplierTypeLocalDist: "📦 Local Distributor/Wholesaler",
      supplierTypeLocalInstaller: "🔧 Installer with Local Stock",
      supplierTypeOther: "❓ Other",
      otherExplainQuestion: "Could you briefly tell us more about that?",
      otherExplainInputLabel: "Details:",
      otherExplainEmptyError: "Please share a brief detail so we can understand better.",
      businessNameInputLabel: "Business name:",
      businessNameEmptyError: "Please share your business or personal name to continue.",
      websiteQuestion: "Do you have a website you would like to share? (optional)",
      websiteInputLabel: "Website:",
      websiteEmptyError: "You may write your website, or tap \"Skip this field.\"",
      solutionsProvidedQuestion: "Which type(s) of solution can your business provide? You may choose more than one.",
      specialItemLabelUser: "Any other requirement not covered above?",
      specialItemLabelSupplier: "Do you offer solutions different from those listed above?",
      deliveryTimeframeQuestion: "What is your typical delivery timeframe?",
      tfStock: "In stock",
      safetyStandardsQuestion: "Do your solutions meet any specific safety standards you would like to mention? (optional)",
      safetyStandardsInputLabel: "Safety standards:",
      safetyStandardsEmptyError: "You may describe your safety standards, or tap \"Skip this field.\"",
      block4Summary: "✅ Block 4 complete. Here is a summary of what was recorded:",
      block4SummaryNote: "In Block 6, this information will be sent automatically to your IC Ambassador via EmailJS.",
      registrationCompleteTransition: "Perfect — I have everything I need.",

      ratingQuestion: "On a scale of 0 to 5, how would you rate your experience with IC-Chat so far?",
      rating5Formal: "5 — Excellent", rating5Playful: "Like the stars aligning 🌟",
      rating4Formal: "4 — Very Good", rating4Playful: "Left us in good standing",
      rating3Formal: "3 — Good", rating3Playful: "Did what it was supposed to",
      rating2Formal: "2 — Average", rating2Playful: "Neither here nor there, honestly",
      rating1Formal: "1 — Below Average", rating1Playful: "Left a lot to be desired",
      rating0Formal: "0 — Bad", rating0Playful: "An absolute disaster 😅",
      commentQuestion: "Would you like to add any comments about your experience? (optional)",
      commentInputLabel: "Comments:",
      commentSkipLabel: "I prefer not to add comments",
      commentEmptyError: "You may write a comment, or tap \"I prefer not to add comments.\"",
      block5Note: "✅ Block 5 complete — rating: ",
      finalGoodbyeMessage: "Thank you very much for your time and patience. Your request has been recorded, and your IC Ambassador will be reaching out to you soon.",

      sendingNote: "One moment — sending your information to your IC Ambassador...",
      sendErrorNote: "We're having trouble sending your information automatically right now. As a safety net, you can also send it directly by email using the button below.",
      sendErrorFallbackButton: "📧 Send by email instead",
      exitSendingNote: "One moment — saving your information...",
    },
    sp: {
      chatHeaderTitle: "IC-Chat",
      chatHeaderSubtitle: "Jaime Ventura Energy Consultant",
      welcomeMessage: "Bienvenidos al IC-Chat. Será un gusto conocer un poco sobre su proyecto: unas breves preguntas nos permitirán conectarlo con el IC Ambassador más indicado para acompañarlo.",
      restartButton: "🔄 Reiniciar",
      continueButton: "Continuar",
      langEN: "English",
      langSP: "Español",

      userTypeQuestion: "Para comenzar, ¿podría indicarnos cuál de las siguientes opciones lo describe mejor?",
      userTypeUserBtn: "Usuario de Soluciones",
      userTypeSupplierBtn: "Proveedor de Soluciones",
      userTypeInfoBtn: "¿Cuál es la diferencia?",
      userTypeUserInfo: "Como Usuario de Soluciones, puede ser un usuario final, propietario, instalador o diseñador de proyectos — o, a mayor escala, un distribuidor o mayorista — interesado en soluciones de ahorro energético, respaldo eléctrico o calidad de energía, con ahorros significativos y garantía unificada.",
      userTypeSupplierInfo: "Como Proveedor de Soluciones, su empresa fabrica, distribuye o instala soluciones con disponibilidad local de stock, y le interesa sumarse a nuestro modelo de Coeficiente de Integración (IC) para ofrecer soluciones completas — no solo productos — a nuestros Usuarios de Soluciones.",
      userTypeInfoBackButton: "← Volver a la pregunta",
      block2Placeholder: "✅ El Bloque 2 funciona — su perfil quedó registrado como: ",

      exitConfirmQuestion: "¿Está seguro de que desea cerrar esta conversación?",
      exitConfirmYes: "Sí, cerrar",
      exitConfirmNo: "Continuar aquí",
      exitIncompleteNote: "Entendido. La información que compartió hasta este momento quedará guardada como una consulta incompleta, por si un breve seguimiento pudiese serle de utilidad.",
      exitGoodbyeMessage: "Gracias por su tiempo. Cuando desee continuar, esta ventana estará aquí para usted.",
      nothingToGoBackNote: "Aún no hay una pregunta anterior a la cual volver.",

      roleQuestion: "Para orientar mejor su acompañamiento, ¿cuál de las siguientes opciones describe mejor su rol frente a este proyecto?",
      roleInstaller: "🔧 Instalador",
      roleEndUser: "🏠 Usuario final",
      roleDesigner: "📐 Diseñador de Proyectos",
      roleDistributor: "📦 Distribuidor / Mayorista",
      roleInfoButton: "Si lo necesita, por favor lea la descripción de cada tipo de Usuario de Soluciones para una mejor selección.",
      roleInfoInstaller: "Instalador: busca aumentar su margen y su volumen de instalaciones con soluciones tipo kit y garantía unificada, acercándose a precios de fábrica mediante compras FCL compartidas con otros instaladores.",
      roleInfoEndUser: "Usuario final: particulares o empresas que buscan ahorros significativos (hasta un 60%) y una transición energética sin complicaciones, con soluciones probadas de marcas líderes.",
      roleInfoDesigner: "Diseñador de Proyectos: aprovecha nuestras soluciones pre-diseñadas y consultoría técnica para elevar la precisión de sus diseños y ampliar sus ventas de servicios.",
      roleInfoDistributor: "Distribuidor / Mayorista: compras de alto volumen que califican para descuentos adicionales de fábrica, como aliado estratégico del modelo IC.",
      backToQuestionButton: "← Volver a la pregunta",

      nameQuestion: "¿Cuál es su nombre completo, o el nombre de su empresa si la solicitud es de carácter comercial?",
      nameInputLabel: "Nombre:",
      nameEmptyError: "Por favor, indíquenos su nombre para continuar.",

      phoneQuestion: "¿A qué número de teléfono o WhatsApp podemos contactarlo, incluyendo su país?",
      phoneCountryLabel: "País",
      phoneNumberPlaceholder: "Número telefónico",
      phoneEmptyError: "Por favor, ingrese su número telefónico.",
      phoneInvalidError: "Por favor, ingrese un número telefónico válido (solo dígitos, entre 6 y 15 números).",

      emailQuestion: "¿Cuál es su dirección de correo electrónico?",
      emailInputLabel: "Correo electrónico:",
      emailEmptyError: "Por favor, ingrese un correo electrónico válido.",

      addressQuestion: "¿Cuál es su dirección, incluyendo el país?",
      addressInputLabel: "Dirección:",
      addressEmptyError: "Por favor, indíquenos su dirección.",

      postalCodeQuestion: "¿Y su código postal?",
      postalCodeInputLabel: "Código postal:",
      postalCodeEmptyError: "Por favor, ingrese su código postal.",

      titleQuestion: "¿Cuál es su cargo? Si esta solicitud es de carácter personal y no comercial, puede simplemente escribir \"Personal.\"",
      titleInputLabel: "Cargo:",
      titleEmptyError: "Por favor, complete este campo.",

      howHearQuestion: "¿Cómo se enteró de nosotros?",
      refBlogs: "Blogs", refLinkedIn: "LinkedIn", refWeb: "Navegando por la web",
      refReferredUser: "Referido", refSocial: "Redes Sociales", refOther: "Otro",
      referrerNameQuestion: "Con gusto — ¿podría compartirnos el nombre de quien lo refirió? (opcional)",
      referrerNameInputLabel: "Nombre de quien lo refirió:",
      referrerEmailQuestion: "¿Y su correo electrónico, si lo tiene a la mano? (opcional)",
      referrerEmailInputLabel: "Correo de quien lo refirió:",
      referrerPhoneQuestion: "¿Y su teléfono o WhatsApp, si lo tiene a la mano? (opcional)",
      skipButton: "Omitir este campo",

      solutionsQuestion: "¿Qué tipo(s) de solución necesita? Puede elegir más de una.",
      solutionsConfirmButton: "Continuar con esta selección",
      solutionsEmptyError: "Por favor, seleccione al menos una opción.",
      subSolutionsQuestionPrefix: "Dentro de ",
      subSolutionsQuestionSuffix: ", ¿podría indicarnos qué opción(es) le interesan?",
      specialRequirementsQuestionUser: "Por favor, describa brevemente su requerimiento:",
      specialRequirementsQuestionSupplier: "Por favor, describa brevemente esas soluciones adicionales que ofrece:",
      specialRequirementsInputLabel: "Detalle:",
      specialRequirementsEmptyError: "Por favor, comparta una breve descripción para que podamos revisarla.",

      timeframeQuestion: "¿Cuál es el plazo estimado para este proyecto?",
      tfNow: "Ahora", tf1to3Months: "1–3 meses", tf4to6Months: "4–6 meses",
      tfWithinYear: "Dentro de este año", tfReviewing: "Aún en revisión",

      inAHurryQuestion: "¿Tiene prisa (ahora mismo)? Es posible que también contemos con soluciones locales expeditas — ¿desea que lo verifiquemos por usted?",
      yesButton: "Sí", noButton: "No", maybeButton: "Tal vez",

      block3Summary: "✅ Bloque 3 completo. Este es un resumen de lo registrado:",
      block3SummaryNote: "En el Bloque 6, esta información se enviará automáticamente a su IC Ambassador vía EmailJS.",

      businessNameQuestion: "¿Cuál es el nombre de su negocio? Si trabaja de forma independiente, puede indicar su nombre personal.",
      supplierTypeQuestion: "Para orientar mejor su acompañamiento, ¿cuál de las siguientes opciones describe mejor su negocio?",
      supplierTypeAsianMfr: "🏭 Fabricante Asiático",
      supplierTypeLocalMfr: "🏗️ Fabricante Local/Regional",
      supplierTypeLocalDist: "📦 Distribuidor/Mayorista Local",
      supplierTypeLocalInstaller: "🔧 Instalador con Stock Local",
      supplierTypeOther: "❓ Otro",
      otherExplainQuestion: "¿Podría contarnos brevemente un poco más al respecto?",
      otherExplainInputLabel: "Detalle:",
      otherExplainEmptyError: "Por favor, comparta un breve detalle para poder entenderlo mejor.",
      businessNameInputLabel: "Nombre del negocio:",
      businessNameEmptyError: "Por favor, indíquenos el nombre de su negocio o su nombre personal para continuar.",
      websiteQuestion: "¿Cuenta con un sitio web que desee compartir? (opcional)",
      websiteInputLabel: "Sitio web:",
      websiteEmptyError: "Puede escribir su sitio web, o tocar \"Omitir este campo.\"",
      solutionsProvidedQuestion: "¿Qué tipo(s) de solución puede proveer su negocio? Puede elegir más de una.",
      specialItemLabelUser: "¿Tiene algún otro requerimiento no cubierto por las opciones anteriores?",
      specialItemLabelSupplier: "¿Cuenta con soluciones distintas a las que ofrecemos?",
      deliveryTimeframeQuestion: "¿Cuál es su plazo típico de entrega?",
      tfStock: "En stock",
      safetyStandardsQuestion: "¿Sus soluciones cumplen con algún estándar de seguridad específico que desee mencionar? (opcional)",
      safetyStandardsInputLabel: "Estándares de seguridad:",
      safetyStandardsEmptyError: "Puede describir sus estándares de seguridad, o tocar \"Omitir este campo.\"",
      block4Summary: "✅ Bloque 4 completo. Este es un resumen de lo registrado:",
      block4SummaryNote: "En el Bloque 6, esta información se enviará automáticamente a su IC Ambassador vía EmailJS.",
      registrationCompleteTransition: "Perfecto — ya tengo todo lo que necesito.",

      ratingQuestion: "En una escala del 0 al 5, ¿cómo calificaría su experiencia con el IC-Chat hasta este momento?",
      rating5Formal: "5 — Excelente", rating5Playful: "Como si las estrellas se alinearan 🌟",
      rating4Formal: "4 — Muy Buena", rating4Playful: "Nos dejó muy bien parados",
      rating3Formal: "3 — Buena", rating3Playful: "Cumplió lo esperado",
      rating2Formal: "2 — Promedio", rating2Playful: "Ni fu ni fa, honestamente",
      rating1Formal: "1 — Bajo del Promedio", rating1Playful: "Dejó bastante que desear",
      rating0Formal: "0 — Mala", rating0Playful: "Un desastre total 😅",
      commentQuestion: "¿Desea agregar algún comentario sobre su experiencia? (opcional)",
      commentInputLabel: "Comentarios:",
      commentSkipLabel: "Prefiero no agregar comentarios",
      commentEmptyError: "Puede escribir un comentario, o tocar \"Prefiero no agregar comentarios.\"",
      block5Note: "✅ Bloque 5 completo — calificación: ",
      finalGoodbyeMessage: "Muchas gracias por su tiempo y su paciencia. Su solicitud quedó registrada, y su IC Ambassador se pondrá en contacto con usted muy pronto.",

      sendingNote: "Un momento — enviando su información a su IC Ambassador...",
      sendErrorNote: "En este momento tenemos dificultades para enviar su información de forma automática. Como respaldo, también puede enviarla directamente por correo con el botón de abajo.",
      sendErrorFallbackButton: "📧 Enviar por correo en su lugar",
      exitSendingNote: "Un momento — guardando su información...",
    }
  };

  // ---------- Estado global del chat ----------
  const appState = {
    lang: null, // se define al elegir idioma; nada más avanza sin esto
    userType: null,
    collectedData: {} // aquí se irán acumulando los campos del registro en los próximos bloques
  };

  // Guarda cómo volver a pintar el último paso mostrado, para el botón "Continuar aquí" al cancelar una salida.
  let lastOptionsRenderer = null;

  // Pila de pasos anteriores, para el botón ↺ de "corregir respuesta anterior".
  // Se alimenta automáticamente desde las 4 funciones base del motor (showOptions, showTextInput,
  // showPhoneInput, showMultiSelect) — no hace falta tocar cada uno de los pasos del flujo.
  let navigationStack = [];
  let isNavigatingBack = false;
  let lastThreadBookmark = 0; // cuántas burbujas había en el hilo justo cuando se mostró el paso actual

  // ---------- Datos portados del IC-APP original ----------
  const countryCodes = [
    { code: '+1', en: 'USA', sp: 'EE. UU.' }, { code: '+52', en: 'Mexico', sp: 'México' },
    { code: '+502', en: 'Guatemala', sp: 'Guatemala' }, { code: '+501', en: 'Belize', sp: 'Belice' },
    { code: '+503', en: 'El Salvador', sp: 'El Salvador' }, { code: '+504', en: 'Honduras', sp: 'Honduras' },
    { code: '+505', en: 'Nicaragua', sp: 'Nicaragua' }, { code: '+506', en: 'Costa Rica', sp: 'Costa Rica' },
    { code: '+507', en: 'Panama', sp: 'Panamá' }, { code: '+57', en: 'Colombia', sp: 'Colombia' },
    { code: '+58', en: 'Venezuela', sp: 'Venezuela' }, { code: '+593', en: 'Ecuador', sp: 'Ecuador' },
    { code: '+51', en: 'Peru', sp: 'Perú' }, { code: '+591', en: 'Bolivia', sp: 'Bolivia' },
    { code: '+55', en: 'Brazil', sp: 'Brasil' }, { code: '+595', en: 'Paraguay', sp: 'Paraguay' },
    { code: '+598', en: 'Uruguay', sp: 'Uruguay' }, { code: '+54', en: 'Argentina', sp: 'Argentina' },
    { code: '+56', en: 'Chile', sp: 'Chile' }, { code: '+1', en: 'Dominican Republic', sp: 'República Dominicana' },
    { code: '+1', en: 'Puerto Rico', sp: 'Puerto Rico' }, { code: '+53', en: 'Cuba', sp: 'Cuba' },
    { code: '+1', en: 'Jamaica', sp: 'Jamaica' }, { code: '+1', en: 'Trinidad and Tobago', sp: 'Trinidad y Tobago' },
    { code: '+1', en: 'Bahamas', sp: 'Bahamas' }, { code: '+509', en: 'Haiti', sp: 'Haití' },
    { code: '+34', en: 'Spain', sp: 'España' }, { code: '+39', en: 'Italy', sp: 'Italia' },
    { code: '+91', en: 'India', sp: 'India' }, { code: '+49', en: 'Germany', sp: 'Alemania' },
    { code: '+61', en: 'Australia', sp: 'Australia' }, { code: '+32', en: 'Belgium', sp: 'Bélgica' },
    { code: '+1', en: 'Canada', sp: 'Canadá' }, { code: '+86', en: 'China', sp: 'China' },
    { code: '+82', en: 'South Korea', sp: 'Corea del Sur' }, { code: '+20', en: 'Egypt', sp: 'Egipto' },
    { code: '+971', en: 'United Arab Emirates', sp: 'Emiratos Árabes Unidos' }, { code: '+63', en: 'Philippines', sp: 'Filipinas' },
    { code: '+33', en: 'France', sp: 'Francia' }, { code: '+44', en: 'United Kingdom', sp: 'Reino Unido' },
    { code: '+972', en: 'Israel', sp: 'Israel' }, { code: '+81', en: 'Japan', sp: 'Japón' },
    { code: '+31', en: 'Netherlands', sp: 'Países Bajos' }, { code: '+234', en: 'Nigeria', sp: 'Nigeria' },
    { code: '+351', en: 'Portugal', sp: 'Portugal' }, { code: '+7', en: 'Russia', sp: 'Rusia' },
    { code: '+966', en: 'Saudi Arabia', sp: 'Arabia Saudita' }, { code: '+27', en: 'South Africa', sp: 'Sudáfrica' },
    { code: '+41', en: 'Switzerland', sp: 'Suiza' }, { code: '+90', en: 'Turkey', sp: 'Turquía' }
  ];

  const solutionsData = [
    { id: 'on-grid', icon: 'on_grid_icon.png', en: 'On-Grid Solar System', sp: 'Sistema Solar Conectado a Red' },
    { id: 'hybrid', icon: 'hybrid_icon.png', en: 'Hybrid Solar System', sp: 'Sistema Solar Híbrido' },
    { id: 'portable-in-grid', icon: 'in_grid_icon.png', en: 'Portable Solar Stations (In-Grid)', sp: 'Estaciones Solares Portátiles (In-Grid)' },
    { id: 'off-grid', icon: 'off_grid_icon-r.png', en: 'Off-Grid Solar System', sp: 'Sistema Solar Aislado' },
    { id: 'solar-plant', icon: 'solar_plant-microgrid_icon.png', en: 'Solar Power Plants - Microgrids', sp: 'Plantas de Energía Solar - Microrredes' },
    { id: 'power-quality', icon: 'power_quality_icon.png', en: 'Power Quality', sp: 'Calidad de Energía',
      sub: [
        { id: 'ups', en: 'Online UPS', sp: 'UPS Online' },
        { id: 'transformers', en: 'Isolation or K-Factor Transformers', sp: 'Transformadores de Aislamiento o Factor K' },
        { id: 'conditioners', en: 'Line Conditioners or Voltage Regulators', sp: 'Acondicionadores de Línea o Reguladores de Voltaje' },
        { id: 'suppressors', en: 'Surge Suppressors', sp: 'Supresores de Sobretensión' },
        { id: 'other-pq', en: 'Others or a combination', sp: 'Otros o una combinación' }
      ]
    },
    { id: 'ac-dc-backup', icon: 'acdc_backup_icon.png', en: 'AC-DC Backup System', sp: 'Sistema de Respaldo AC-DC' },
    { id: 'oem-battery', icon: 'oem_battery_projects_icon.png', en: 'OEM Battery Projects', sp: 'Proyectos de Baterías OEM' },
    { id: 'solar-street-light', icon: 'allinone_solar_led_icon.png', en: 'All-in-One Solar LED Street Lamps', sp: 'Lámparas Solares LED Todo-en-Uno' },
    { id: 'led-lighting', icon: 'led_lighting_icon.png', en: 'LED Lighting (Indoor/Outdoor)', sp: 'Iluminación LED (Interior/Exterior)' },
    { id: 'basic-pq-retail', icon: 'basic_power_protection_icon.png', en: 'Basic Power Protection (Retail)', sp: 'Protección Básica de Energía (Minorista)',
      sub: [
        { id: 'voltage-protectors', en: 'Voltage Protectors for Appliances', sp: 'Protectores de Voltaje para Electrodomésticos' },
        { id: 'ups-regulators-retail', en: 'UPS and/or Voltage Regulators', sp: 'UPS y/o Reguladores de Voltaje' }
      ]
    },
    { id: 'special-requirement', icon: 'special_requirement_icon.png', en: 'Any other type of solution, or comments you would like to share?', sp: '¿Algún otro tipo de soluciones o tiene comentarios que aportar?' }
  ];

  // ---------- Referencias DOM ----------
  const threadEl = document.getElementById('chat-thread');
  const optionsBarEl = document.getElementById('chat-options-bar');
  const headerTitleEl = document.getElementById('chat-header-title');
  const headerSubtitleEl = document.getElementById('chat-header-subtitle');
  const botBubbleTpl = document.getElementById('tpl-bot-bubble');
  const userBubbleTpl = document.getElementById('tpl-user-bubble');

  function t(key) {
    if (!appState.lang) return '';
    return (i18n[appState.lang] && i18n[appState.lang][key]) || key;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    const digitsOnly = value.replace(/[\s\-()]/g, '');
    return /^\d{6,15}$/.test(digitsOnly);
  }

  // ---------- Motor de burbujas ----------
  function scrollThreadToBottom() {
    threadEl.scrollTop = threadEl.scrollHeight;
  }

  function appendUserBubble(html) {
    const node = userBubbleTpl.content.cloneNode(true);
    node.querySelector('.bubble-content').innerHTML = html;
    threadEl.appendChild(node);
    scrollThreadToBottom();
  }

  function appendBotBubbleImmediate(html, extraClass) {
    const node = botBubbleTpl.content.cloneNode(true);
    const bubbleEl = node.querySelector('.bot-bubble');
    if (extraClass) bubbleEl.classList.add(extraClass);
    node.querySelector('.bubble-content').innerHTML = html;
    threadEl.appendChild(node);
    scrollThreadToBottom();
  }

  // Simula "el bot está escribiendo" antes de mostrar el mensaje.
  // Devuelve una Promise para poder encadenar pasos (await botSay(...); showOptions(...)).
  function botSay(html, opts) {
    opts = opts || {};
    const extraClass = opts.extraClass || null;
    const delay = (opts.delayMs !== undefined) ? opts.delayMs : 500;
    return new Promise((resolve) => {
      const typingNode = document.createElement('div');
      typingNode.className = 'typing-bubble';
      typingNode.innerHTML = '<span></span><span></span><span></span>';
      threadEl.appendChild(typingNode);
      scrollThreadToBottom();
      setTimeout(() => {
        typingNode.remove();
        appendBotBubbleImmediate(html, extraClass);
        resolve();
      }, delay);
    });
  }

  // Limpia la barra de opciones (se hace SIEMPRE antes de mostrar nuevas,
  // así nunca hay opciones "viejas" clicables por accidente).
  function clearOptions() {
    optionsBarEl.innerHTML = '';
  }

  // options: [{ label, value, style: 'primary'|'secondary', fullRow: bool, onSelect: fn }]
  function showOptions(options) {
    if (!isNavigatingBack && lastOptionsRenderer) navigationStack.push({ renderer: lastOptionsRenderer, threadLength: lastThreadBookmark });
    lastOptionsRenderer = () => showOptions(options);
    lastThreadBookmark = threadEl.children.length;
    clearOptions();
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-option-btn' + (opt.style === 'secondary' ? ' secondary' : '') + (opt.fullRow ? ' chat-option-full-row' : '');
      btn.innerHTML = opt.label;
      btn.addEventListener('click', () => {
        clearOptions();
        if (opt.echo !== false) {
          appendUserBubble(opt.echoLabel || opt.label);
        }
        opt.onSelect();
      });
      optionsBarEl.appendChild(btn);
    });
  }

  // Campo de dato estructurado y validado dentro de una burbuja (nombre, teléfono, código, etc.)
  // Esto NO es un chat de texto libre: cada uso está atado a una pregunta puntual y validada,
  // igual que en el IC-APP original.
  // config: { label, placeholder, confirmLabel, backLabel, emptyError, onConfirm(value), onBack() }
  function showTextInput(config) {
    if (!isNavigatingBack && lastOptionsRenderer) navigationStack.push({ renderer: lastOptionsRenderer, threadLength: lastThreadBookmark });
    lastOptionsRenderer = () => showTextInput(config);
    lastThreadBookmark = threadEl.children.length;
    clearOptions();

    const wrap = document.createElement('div');
    wrap.className = 'chat-input-wrap chat-option-full-row';

    const label = document.createElement('label');
    label.className = 'chat-input-label';
    label.textContent = config.label || '';

    const input = document.createElement('input');
    input.type = config.inputType || 'text';
    input.className = 'chat-text-input';
    input.placeholder = config.placeholder || '';
    input.autocomplete = 'off';

    wrap.appendChild(label);
    wrap.appendChild(input);
    optionsBarEl.appendChild(wrap);

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'chat-option-btn chat-option-full-row';
    confirmBtn.textContent = config.confirmLabel || 'OK';
    confirmBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val) {
        botSay(config.emptyError, { extraClass: 'error-note', delayMs: 150 });
        return;
      }
      if (config.validator && !config.validator(val)) {
        botSay(config.invalidError || config.emptyError, { extraClass: 'error-note', delayMs: 150 });
        return;
      }
      clearOptions();
      appendUserBubble(val);
      config.onConfirm(val);
    });
    optionsBarEl.appendChild(confirmBtn);

    if (config.backLabel && config.onBack) {
      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'chat-option-btn back-link';
      backBtn.textContent = config.backLabel;
      backBtn.addEventListener('click', () => { clearOptions(); config.onBack(); });
      optionsBarEl.appendChild(backBtn);
    }
    if (config.skipLabel && config.onSkip) {
      const skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.className = 'chat-option-btn secondary chat-option-full-row';
      skipBtn.textContent = config.skipLabel;
      skipBtn.addEventListener('click', () => { clearOptions(); config.onSkip(); });
      optionsBarEl.appendChild(skipBtn);
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); confirmBtn.click(); }
    });
    input.focus();
  }

  // Campo de teléfono: select de país (opción predefinida) + número.
  // config: { label, confirmLabel, emptyError, skipLabel, onSkip, onConfirm(countryCode, number) }
  function showPhoneInput(config) {
    if (!isNavigatingBack && lastOptionsRenderer) navigationStack.push({ renderer: lastOptionsRenderer, threadLength: lastThreadBookmark });
    lastOptionsRenderer = () => showPhoneInput(config);
    lastThreadBookmark = threadEl.children.length;
    clearOptions();

    const wrap = document.createElement('div');
    wrap.className = 'chat-input-wrap chat-option-full-row';

    const label = document.createElement('label');
    label.className = 'chat-input-label';
    label.textContent = config.label || '';

    const row = document.createElement('div');
    row.className = 'phone-input-row';

    const select = document.createElement('select');
    select.className = 'chat-select-input';
    countryCodes.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = (appState.lang === 'sp' ? c.sp : c.en) + ' (' + c.code + ')';
      select.appendChild(opt);
    });

    const input = document.createElement('input');
    input.type = 'tel';
    input.className = 'chat-text-input';
    input.placeholder = t('phoneNumberPlaceholder');
    input.autocomplete = 'off';

    row.appendChild(select);
    row.appendChild(input);
    wrap.appendChild(label);
    wrap.appendChild(row);
    optionsBarEl.appendChild(wrap);

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'chat-option-btn chat-option-full-row';
    confirmBtn.textContent = config.confirmLabel || 'OK';
    confirmBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val) {
        botSay(config.emptyError, { extraClass: 'error-note', delayMs: 150 });
        return;
      }
      if (config.validator && !config.validator(val)) {
        botSay(config.invalidError || config.emptyError, { extraClass: 'error-note', delayMs: 150 });
        return;
      }
      clearOptions();
      appendUserBubble(select.value + ' ' + val);
      config.onConfirm(select.value, val);
    });
    optionsBarEl.appendChild(confirmBtn);

    if (config.skipLabel && config.onSkip) {
      const skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.className = 'chat-option-btn secondary chat-option-full-row';
      skipBtn.textContent = config.skipLabel;
      skipBtn.addEventListener('click', () => { clearOptions(); config.onSkip(); });
      optionsBarEl.appendChild(skipBtn);
    }

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); confirmBtn.click(); } });
  }

  // Selección múltiple por botones tipo "chip" (toggle) + botón de confirmar.
  // items: [{id, label, icon}]  config: { confirmLabel, emptyError, onConfirm(selectedIds) }
  function showMultiSelect(items, config) {
    if (!isNavigatingBack && lastOptionsRenderer) navigationStack.push({ renderer: lastOptionsRenderer, threadLength: lastThreadBookmark });
    lastOptionsRenderer = () => showMultiSelect(items, config);
    lastThreadBookmark = threadEl.children.length;
    clearOptions();
    const selected = new Set();

    const wrap = document.createElement('div');
    wrap.className = 'chat-option-full-row chat-toggle-grid';

    items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-option-btn secondary chat-toggle-btn';
      btn.innerHTML = (item.icon ? '<img src="assets/' + item.icon + '" class="chat-toggle-icon" alt="">' : '') + '<span>' + item.label + '</span>';
      btn.addEventListener('click', () => {
        if (selected.has(item.id)) { selected.delete(item.id); btn.classList.remove('toggled-on'); }
        else { selected.add(item.id); btn.classList.add('toggled-on'); }
      });
      wrap.appendChild(btn);
    });
    optionsBarEl.appendChild(wrap);

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'chat-option-btn chat-option-full-row';
    confirmBtn.textContent = config.confirmLabel;
    confirmBtn.addEventListener('click', () => {
      if (selected.size === 0) {
        botSay(config.emptyError, { extraClass: 'error-note', delayMs: 150 });
        return;
      }
      const chosen = items.filter((i) => selected.has(i.id));
      clearOptions();
      appendUserBubble(chosen.map((i) => i.label).join(' · '));
      config.onConfirm(chosen.map((i) => i.id));
    });
    optionsBarEl.appendChild(confirmBtn);
  }

  function updateHeaderTexts() {
    headerTitleEl.textContent = t('chatHeaderTitle') || 'IC-Chat';
    headerSubtitleEl.textContent = t('chatHeaderSubtitle') || '';
  }

  // ---------- Flujo: Bloque 1 ----------
  function startChat() {
    threadEl.innerHTML = '';
    clearOptions();
    appState.lang = null;
    appState.userType = null;
    appState.collectedData = {};
    navigationStack = [];
    lastOptionsRenderer = null;
    lastThreadBookmark = 0;

    botSay('👋 Welcome / Bienvenido<br><span style="font-weight:normal;">Choose your language to continue / Elija su idioma para continuar</span>', { delayMs: 300 })
      .then(() => {
        showOptions([
          {
            label: '🇬🇧 English',
            style: 'primary',
            fullRow: false,
            onSelect: () => selectLanguage('en')
          },
          {
            label: '🇪🇸 Español',
            style: 'primary',
            fullRow: false,
            onSelect: () => selectLanguage('sp')
          }
        ].map(o => ({ ...o })));
        // Aplica la fila lado-a-lado de banderas
        optionsBarEl.classList.add('lang-choice-row');
      });
  }

  function selectLanguage(lang) {
    appState.lang = lang;
    optionsBarEl.classList.remove('lang-choice-row');
    updateHeaderTexts();

    botSay(t('welcomeMessage'))
      .then(() => showUserTypeStep());
  }

  // ---------- Flujo: Bloque 2 — Selección Usuario / Proveedor ----------
  function showUserTypeStep() {
    botSay(t('userTypeQuestion')).then(() => {
      showOptions([
        { label: t('userTypeUserBtn'), style: 'primary', onSelect: () => selectUserType('solutionUser') },
        { label: t('userTypeSupplierBtn'), style: 'primary', onSelect: () => selectUserType('solutionSupplier') },
        { label: t('userTypeInfoBtn'), style: 'secondary', echo: false, onSelect: showUserTypeInfo }
      ]);
    });
  }

  function showUserTypeInfo() {
    botSay(t('userTypeUserInfo'))
      .then(() => botSay(t('userTypeSupplierInfo'), { delayMs: 350 }))
      .then(() => {
        showOptions([
          { label: t('userTypeInfoBackButton'), style: 'secondary', echo: false, onSelect: showUserTypeStep }
        ]);
      });
  }

  function selectUserType(userType) {
    appState.userType = userType;
    if (userType === 'solutionUser') {
      showRoleStep();
    } else {
      showSupplierTypeStep();
    }
  }

  // Campo reutilizable de "explicar otro" — se usa tanto para el tipo de Proveedor como
  // para "¿Cómo se enteró?" cuando el visitante elige "Otro".
  function collectOtherExplanation(onDone) {
    botSay(t('otherExplainQuestion')).then(() => {
      showTextInput({
        label: t('otherExplainInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('otherExplainEmptyError'),
        onConfirm: onDone
      });
    });
  }

  function showSupplierTypeStep() {
    botSay(t('supplierTypeQuestion')).then(() => {
      showOptions([
        { label: t('supplierTypeAsianMfr'), style: 'secondary', onSelect: () => { appState.collectedData.supplierSubType = t('supplierTypeAsianMfr'); showBusinessNameStep(); } },
        { label: t('supplierTypeLocalMfr'), style: 'secondary', onSelect: () => { appState.collectedData.supplierSubType = t('supplierTypeLocalMfr'); showBusinessNameStep(); } },
        { label: t('supplierTypeLocalDist'), style: 'secondary', onSelect: () => { appState.collectedData.supplierSubType = t('supplierTypeLocalDist'); showBusinessNameStep(); } },
        { label: t('supplierTypeLocalInstaller'), style: 'secondary', onSelect: () => { appState.collectedData.supplierSubType = t('supplierTypeLocalInstaller'); showBusinessNameStep(); } },
        {
          label: t('supplierTypeOther'), style: 'secondary',
          onSelect: () => collectOtherExplanation((detail) => {
            appState.collectedData.supplierSubType = t('supplierTypeOther') + ' — ' + detail;
            showBusinessNameStep();
          })
        }
      ]);
    });
  }

  // ==========================================================================
  // BLOQUE 3 — Registro completo de Solution User, campo por campo
  // ==========================================================================

  function showRoleStep() {
    botSay(t('roleQuestion')).then(() => {
      showOptions([
        { label: t('roleInstaller'), style: 'primary', onSelect: () => { appState.collectedData.role = 'installer'; showNameStep(); } },
        { label: t('roleEndUser'), style: 'primary', onSelect: () => { appState.collectedData.role = 'endUser'; showNameStep(); } },
        { label: t('roleDesigner'), style: 'primary', onSelect: () => { appState.collectedData.role = 'designer'; showNameStep(); } },
        { label: t('roleDistributor'), style: 'primary', onSelect: () => { appState.collectedData.role = 'distributor'; showNameStep(); } },
        { label: t('roleInfoButton'), style: 'secondary', echo: false, onSelect: showRoleInfo }
      ]);
    });
  }

  function showRoleInfo() {
    botSay(
      '• ' + t('roleInfoInstaller') + '<br><br>' +
      '• ' + t('roleInfoEndUser') + '<br><br>' +
      '• ' + t('roleInfoDesigner') + '<br><br>' +
      '• ' + t('roleInfoDistributor')
    ).then(() => {
      showOptions([{ label: t('backToQuestionButton'), style: 'secondary', echo: false, onSelect: showRoleStep }]);
    });
  }

  function showNameStep() {
    botSay(t('nameQuestion')).then(() => {
      showTextInput({
        label: t('nameInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('nameEmptyError'),
        onConfirm: (value) => { appState.collectedData.name = value; showPhoneStep(); }
      });
    });
  }

  function showPhoneStep() {
    botSay(t('phoneQuestion')).then(() => {
      showPhoneInput({
        label: t('phoneCountryLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('phoneEmptyError'),
        validator: isValidPhone,
        invalidError: t('phoneInvalidError'),
        onConfirm: (countryCode, number) => {
          appState.collectedData.phoneCountryCode = countryCode;
          appState.collectedData.phoneNumber = number;
          showEmailStep();
        }
      });
    });
  }

  function showEmailStep() {
    botSay(t('emailQuestion')).then(() => {
      showTextInput({
        inputType: 'email',
        label: t('emailInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('emailEmptyError'),
        validator: isValidEmail,
        invalidError: t('emailEmptyError'),
        onConfirm: (value) => { appState.collectedData.email = value; showAddressStep(); }
      });
    });
  }

  function showAddressStep() {
    botSay(t('addressQuestion')).then(() => {
      showTextInput({
        label: t('addressInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('addressEmptyError'),
        onConfirm: (value) => { appState.collectedData.address = value; showPostalCodeStep(); }
      });
    });
  }

  function showPostalCodeStep() {
    botSay(t('postalCodeQuestion')).then(() => {
      showTextInput({
        label: t('postalCodeInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('postalCodeEmptyError'),
        onConfirm: (value) => { appState.collectedData.postalCode = value; showTitleStep(); }
      });
    });
  }

  function showTitleStep() {
    botSay(t('titleQuestion')).then(() => {
      showTextInput({
        label: t('titleInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('titleEmptyError'),
        onConfirm: (value) => { appState.collectedData.title = value; showHowHearStep(showSolutionsStep); }
      });
    });
  }

  // onDone: función a ejecutar una vez terminado (Usuario -> showSolutionsStep, Proveedor -> showSupplierSolutionsStep)
  function showHowHearStep(onDone) {
    botSay(t('howHearQuestion')).then(() => {
      showOptions([
        { label: t('refBlogs'), style: 'secondary', onSelect: () => { appState.collectedData.referralSource = 'blogs'; onDone(); } },
        { label: t('refLinkedIn'), style: 'secondary', onSelect: () => { appState.collectedData.referralSource = 'linkedin'; onDone(); } },
        { label: t('refWeb'), style: 'secondary', onSelect: () => { appState.collectedData.referralSource = 'web'; onDone(); } },
        { label: t('refReferredUser'), style: 'secondary', onSelect: () => { appState.collectedData.referralSource = 'referral'; showReferrerNameStep(onDone); } },
        { label: t('refSocial'), style: 'secondary', onSelect: () => { appState.collectedData.referralSource = 'social'; onDone(); } },
        {
          label: t('refOther'), style: 'secondary',
          onSelect: () => collectOtherExplanation((detail) => {
            appState.collectedData.referralSource = t('refOther') + ' — ' + detail;
            onDone();
          })
        }
      ]);
    });
  }

  function showReferrerNameStep(onDone) {
    botSay(t('referrerNameQuestion')).then(() => {
      showTextInput({
        label: t('referrerNameInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('nameEmptyError'),
        skipLabel: t('skipButton'),
        onSkip: () => showReferrerEmailStep(onDone),
        onConfirm: (value) => { appState.collectedData.referrerName = value; showReferrerEmailStep(onDone); }
      });
    });
  }

  function showReferrerEmailStep(onDone) {
    botSay(t('referrerEmailQuestion')).then(() => {
      showTextInput({
        inputType: 'email',
        label: t('referrerEmailInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('emailEmptyError'),
        validator: isValidEmail,
        invalidError: t('emailEmptyError'),
        skipLabel: t('skipButton'),
        onSkip: () => showReferrerPhoneStep(onDone),
        onConfirm: (value) => { appState.collectedData.referrerEmail = value; showReferrerPhoneStep(onDone); }
      });
    });
  }

  function showReferrerPhoneStep(onDone) {
    botSay(t('referrerPhoneQuestion')).then(() => {
      showPhoneInput({
        label: t('phoneCountryLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('phoneEmptyError'),
        validator: isValidPhone,
        invalidError: t('phoneInvalidError'),
        skipLabel: t('skipButton'),
        onSkip: onDone,
        onConfirm: (countryCode, number) => {
          appState.collectedData.referrerPhoneCountryCode = countryCode;
          appState.collectedData.referrerPhoneNumber = number;
          onDone();
        }
      });
    });
  }

  // Pregunta de soluciones + sub-soluciones + requerimiento especial, genérica para Usuario y Proveedor.
  // questionKey: clave i18n de la pregunta ("solutionsQuestion" o "solutionsProvidedQuestion")
  // context: 'user' o 'supplier' — ajusta la etiqueta del ítem "otro" y la pregunta de detalle
  // afterFn: función a ejecutar cuando todo quedó capturado
  function collectSolutions(questionKey, context, afterFn) {
    const specialItemLabelKey = (context === 'user') ? 'specialItemLabelUser' : 'specialItemLabelSupplier';
    botSay(t(questionKey)).then(() => {
      const items = solutionsData.map((s) => ({
        id: s.id,
        label: (s.id === 'special-requirement') ? t(specialItemLabelKey) : (appState.lang === 'sp' ? s.sp : s.en),
        icon: s.icon
      }));
      showMultiSelect(items, {
        confirmLabel: t('solutionsConfirmButton'),
        emptyError: t('solutionsEmptyError'),
        onConfirm: (selectedIds) => {
          appState.collectedData.solutions = selectedIds;
          appState.collectedData.subSolutions = {};
          const withSubs = solutionsData.filter((s) => selectedIds.includes(s.id) && s.sub);
          processSubSolutionsQueue(withSubs, 0, () => {
            if (selectedIds.includes('special-requirement')) {
              collectSpecialRequirement(context, afterFn);
            } else {
              afterFn();
            }
          });
        }
      });
    });
  }

  function processSubSolutionsQueue(queue, index, onDone) {
    if (index >= queue.length) { onDone(); return; }
    const parent = queue[index];
    const parentLabel = (appState.lang === 'sp' ? parent.sp : parent.en);
    botSay(t('subSolutionsQuestionPrefix') + '<b>' + parentLabel + '</b>' + t('subSolutionsQuestionSuffix')).then(() => {
      const items = parent.sub.map((s) => ({ id: s.id, label: (appState.lang === 'sp' ? s.sp : s.en) }));
      showMultiSelect(items, {
        confirmLabel: t('solutionsConfirmButton'),
        emptyError: t('solutionsEmptyError'),
        onConfirm: (selectedSubIds) => {
          appState.collectedData.subSolutions[parent.id] = selectedSubIds;
          processSubSolutionsQueue(queue, index + 1, onDone);
        }
      });
    });
  }

  function collectSpecialRequirement(context, afterFn) {
    const questionKey = (context === 'user') ? 'specialRequirementsQuestionUser' : 'specialRequirementsQuestionSupplier';
    botSay(t(questionKey)).then(() => {
      showTextInput({
        label: t('specialRequirementsInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('specialRequirementsEmptyError'),
        onConfirm: (value) => { appState.collectedData.specialRequirements = value; afterFn(); }
      });
    });
  }

  // ---------- Cierre del flujo de Usuario ----------
  function showSolutionsStep() {
    collectSolutions('solutionsQuestion', 'user', showTimeframeStep);
  }

  function showTimeframeStep() {
    botSay(t('timeframeQuestion')).then(() => {
      showOptions([
        { label: t('tfNow'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = 'now'; showInAHurryStep(); } },
        { label: t('tf1to3Months'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = '1-3months'; showInAHurryStep(); } },
        { label: t('tf4to6Months'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = '4-6months'; showInAHurryStep(); } },
        { label: t('tfWithinYear'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = 'withinYear'; showInAHurryStep(); } },
        { label: t('tfReviewing'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = 'reviewing'; showInAHurryStep(); } }
      ]);
    });
  }

  function showInAHurryStep() {
    botSay(t('inAHurryQuestion')).then(() => {
      showOptions([
        { label: t('yesButton'), style: 'primary', onSelect: () => { appState.collectedData.inAHurry = 'yes'; showBlock3Summary(); } },
        { label: t('noButton'), style: 'secondary', onSelect: () => { appState.collectedData.inAHurry = 'no'; showBlock3Summary(); } },
        { label: t('maybeButton'), style: 'secondary', onSelect: () => { appState.collectedData.inAHurry = 'maybe'; showBlock3Summary(); } }
      ]);
    });
  }

  function getSolutionLabel(id) {
    if (id === 'special-requirement') {
      return t(appState.userType === 'solutionUser' ? 'specialItemLabelUser' : 'specialItemLabelSupplier');
    }
    const s = solutionsData.find((x) => x.id === id);
    return s ? (appState.lang === 'sp' ? s.sp : s.en) : id;
  }

  function getSubSolutionLabel(parentId, subId) {
    const parent = solutionsData.find((x) => x.id === parentId);
    if (!parent || !parent.sub) return subId;
    const sub = parent.sub.find((x) => x.id === subId);
    return sub ? (appState.lang === 'sp' ? sub.sp : sub.en) : subId;
  }

  function showBlock3Summary() {
    console.log('IC-Chat — registro de Usuario capturado:', appState.collectedData);
    botSay(t('registrationCompleteTransition'), { delayMs: 400 }).then(showRatingStep);
  }

  // ==========================================================================
  // BLOQUE 6 — Envío real por EmailJS (misma cuenta y plantilla del IC-APP)
  // ==========================================================================

  const referralLabelKeys = { blogs: 'refBlogs', linkedin: 'refLinkedIn', web: 'refWeb', referral: 'refReferredUser', social: 'refSocial', other: 'refOther' };
  const timeframeLabelKeys = { now: 'tfNow', stock: 'tfStock', '1-3months': 'tf1to3Months', '4-6months': 'tf4to6Months', withinYear: 'tfWithinYear', reviewing: 'tfReviewing' };
  const hurryLabelKeys = { yes: 'yesButton', no: 'noButton', maybe: 'maybeButton' };
  const roleLabelKeys = { installer: 'roleInstaller', endUser: 'roleEndUser', designer: 'roleDesigner', distributor: 'roleDistributor' };

  function labelFor(map, value) {
    if (!value) return 'N/A';
    const key = map[value];
    const label = key ? t(key) : null;
    return label || value;
  }

  function buildSolutionsListText(d) {
    if (!d.solutions || d.solutions.length === 0) return 'N/A';
    return d.solutions.map((id) => {
      let line = '- ' + getSolutionLabel(id);
      if (d.subSolutions && d.subSolutions[id] && d.subSolutions[id].length) {
        line += ' (' + d.subSolutions[id].map((subId) => getSubSolutionLabel(id, subId)).join(', ') + ')';
      }
      return line;
    }).join('\n');
  }

  function buildTemplateParams(isIncomplete) {
    const d = appState.collectedData;
    const isSupplier = (appState.userType === 'solutionSupplier');
    const fullPhone = ((d.phoneCountryCode || '') + ' ' + (d.phoneNumber || '')).trim();
    const fullReferrerPhone = ((d.referrerPhoneCountryCode || '') + ' ' + (d.referrerPhoneNumber || '')).trim();
    return {
      source: 'IC-Chat' + (isIncomplete ? ' — INCOMPLETE / left mid-conversation' : ''),
      registration_type: isSupplier ? 'Solutions Provider' : 'Solutions User',
      user_sub_type: isSupplier ? 'N/A' : labelFor(roleLabelKeys, d.role),
      supplier_sub_type: isSupplier ? (d.supplierSubType || 'N/A') : 'N/A',
      customer_name: d.name || 'N/A',
      customer_phone: fullPhone || 'N/A',
      customer_email: d.email || 'N/A',
      customer_address: d.address || 'N/A',
      customer_postal_code: d.postalCode || 'N/A',
      customer_title: d.title || 'N/A',
      website: d.website || 'N/A',
      safety_standards: d.safetyStandards || 'N/A',
      referrer_name: d.referrerName || 'N/A',
      referrer_email: d.referrerEmail || 'N/A',
      referrer_phone: fullReferrerPhone || 'N/A',
      referral_source: labelFor(referralLabelKeys, d.referralSource),
      timeframe: labelFor(timeframeLabelKeys, d.timeframe),
      in_a_hurry: isSupplier ? 'N/A' : labelFor(hurryLabelKeys, d.inAHurry),
      solutions_list: buildSolutionsListText(d),
      special_requirements: d.specialRequirements || 'N/A',
      rating: (d.rating !== undefined && d.rating !== null) ? (d.rating + '/5') : 'N/A',
      comment: d.comment || 'N/A'
    };
  }

  function sendIcChatEmail(isIncomplete) {
    if (typeof emailjs === 'undefined') {
      console.warn('EmailJS SDK no disponible; no se envió la notificación.');
      return Promise.reject(new Error('EmailJS SDK not loaded'));
    }
    const params = buildTemplateParams(isIncomplete);
    console.log('IC-Chat — enviando a EmailJS:', params);
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
  }

  // Enlace mailto: de respaldo, por si EmailJS falla (conexión, cuota, etc.) — la solicitud no se pierde.
  function buildMailtoFallbackUrl() {
    const params = buildTemplateParams(false);
    const subject = 'IC-Chat — ' + params.registration_type + ' — ' + params.customer_name;
    const bodyLines = Object.keys(params).map((k) => k + ': ' + params[k]);
    const body = bodyLines.join('\n');
    return 'mailto:jventura@jvenergyconsultant.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }



  function showRatingStep() {
    botSay(t('ratingQuestion')).then(() => {
      showOptions([5, 4, 3, 2, 1, 0].map((n) => ({
        label: '<b>' + t('rating' + n + 'Formal') + '</b><br><span class="rating-subtext">' + t('rating' + n + 'Playful') + '</span>',
        echoLabel: t('rating' + n + 'Formal'),
        style: 'secondary',
        fullRow: true,
        onSelect: () => { appState.collectedData.rating = n; showCommentStep(); }
      })));
    });
  }

  function showCommentStep() {
    botSay(t('commentQuestion')).then(() => {
      showTextInput({
        label: t('commentInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('commentEmptyError'),
        skipLabel: t('commentSkipLabel'),
        onSkip: showFinalClosing,
        onConfirm: (value) => { appState.collectedData.comment = value; showFinalClosing(); }
      });
    });
  }

  function showFinalClosing() {
    botSay(t('sendingNote'), { extraClass: 'system-note', delayMs: 300 })
      .then(() => sendIcChatEmail(false))
      .then(() => botSay(t('finalGoodbyeMessage'), { delayMs: 500 }))
      .then(() => {
        showOptions([{ label: t('restartButton'), style: 'secondary', echo: false, onSelect: startChat }]);
      })
      .catch((err) => {
        console.error('IC-Chat — error enviando por EmailJS:', err);
        botSay(t('sendErrorNote'), { extraClass: 'error-note', delayMs: 400 }).then(() => {
          showOptions([
            { label: t('sendErrorFallbackButton'), style: 'primary', echo: false, onSelect: () => { window.location.href = buildMailtoFallbackUrl(); } },
            { label: t('restartButton'), style: 'secondary', echo: false, onSelect: startChat }
          ]);
        });
      });
  }

  function showBusinessNameStep() {
    botSay(t('businessNameQuestion')).then(() => {
      showTextInput({
        label: t('businessNameInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('businessNameEmptyError'),
        onConfirm: (value) => { appState.collectedData.name = value; showSupplierPhoneStep(); }
      });
    });
  }

  function showSupplierPhoneStep() {
    botSay(t('phoneQuestion')).then(() => {
      showPhoneInput({
        label: t('phoneCountryLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('phoneEmptyError'),
        validator: isValidPhone,
        invalidError: t('phoneInvalidError'),
        onConfirm: (countryCode, number) => {
          appState.collectedData.phoneCountryCode = countryCode;
          appState.collectedData.phoneNumber = number;
          showSupplierEmailStep();
        }
      });
    });
  }

  function showSupplierEmailStep() {
    botSay(t('emailQuestion')).then(() => {
      showTextInput({
        inputType: 'email',
        label: t('emailInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('emailEmptyError'),
        validator: isValidEmail,
        invalidError: t('emailEmptyError'),
        onConfirm: (value) => { appState.collectedData.email = value; showSupplierAddressStep(); }
      });
    });
  }

  function showSupplierAddressStep() {
    botSay(t('addressQuestion')).then(() => {
      showTextInput({
        label: t('addressInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('addressEmptyError'),
        onConfirm: (value) => { appState.collectedData.address = value; showSupplierPostalCodeStep(); }
      });
    });
  }

  function showSupplierPostalCodeStep() {
    botSay(t('postalCodeQuestion')).then(() => {
      showTextInput({
        label: t('postalCodeInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('postalCodeEmptyError'),
        onConfirm: (value) => { appState.collectedData.postalCode = value; showWebsiteStep(); }
      });
    });
  }

  function showWebsiteStep() {
    botSay(t('websiteQuestion')).then(() => {
      showTextInput({
        label: t('websiteInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('websiteEmptyError'),
        skipLabel: t('skipButton'),
        onSkip: showSupplierTitleStep,
        onConfirm: (value) => { appState.collectedData.website = value; showSupplierTitleStep(); }
      });
    });
  }

  function showSupplierTitleStep() {
    botSay(t('titleQuestion')).then(() => {
      showTextInput({
        label: t('titleInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('titleEmptyError'),
        onConfirm: (value) => { appState.collectedData.title = value; showHowHearStep(showSupplierSolutionsStep); }
      });
    });
  }

  function showSupplierSolutionsStep() {
    collectSolutions('solutionsProvidedQuestion', 'supplier', showDeliveryTimeframeStep);
  }

  function showDeliveryTimeframeStep() {
    botSay(t('deliveryTimeframeQuestion')).then(() => {
      showOptions([
        { label: t('tfStock'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = 'stock'; showSafetyStandardsStep(); } },
        { label: t('tf1to3Months'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = '1-3months'; showSafetyStandardsStep(); } },
        { label: t('tf4to6Months'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = '4-6months'; showSafetyStandardsStep(); } },
        { label: t('tfWithinYear'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = 'withinYear'; showSafetyStandardsStep(); } },
        { label: t('tfReviewing'), style: 'secondary', onSelect: () => { appState.collectedData.timeframe = 'reviewing'; showSafetyStandardsStep(); } }
      ]);
    });
  }

  function showSafetyStandardsStep() {
    botSay(t('safetyStandardsQuestion')).then(() => {
      showTextInput({
        label: t('safetyStandardsInputLabel'),
        confirmLabel: t('continueButton') || 'OK',
        emptyError: t('safetyStandardsEmptyError'),
        skipLabel: t('skipButton'),
        onSkip: showBlock4Summary,
        onConfirm: (value) => { appState.collectedData.safetyStandards = value; showBlock4Summary(); }
      });
    });
  }

  function showBlock4Summary() {
    console.log('IC-Chat — registro de Proveedor capturado:', appState.collectedData);
    botSay(t('registrationCompleteTransition'), { delayMs: 400 }).then(showRatingStep);
  }

  // ---------- Salida / cierre del chat (a solicitud del visitante) ----------
  // Orden acordado: 1) confirmar la intención de salir, 2) si confirma, se deja constancia
  // de lo recolectado hasta ese punto como "consulta incompleta" (el envío real por EmailJS
  // se conecta en el Bloque 6, junto con el resto de las notificaciones).
  function requestExitConfirm() {
    if (!appState.lang) {
      requestExitConfirmPreLanguage();
      return;
    }
    const resumeRenderer = lastOptionsRenderer;
    botSay(t('exitConfirmQuestion'), { delayMs: 150 }).then(() => {
      showOptions([
        { label: t('exitConfirmYes'), style: 'primary', onSelect: performExit },
        {
          label: t('exitConfirmNo'), style: 'secondary', echo: false,
          onSelect: () => { if (resumeRenderer) resumeRenderer(); }
        }
      ]);
    });
  }

  // Caso especial: el visitante intenta cerrar antes de elegir idioma — el roce más común
  // ("otro chat que no lleva a nada"). Aquí no usamos t() porque aún no hay idioma definido;
  // el mensaje es bilingüe y busca dar una oportunidad real antes de dejarlo ir.
  function requestExitConfirmPreLanguage() {
    const resumeRenderer = lastOptionsRenderer;
    const msg = "We understand you may not want to continue right now — but IC-Chat is a different experience from what you typically find on other websites. Please give us the chance to show you. Shall we continue?" +
      "<br><br>" +
      "Entendemos que quizás no desee continuar en este momento — pero el IC-Chat es una experiencia distinta a la que normalmente encuentra en otros sitios web. Por favor, denos la oportunidad de demostrárselo. ¿Continuamos?";
    botSay(msg, { delayMs: 150 }).then(() => {
      showOptions([
        { label: "✅ Yes, let's continue / Sí, continuemos", style: 'primary', echo: false, onSelect: () => { if (resumeRenderer) resumeRenderer(); } },
        { label: "No, thank you / No, gracias", style: 'secondary', echo: false, onSelect: performExitPreLanguage }
      ]);
    });
  }

  function performExitPreLanguage() {
    botSay(
      "Thank you for your time. Whenever you would like to continue, this window will be here for you." +
      "<br><br>" +
      "Gracias por su tiempo. Cuando desee continuar, esta ventana estará aquí para usted.",
      { delayMs: 300 }
    ).then(() => {
      showOptions([{ label: "🔄 Restart / Reiniciar", style: 'secondary', echo: false, onSelect: startChat }]);
    });
  }

  function performExit() {
    botSay(t('exitIncompleteNote'), { extraClass: 'system-note' })
      .then(() => sendIcChatEmail(true))
      .catch((err) => { console.error('IC-Chat — error enviando registro incompleto:', err); })
      .then(() => botSay(t('exitGoodbyeMessage'), { delayMs: 400 }))
      .then(() => {
        showOptions([
          { label: t('restartButton'), style: 'secondary', echo: false, onSelect: startChat }
        ]);
      });
  }

  function goBackOneStep() {
    if (navigationStack.length === 0) {
      botSay(t('nothingToGoBackNote') || "There is no previous question to go back to yet. / Aún no hay una pregunta anterior a la cual volver.", { extraClass: 'system-note', delayMs: 150 });
      return;
    }
    const entry = navigationStack.pop();
    // Borra del hilo todo lo que se agregó después de esa pregunta (incluida la respuesta a corregir),
    // así el visitante "escribe encima" en vez de ver la respuesta anterior apilada debajo.
    while (threadEl.children.length > entry.threadLength) {
      threadEl.removeChild(threadEl.lastElementChild);
    }
    lastThreadBookmark = entry.threadLength;
    isNavigatingBack = true;
    entry.renderer();
    isNavigatingBack = false;
  }

  document.getElementById('chat-back-btn').addEventListener('click', goBackOneStep);
  document.getElementById('chat-close-btn').addEventListener('click', requestExitConfirm);

  // ---------- Burbuja flotante: auto-expansión a los 10s, o al tocarla ----------
  const bubbleEl = document.getElementById('ic-chat-bubble');
  const widgetEl = document.getElementById('ic-chat-widget');
  let autoExpandTimer = null;

  function expandChat() {
    if (autoExpandTimer) { clearTimeout(autoExpandTimer); autoExpandTimer = null; }
    bubbleEl.classList.add('hidden');
    widgetEl.classList.remove('hidden');
  }

  function minimizeChat() {
    widgetEl.classList.add('hidden');
    bubbleEl.classList.remove('hidden');
    // No se reinicia el temporizador de 10s — minimizar es una elección del visitante, no se le vuelve a forzar.
  }

  bubbleEl.addEventListener('click', expandChat);
  document.getElementById('chat-minimize-btn').addEventListener('click', minimizeChat);

  autoExpandTimer = setTimeout(expandChat, 2000);

  // ---------- Arranque ----------
  startChat();

});
