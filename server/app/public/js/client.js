var stripe = Stripe(
  'pk_test_51GxJNpBTuxm47TYAKadvPK6d4TdXLbSDvdImWIXoPZwVnIAUFALV1hm47TG6goZZpnBvOEMM6flBWNGHFiDUiGNU00Q8eMlxxo'
);
// The items the customer wants to buy
var purchase = {
  items: [{ id: 'xl-tshirt' }],
};
// Disable the button until we have Stripe set up on the page
document.querySelector('button').disabled = true;
fetch('payments/add-billing', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bWl0Y29tcDEzQGdtYWlsLmNvbSIsImlkIjoiNjA0NjExYzI4YzZjMGEyNjQwYjFmYTU5IiwidXNlcl90eXBlIjoyLCJpYXQiOjE2MTUyMDQ4MDMsImV4cCI6MTYyMjk4MDgwM30.iMAkdCFXzskdgvHPNK9opLv6txSp6D-JmbpWz16SK4k',
  },
  // body: JSON.stringify({
  //   entity: '604611e28c6c0a2640b1fa5b',
  //   name: 'service',
  //   budget: 500,
  //   period: 3,
  // }),
})
  .then(function (result) {
    console.log(result);
    return result.json();
  })
  .then(function (data) {
    console.log(data);
    var elements = stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    var card = elements.create('card', { style: style });
    // Stripe injects an iframe into the DOM
    card.mount('#card-element');
    card.on('change', function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector('button').disabled = event.empty;
      document.querySelector('#card-error').textContent = event.error
        ? event.error.message
        : '';
    });
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked
      payWithCard(stripe, card, data.data.client_secret);
    });
  });
// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      console.log({ result });
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
      }
    });
};
/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
  loading(false);
  document
    .querySelector('.result-message a')
    .setAttribute(
      'href',
      'https://dashboard.stripe.com/test/payments/' + paymentIntentId
    );
  document.querySelector('.result-message').classList.remove('hidden');
  document.querySelector('button').disabled = true;
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector('#card-error');
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = '';
  }, 4000);
};
// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('button').disabled = true;
    document.querySelector('#spinner').classList.remove('hidden');
    document.querySelector('#button-text').classList.add('hidden');
  } else {
    document.querySelector('button').disabled = false;
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#button-text').classList.remove('hidden');
  }
};
