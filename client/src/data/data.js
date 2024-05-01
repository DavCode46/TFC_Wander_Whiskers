


const locationData = [
    {
      label: "Especie",
      value: "specie",
      children: [
        {
          label: "Perro",
          value: "perro",
        },
        {
          label: "Gato",
          value: "gato",
        },
        {
          label: "Otro",
          value: "otro",
        },
      ],
    },
    {
      label: "España",
      value: "espana",
      children: [
        {
          label: "Álava",
          value: "Álava",
        },
        {
          label: "Albacete",
          value: "Albacete",
        },
        {
          label: "Alicante",
          value: "Alicante",
        },
        {
          label: "Almería",
          value: "alAlmeríameria",
        },
        {
          label: "Asturias",
          value: "Asturias",
        },
        {
          label: "Ávila",
          value: "Ávila",
        },
        {
          label: "Badajoz",
          value: "Badajoz",
        },
        {
          label: "Barcelona",
          value: "Barcelona",
        },
        {
          label: "Burgos",
          value: "Burgos",
        },
        {
          label: "Cáceres",
          value: "Cáceres",
        },
        {
          label: "Cádiz",
          value: "Cádiz",
        },
        {
          label: "Cantabria",
          value: "Cantabria",
        },
        {
          label: "Castellón",
          value: "Castellón",
        },
        {
          label: "Ciudad Real",
          value: "Ciudad Real",
        },
        {
          label: "Córdoba",
          value: "Córdoba",
        },
        {
          label: "Cuenca",
          value: "Cuenca",
        },
        {
          label: "Gerona",
          value: "Gerona",
        },
        {
          label: "Granada",
          value: "Granada",
        },
        {
          label: "Guadalajara",
          value: "Guadalajara",
        },
        {
          label: "Guipúzcoa",
          value: "Guipúzcoa",
        },
        {
          label: "Huelva",
          value: "Huelva",
        },
        {
          label: "Huesca",
          value: "Huesca",
        },
        {
          label: "Jaén",
          value: "Jaén",
        },
        {
          label: "La Coruña",
          value: "La Coruña",
        },
        {
          label: "La Rioja",
          value: "La Rioja",
        },
        {
          label: "Las Palmas",
          value: "Las Palmas",
        },
        {
          label: "León",
          value: "León",
        },
        {
          label: "Lérida",
          value: "Lérida",
        },
        {
          label: "Lugo",
          value: "Lugo",
        },
        {
          label: "Madrid",
          value: "Madrid",
        },
        {
          label: "Málaga",
          value: "Málaga",
        },
        {
          label: "Murcia",
          value: "Murcia",
        },
        {
          label: "Navarra",
          value: "Navarra",
        },
        {
          label: "Orense",
          value: "Orense",
        },
        {
          label: "Palencia",
          value: "Palencia",
        },
        {
          label: "Pontevedra",
          value: "Pontevedra",
        },
        {
          label: "Salamanca",
          value: "Salamanca",
        },
        {
          label: "Segovia",
          value: "Segovia",
        },
        {
          label: "Sevilla",
          value: "Sevilla",
        },
        {
          label: "Soria",
          value: "Soria",
        },
        {
          label: "Tarragona",
          value: "Tarragona",
        },
        {
          label: "Tenerife",
          value: "Tenerife",
        },
        {
          label: "Teruel",
          value: "Teruel",
        },
        {
          label: "Toledo",
          value: "Toledo",
        },
        {
          label: "Valencia",
          value: "Valencia",
        },
        {
          label: "Valladolid",
          value: "Valladolid",
        },
        {
          label: "Vizcaya",
          value: "Vizcaya",
        },
        {
          label: "Zamora",
          value: "Zamora",
        },
        {
          label: "Zaragoza",
          value: "Zaragoza",
        },
      ],
    },
  ];
  
  const accordionData = [
    {
      question: "¿Qué debo hacer si encuentro un animal perdido?",
      answer:
        "Si encuentras un animal perdido, primero asegúrate de que esté seguro y fuera de peligro. Intenta buscar al dueño del animal colocando carteles en la zona donde lo encontraste o utilizando las redes sociales para difundir la información. También puedes llevarlo a un refugio de animales local o contactar con una organización de rescate de animales para obtener ayuda.",
    },
    {
      question: "¿Qué debo hacer si veo a alguien abandonando un animal?",
      answer:
        "Si presencias a alguien abandonando un animal, intenta obtener la mayor cantidad de información posible, como la descripción del individuo y cualquier información sobre el vehículo utilizado. Luego, informa a las autoridades locales o a una organización de protección animal para que puedan investigar y tomar medidas apropiadas.",
    },
    {
      question: "¿Cómo puedo contribuir a la búsqueda de un animal perdido?",
      answer:
        "Puedes ayudar a buscar un animal perdido difundiendo la información en tus redes sociales y en la comunidad local. Comparte fotos y descripciones del animal en grupos de Facebook locales, coloca carteles en áreas transitadas y habla con tus vecinos para aumentar las posibilidades de encontrar al animal.",
    },
    {
      question: "¿Qué debo hacer si encuentro a un animal herido?",
      answer:
        "Si encuentras a un animal herido, evita manipularlo directamente si es peligroso o si no tienes experiencia en el manejo de animales salvajes. En su lugar, contacta con un refugio de animales o una organización de rescate para obtener asesoramiento sobre cómo proceder y para que puedan enviar a alguien capacitado para ayudar al animal.",
    },
    
  ];
  
  const contactOptions = [
    { value: "perdido", label: "Encontré un animal perdido" },
    { value: "adoptar", label: "Quiero adoptar un animal" },
    { value: "abandonado", label: "Quiero reportar un animal abandonado" },
    { value: "adopcion", label: "Tengo información sobre un animal en adopción" },
    { value: "otro", label: "Otro (por favor especificar en el mensaje)" },
  ];
  
  const PET_TYPE = ["Perro", "Gato", "Otro"];
  
  const CONDITION = ["Encontrado", "Perdido", "En adopción"]
  
  export {
    locationData,
    accordionData,
    contactOptions,
    PET_TYPE,
    CONDITION
  };
  