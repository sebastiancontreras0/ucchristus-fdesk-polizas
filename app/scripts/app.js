let client;
let contactRut;

init();

async function init() {
  console.log("Initializing Custom App");
  client = await app.initialized();

  console.log("Abriendo Modal...");
  client.events.on('app.activated', openModal);


}


function openModal() {
  console.log("Modal opened");
  let titulo = ` `;

  try {
    client.interface.trigger('showModal', {
      title: titulo,
      data: {
        title: "Ejemplo de Titulo enviado por contexto",
        content: "Ejemplo de detalle enviado por contexto",
        rut: contactRut
      },
      template: './views/modal.html'
    }).then(
      function (data) {
        console.log("DATAA: ", data);
      },
      function (error) {
        console.log(error);
      }
    );
  } catch (error) {
    console.log("Error opening modal");
    console.error(error);
  }
}


async function getContactDetails() {
  try {
    const data = await client.data.get("contact");
    // success output
    // data is {ticket: {"subject": "support needed for..",..}}
    return data;
  } catch (error) {
    // failure operation
    console.log(error);
  }
}


