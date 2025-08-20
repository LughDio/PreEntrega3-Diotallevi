const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mwkjedvd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      if (response.ok) {
        status.innerText = 'Gracias por tu consulta. Te responderemos pronto.';
        form.reset();
      } else {
        status.innerText = 'Hubo un problema al enviar el formulario.';
      }
    } catch (error) {
      status.innerText = 'Hubo un problema al enviar el formulario.';
    }
  });
}
