const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      Nombre: formData.get('Nombre'),
      Contacto: formData.get('Contacto'),
      Localidad: formData.get('Localidad'),
      Medidas: formData.get('Medidas')
    };
    try {
      const response = await fetch('https://formsubmit.co/ajax/luciano.dio90@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
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
