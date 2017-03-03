// Everything in here is publicly accessible

module.exports = {
  benefitCategories: [
    {
      key: 'ridership',
      text: {
        en: {
          title: 'Ridership',
          description: 'Increase transit ridership'
        },
        es: {
          title: '',
          description: ''
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
          title: '',
          description: ''
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
          title: '',
          description: ''
        }
      }
    }
  ],
  costStyle: 'dollar',
  maxCost: 15,
  maxBenefitLevel: 4,
  text: {
    en: {
      siteTitle: 'San Francisco Municipal Railway Design Your Transit System',
      logoAlt: 'San Francisco Municipal Railway',
      introText: '<h2>How would you improve MUNI?</h2><p>BlinkTag wants your suggestions for improving the MUNI system.</p><p>This survey allows you to select potential improvements that you think will help improve SF MUNI.</p>',
      benefitCategoriesSectionTitle: 'Benefit Categories',
      howItWorksTitle: 'Here\'s how to Participate',
      howItWorksContent: '<ul><li>Scroll down to see the strategies that could improve transit in San Francisco.</li><li>You have 15 dollar signs ($) to spend. Mix and  match potential improvements to see how the costs and benefits change by clicking the check boxes below.</li><li>Spend your budget by selecting your preferred strategies.</li></ul>',
      translationContent: '<p>Haga <a href="/es">clic aquí</a> para completar la encuesta en español.</p>',
      dashboardTitle: 'Your Overall Benefits',
      totalCostTitle: 'Total Cost (Max $15)',
      costTitle: 'Cost',
      resetTitle: 'Reset',
      submitTitle: 'Submit',
      footerCopyright: '&copy; 2017 <a href="http://blinktag.com">BlinkTag Inc</a>',
      footerAbout: 'This was created by BlinkTag Inc as an example "Design Your Transit System" survey.',
      modalExceededTitle: 'Budget Exhausted',
      modalExceededContent: 'You\'ve exceeded your budget. Please change your selections to reallocate your funds before submitting. Click the screen to continue.',
      modalNoneTitle: 'No Budget Created',
      modalNoneContent: 'You haven\'t selected any strategies. Choose at least one strategy and then try submitting again.',
      modalLeftoverTitle: 'Budget Remaining',
      modalLeftoverContent: 'You still have some budget remaining! Is there anything else you would like to select?',
      modalSubmitTitle: 'Last Chance',
      modalSubmitContent: 'Answers cannot be changed after you submit them.  Are you sure you are ready to submit?',
      modalPostSubmitTitle: 'Thanks for your responses',
      modalPostSubmitContent: 'We\'ve run this survey system with over 20 transit agencies, from Ohio to the San Francisco Bay. <a href="mailto:info@blinktag.com">Get in touch</a> to set this up in your community.',
      modalPostSubmitButtons: '<a href="http://blinktag.com" class="btn btn-default">Read More</a> <a href="mailto:info@blinktag.com" class="btn btn-primary">Contact</a>',
      modalCloseButton: 'Close',
      modalGoBackButton: 'Go Back',
      modalContinueButton: 'Continue',
      modalSubmitButton: 'Submit'
    },
    es: {
      siteTitle: 'San Francisco Municipal Railway',
      logoAlt: 'San Francisco Municipal Railway',
      introText: '<h3></h3><p></p>',
      benefitCategoriesSectionTitle: 'Categorías de Beneficios',
      howItWorksTitle: 'Así es cómo Funciona:',
      howItWorksContent: '<ul><li></li></ul>',
      translationContent: '<p><a href="/">Click here</a> to take the survey in English.</p>',
      dashboardTitle: 'Sus Beneficios Generales',
      totalCostTitle: 'Costo Total ($15 Máx.)',
      costTitle: 'Costo',
      resetTitle: 'Reiniciar',
      submitTitle: 'Enviar',
      footerCopyright: '&copy; 2017 <a href="http://blinktag.com">BlinkTag Inc<a>',
      footerAbout: '',
      modalExceededTitle: 'Presupuesto agotado',
      modalExceededContent: 'Has superado tu presupuesto. Cambie sus selecciones para reasignar sus fondos antes de enviarlos. Haga clic en la pantalla para continuar.',
      modalNoneTitle: 'No hay presupuesto creado',
      modalNoneContent: 'No has seleccionado ninguna estrategia. Elija al menos una estrategia y luego intente volver a enviarla.',
      modalLeftoverTitle: 'Presupuesto restante',
      modalLeftoverContent: '¡Todavía tienes un presupuesto pendiente! ¿Hay algo más que le gustaría seleccionar?',
      modalSubmitTitle: 'Última oportunidad',
      modalSubmitContent: 'Las respuestas no se pueden cambiar después de enviarlas. ¿Está seguro de que está listo para enviar?',
      modalPostSubmitTitle: 'Thanks for your responses',
      modalPostSubmitContent: 'We\'ve run this survey system with over 20 transit agencies, from Ohio to the San Francisco Bay. <a href="info@blinktag.com">Get in touch</a> to set this up in your community.',
      modalPostSubmitButtons: '<a href="http://blinktag.com" class="btn btn-primary">Read More</a> <a href="mailto:info@blinktag.com" class="btn btn-default">Contact</a>',
      modalCloseButton: 'Cerrar',
      modalGoBackButton: 'Regresa',
      modalContinueButton: 'Continuar',
      modalSubmitButton: 'Enviar'
    }
  }
};
