// Everything in here is publicly accessible

export default {
  benefitCategories: [
    {
      key: 'ridership',
      text: {
        en: {
          title: 'Ridership',
          description: 'Increase transit ridership'
        },
        es: {
          title: 'Pasajero',
          description: 'Aumentar el número de viajeros en tránsito'
        }
      }
    },
    {
      key: 'accessToTransit',
      text: {
        en: {
          title: 'Access to Transit',
          description: 'Increase the number of people who can easily access transit'
        },
        es: {
          title: 'Acceso al tránsito',
          description: 'Aumentar el número de personas que pueden acceder fácilmente al tránsito'
        }
      }
    },
    {
      key: 'passengerExperience',
      text: {
        en: {
          title: 'Passenger Experience',
          description: 'Improve the experience of riding transit'
        },
        es: {
          title: 'Experiencia del pasajero',
          description: 'Mejorar la experiencia de viajar en tránsito'
        }
      }
    }
  ],
  saveResponses: false,
  costStyle: 'dollar',
  maxCost: 15,
  maxBenefitLevel: 4,
  text: {
    en: {
      siteTitle: 'Black Rock Transit: Design Your Transit System',
      headerTitle: 'Black Rock Transit: <span class="subtitle">Design Your Transit System</span>',
      logoAlt: 'Black Rock Transit',
      introText: '<h2>How would you improve Black Rock Transit?</h2><p>BlinkTag wants your suggestions for improving the Black Rock Transit system.</p><p>This survey allows you to select potential improvements that you think will help improve Black Rock Transit.</p>',
      benefitCategoriesSectionTitle: 'Benefit Categories',
      howItWorksTitle: 'Design your transit system',
      howItWorksContent: '<ul class="list-disc"><li>Scroll down to see the strategies that could improve transit in Black Rock City.</li><li>You have a total budget of 15 dollar signs ($). Mix and match potential improvements to see how the costs and benefits change by clicking the check boxes below.</li><li>Spend your budget by selecting your preferred strategies.</li></ul>',
      translationContent: 'Completar la encuesta en español',
      translationUrl: '/es',
      dashboardTitleBenefits: 'Your Overall Benefits',
      dashboardTitleCosts: 'Your Costs',
      totalCostTitle: 'Total Cost (Max $15)',
      costTitle: 'Cost',
      resetTitle: 'Reset',
      submitTitle: 'Submit',
      footerCopyright: '&copy; 2020 <a href="https://blinktag.com">BlinkTag Inc</a>',
      footerAbout: 'This was created by BlinkTag Inc as an example "Design Your Transit System" survey for <a href="http://playapillar.com">Black Rock Transit</a>.',
      modalExceededTitle: 'Budget Exhausted',
      modalExceededContent: 'You\'ve exceeded your budget. Please change your selections to reallocate your funds before submitting.',
      modalNoneTitle: 'No Budget Created',
      modalNoneContent: 'You haven\'t selected any strategies. Choose at least one strategy and then try submitting again.',
      modalLeftoverTitle: 'Budget Remaining',
      modalLeftoverContent: 'You still have some budget remaining! Is there anything else you would like to select?',
      modalSubmitTitle: 'Last Chance',
      modalSubmitContent: 'Answers cannot be changed after you submit them.  Are you sure you are ready to submit?',
      modalPostSubmitTitle: 'Get Started Today',
      modalPostSubmitContent: 'BlinkTag has run this survey system with over 40 transit agencies, from Ohio to the San Francisco Bay. <a href="mailto:info@blinktag.com">Get in touch</a> to create a similar survey in your community.',
      modalPostSubmitButtons: '<a href="https://blinktag.com" class="btn btn-secondary">Read More</a> <a href="mailto:info@blinktag.com" class="btn btn-primary">Contact</a>',
      modalCloseButton: 'Close',
      modalGoBackButton: 'Go Back',
      modalContinueButton: 'Continue',
      modalSubmitButton: 'Submit'
    },
    es: {
      siteTitle: 'Black Rock Transit: Diseñe su sistema de tránsito',
      headerTitle: 'Black Rock Transit: <span class="subtitle">Diseñe su sistema de tránsito</span>',
      logoAlt: 'Black Rock Transit',
      introText: '<h2>¿Cómo mejorarías Black Rock Transit?</h2><p>BlinkTag quiere sus sugerencias para mejorar el sistema Black Rock Transit.</p><p>Esta encuesta le permite seleccionar mejoras potenciales que usted piensa que ayudarán a mejorar el tránsito de Black Rock.</p>',
      benefitCategoriesSectionTitle: 'Categorías de Beneficios',
      howItWorksTitle: 'Así es cómo Funciona:',
      howItWorksContent: '<ul class="list-disc"><li>Desplácese hacia abajo para ver las estrategias que podrían mejorar el tránsito en Black Rock City.</li><li>Tienes 15 signos de dólar ($) para gastar. Combine y mejore posibles mejoras para ver cómo cambian los costos y beneficios al hacer clic en las casillas de verificación a continuación.</li><li>Pase su presupuesto seleccionando sus estrategias preferidas.</li></ul>',
      translationContent: 'Take the survey in English',
      translationUrl: '/',
      dashboardTitleBenefits: 'Sus Beneficios Generales',
      dashboardTitleCosts: 'Sus Costos',
      totalCostTitle: 'Costo Total ($15 Máx.)',
      costTitle: 'Costo',
      resetTitle: 'Reiniciar',
      submitTitle: 'Enviar',
      footerCopyright: '&copy; 2020 <a href="https://blinktag.com">BlinkTag Inc<a>',
      footerAbout: 'Esto fue creado por Blink Tag Inc como un ejemplo de "Diseño de su sistema de tránsito" encuesta de <a href="http://playapillar.com">Black Rock Transit</a>.',
      modalExceededTitle: 'Presupuesto agotado',
      modalExceededContent: 'Has superado tu presupuesto. Cambie sus selecciones para reasignar sus fondos antes de enviarlos.',
      modalNoneTitle: 'No hay presupuesto creado',
      modalNoneContent: 'No has seleccionado ninguna estrategia. Elija al menos una estrategia y luego intente volver a enviarla.',
      modalLeftoverTitle: 'Presupuesto restante',
      modalLeftoverContent: '¡Todavía tienes un presupuesto pendiente! ¿Hay algo más que le gustaría seleccionar?',
      modalSubmitTitle: 'Última oportunidad',
      modalSubmitContent: 'Las respuestas no se pueden cambiar después de enviarlas. ¿Está seguro de que está listo para enviar?',
      modalPostSubmitTitle: 'Get Started Today',
      modalPostSubmitContent: 'BlinkTag has run this survey system with over 40 transit agencies, from Ohio to the San Francisco Bay. <a href="info@blinktag.com">Get in touch</a> to create a similar survey in your community.',
      modalPostSubmitButtons: '<a href="https://blinktag.com" class="btn btn-secondary">Read More</a> <a href="mailto:info@blinktag.com" class="btn btn-primary">Contact</a>',
      modalCloseButton: 'Cerrar',
      modalGoBackButton: 'Regresa',
      modalContinueButton: 'Continuar',
      modalSubmitButton: 'Enviar'
    }
  }
}
