import helpers from './_helpers.js'

const paymentForm = {
  appendStripe: () => {
    return helpers.appendScript('https://js.stripe.com/v3/')
  },
  setup: async () => {
    await paymentForm.appendStripe()
    paymentForm.configureStripe()
  },
  configureStripe: () => {
    var form = document.getElementById('payment-form');
    var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Create an instance of the iban Element.
    var iban = elements.create('iban', {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          },
          ':-webkit-autofill': {
            color: '#32325d',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
          ':-webkit-autofill': {
            color: '#fa755a',
          },
        }
      },
      supportedCountries: ['SEPA'],
    });

    // Add an instance of the iban Element into the `iban-element` <div>.
    iban.mount('#iban-element');

    var ibanErrorMessage = document.getElementById('iban-error-message');
    var ibanBankName = document.getElementById('iban-bank-name');

    iban.on('change', function (event) {
      // Handle real-time validation errors from the iban Element.
      if (event.error) {
        ibanErrorMessage.textContent = event.error.message;
      } else {
        ibanErrorMessage.textContent = '';
      }

      // Display bank name corresponding to IBAN, if available.
      if (event.bankName) {
        ibanBankName.textContent = event.bankName;
        ibanBankName.classList.add('visible');
      } else {
        ibanBankName.classList.remove('visible');
      }
    });

    // Handle form submission.
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var sourceData = {
        type: 'sepa_debit',
        currency: 'eur',
        owner: {
          name: document.querySelector('input[name="name"]').value,
          email: document.querySelector('input[name="email"]').value,
        },
        mandate: {
          // Automatically send a mandate notification email to your customer
          // once the source is charged.
          notification_method: 'email',
        }
      };

      // Call `stripe.createSource` with the iban Element and additional options.
      stripe.createSource(iban, sourceData).then(function (result) {
        if (result.error) {
          alert(result.error.message)
        } else {
          stripeSourceHandler(result.source);
        }
      });
    });
  },
  init: () => {
    document.querySelector('[data-load-stripe]').addEventListener('click', () => paymentForm.setup(), { once: true })
  }
}

paymentForm.init()

