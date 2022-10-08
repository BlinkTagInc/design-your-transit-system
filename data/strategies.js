// Everything in here is publicly accessible

const strategies = [
  {
    key: 'weekdayService',
    text: {
      en: {
        title: 'Weekday Service',
        description:
          'Invest in existing routes so that buses come more frequently on weekdays.',
        category: 'Transit Service',
      },
      es: {
        title: 'Servicio de lunes a viernes',
        description:
          'Invertir en las rutas existentes para que los autobuses vienen con más frecuencia durante la semana.',
        category: 'Servicio de tránsito',
      },
    },
    benefits: {
      ridership: 3,
      accessToTransit: 1,
      passengerExperience: 3,
    },
    cost: 5,
  },
  {
    key: 'weekendService',
    text: {
      en: {
        title: 'Weekend service',
        description:
          'Invest in existing routes so that buses come more frequently on weekends.',
        category: 'Transit Service',
      },
      es: {
        title: 'Servicio de fin de semana',
        description:
          'Invertir en las rutas existentes para que los autobuses vienen con más frecuencia los fines de semana.',
        category: 'Servicio de tránsito',
      },
    },
    benefits: {
      ridership: 2,
      accessToTransit: 2,
      passengerExperience: 2,
    },
    cost: 2,
  },
  {
    key: 'localRoutes',
    text: {
      en: {
        title: 'Local Routes',
        description:
          'Increase the number of buses that make frequent stops during commute hours on weekdays.',
        category: 'Transit Service',
      },
      es: {
        title: 'Rutas locales',
        description:
          'Aumentar el número de autobuses que hacen paradas frecuentes durante las horas de conmutar entre semana.',
        category: 'Servicio de tránsito',
      },
    },
    benefits: {
      ridership: 2,
      accessToTransit: 2,
      passengerExperience: 2,
    },
    cost: 4,
  },
  {
    key: 'expressRoutes',
    text: {
      en: {
        title: 'Express Routes',
        description:
          'Increase the number of buses on express routes during commute hours on weekdays.',
        category: 'Transit Service',
      },
      es: {
        title: 'Rutas expresas',
        description:
          'Aumentar el número de autobuses en las rutas expresas durante las horas de viaje los fines de semana.',
        category: 'Servicio de tránsito',
      },
    },
    benefits: {
      ridership: 3,
      accessToTransit: 1,
      passengerExperience: 3,
    },
    cost: 4,
  },
  {
    key: 'technology',
    text: {
      en: {
        title: 'Technology Across All Routes',
        description:
          'Invest in capital improvements such as transit signal priority, which will make all buses faster.',
        category: 'Transit Service',
      },
      es: {
        title: 'Tecnología en todas las rutas',
        description:
          'Invertir en mejoras de capital como la prioridad de la señal de tránsito, lo que hará que todos los buses sean más rápidos.',
        category: 'Servicio de tránsito',
      },
    },
    benefits: {
      ridership: 2,
      accessToTransit: 1,
      passengerExperience: 3,
    },
    cost: 3,
  },
  {
    key: 'busShelters',
    text: {
      en: {
        title: 'More shelters at bus stops',
        description:
          'Expand bus shelters to more stops, improving the experience of waiting for a bus to arrive.',
        category: 'Customer Amenities',
      },
      es: {
        title: 'Más refugios en paradas de autobús',
        description:
          'Ampliar los refugios de autobuses a más paradas, mejorando la experiencia de esperar a que llegue un autobús.',
        category: 'Servicios al Cliente',
      },
    },
    benefits: {
      ridership: 1,
      accessToTransit: 2,
      passengerExperience: 3,
    },
    cost: 2,
  },
  {
    key: 'lighting',
    text: {
      en: {
        title: 'Improve lighting at bus stops',
        description:
          'Illuminated bus stops provide improved customer security and operational safety.',
        category: 'Customer Amenities',
      },
      es: {
        title: 'Mejorar la iluminación en las paradas de autobús',
        description:
          'Las paradas de autobús iluminadas proporcionan seguridad mejorada al cliente y seguridad operacional.',
        category: 'Servicios al Cliente',
      },
    },
    benefits: {
      ridership: 1,
      accessToTransit: 1,
      passengerExperience: 3,
    },
    cost: 2,
  },
  {
    key: 'onlineInfo',
    text: {
      en: {
        title: 'Improve online Information',
        description:
          'Redesign website to provide easy access to schedules and service alerts from a desktop or mobile device.',
        category: 'Customer Amenities',
      },
      es: {
        title: 'Mejorar la información en línea',
        description:
          'Rediseño del sitio web para facilitar el acceso a los horarios ya las alertas de servicio desde un dispositivo de escritorio o móvil.',
        category: 'Servicios al Cliente',
      },
    },

    benefits: {
      ridership: 1,
      accessToTransit: 1,
      passengerExperience: 2,
    },
    cost: 1,
  },
  {
    key: 'realtimeInfo',
    text: {
      en: {
        title: 'Provide real-time information at bus stops',
        description:
          'Real-time bus arrival information signs would allow riders to see when the next bus is coming.',
        category: 'Customer Amenities',
      },
      es: {
        title: 'Proporcionar información en tiempo real en paradas de autobús',
        description:
          'Señales de información de llegada de autobús en tiempo real permitirán a los pasajeros ver cuándo viene el próximo autobús.',
        category: 'Servicios al Cliente',
      },
    },
    benefits: {
      ridership: 1,
      accessToTransit: 2,
      passengerExperience: 3,
    },
    cost: 3,
  },
  {
    key: 'smartphoneApp',
    text: {
      en: {
        title: 'Create smartphone app',
        description:
          'Develop a user-friendly mobile app that provides schedules and arrival information.',
        category: 'Customer Amenities',
      },
      es: {
        title: 'Crear aplicación para smartphone',
        description:
          'Desarrollar una aplicación móvil fácil de usar que proporcione información sobre horarios e información de llegada.',
        category: 'Servicios al Cliente',
      },
    },
    benefits: {
      ridership: 1,
      accessToTransit: 1,
      passengerExperience: 3,
    },
    cost: 2,
  },
]

export default strategies
