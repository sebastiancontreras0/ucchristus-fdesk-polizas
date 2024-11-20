let rootElement = document.getElementById("rootDiv");
let spinnerElement = document.getElementById("loadingSpinner");
let dataFromContext;
let contratosArray;
let accessToken;

const mainTitle = document.createElement("h2");
mainTitle.classList.add("titulo-modal");

async function init() {
    client = await app.initialized();
    spinnerElement.innerHTML = '<fw-spinner size="large"></fw-spinner>';

    try {
        let data = await client.instance.context();
        console.log("context", data); // context
        dataFromContext = data.data;
        accessToken = await getAccessToken();

        getInfo("18602734-5", accessToken);
        // contratosArray = await getContratos(dataFromContext.rut);
        // renderContratos(contratosArray);
        spinnerElement.remove();
        // mainTitle.innerText = `Contratos de contacto ${dataFromContext.rut}`;
        // rootElement.insertBefore(mainTitle, rootElement.firstChild);

    } catch (error) {
        console.error(error);
    }
}


function createContratoItem(contrato) {
    console.log("create Contrato item initialized");

    const accordionItem = document.createElement("fw-accordion");
    const accordionTitle = document.createElement("fw-accordion-title");
    const accordionBody = document.createElement("fw-accordion-body");
    console.log("data from context: ", dataFromContext);
    console.log("CONTRATOS ARRAY: ", contratosArray);
    //Texto dentro de los elementos
    accordionTitle.innerText = dataFromContext.title;
    accordionBody.innerText = dataFromContext.content;
    accordionTitle.innerText = `Contrato ${contrato.contract_number}`;

    console.log("HERE:!!", contrato);

    // CONTRATO
    // MODEL_DESC
    // LICENSE_PLATE_NBR
    // PLAN
    // PURCHASE_DT
    // CONTRACT_DT
    // CONTRACT_CLOSE_DT
    // NPA_STAGE
    // CONTRACT_STATUS_CD
    // RUT
    // DAYS_PAST_DUE
    // STOP_CREDIT_BUREAU_IND
    // SEGMENTO


    //función para invertir la fecha

    let fechaCompra, fechaContrato, fechaCierre;


    // fechaCompra = invertirFecha(contrato.purchase_date);
    // fechaContrato = invertirFecha(contrato.contract_dt);
    // fechaCierre = invertirFecha(contrato.contract_close_dt);

    fechaCompra = contrato.purchase_date;
    fechaContrato = contrato.contract_dt;
    fechaCierre = contrato.contract_close_dt;


    vap_segc = Math.floor(parseFloat(contrato.vap_segc)).toLocaleString('es-ES');
    vap_segd_f = Math.floor(parseFloat(contrato.vap_segd_f)).toLocaleString('es-ES');
    vap_segd = Math.floor(parseFloat(contrato.vap_segd)).toLocaleString('es-ES');
    vap_segd_h = Math.floor(parseFloat(contrato.vap_segd_h)).toLocaleString('es-ES');
    orig_installment_amt = Math.floor(parseFloat(contrato.orig_installment_amt)).toLocaleString('es-ES');
    balance_principal = Math.floor(parseFloat(contrato.balance_principal)).toLocaleString('es-ES');
    extension_days = Math.floor(parseFloat(contrato.extension_days));
    phone_work = Math.floor(parseFloat(contrato.phone_work));
    telefono_validado = Math.floor(parseFloat(contrato.telefono_validado));






    const detailBody = `
    <div class="grid-details">

    <div class="detail-card"><div class="detail-card-title">Rut: </div>${contrato.rut ? contrato.rut : "-"}</div>
    <div class="detail-card"><div class="detail-card-title">Patente Auto: </div>${contrato.license_plate_nbr ? contrato.license_plate_nbr : "-"}</div>
    <div class="detail-card"><div class="detail-card-title">Modelo Auto: </div>${contrato.model_description ? contrato.model_description : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Dealer: </div>${contrato.dealer_name ? contrato.dealer_name : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Sucursal: </div>${contrato.sucursal ? contrato.sucursal : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">N cuotas: </div>${contrato.contract_term ? contrato.contract_term : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">N cuotas Pendientes: </div>${contrato.n_payment_remaining ? contrato.n_payment_remaining : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Plan: </div>${contrato.gmf_plan ? contrato.gmf_plan : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha Compra: </div>${contrato.purchase_date ? fechaCompra : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha Firma: </div>${contrato.contract_dt ? fechaContrato : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha Cierre: </div>${contrato.contract_close_dt ? fechaCierre : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">NPA Stage: </div>${contrato.npa_stage ? contrato.npa_stage : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Estado Crédito: </div>${contrato.contract_status_cd ? contrato.contract_status_cd : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha de maduracion: </div>${contrato.maturity_dt ? contrato.maturity_dt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha ultima extension: </div>${contrato.latest_extension_dt ? contrato.latest_extension_dt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Periodo ultima extension: </div>${contrato.extension_days ? extension_days : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha ultimo pago: </div>${contrato.last_payment_dt ? contrato.last_payment_dt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha próximo pago: </div>${contrato.next_due_dt ? contrato.next_due_dt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha Inicio Alzamiento: </div>${contrato.lien_release_initiation_dt ? contrato.lien_release_initiation_dt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Fecha Termino Alzamiento: </div>${contrato.lien_release_completion_dt ? contrato.lien_release_completion_dt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Correo electrónico: </div>${contrato.email ? contrato.email : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Teléfono celular: </div>${contrato.telefono_validado ? telefono_validado : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Teléfono del trabajo: </div>${contrato.phone_work ? phone_work : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Dirección: </div>${contrato.address ? contrato.address : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Ciudad: </div>${contrato.city ? contrato.city : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Saldo Capital: </div>${contrato.balance_principal ? balance_principal : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Valor cuota: </div>${contrato.orig_installment_amt ? orig_installment_amt : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">NPA: </div>${contrato.npa_stage ? contrato.npa_stage : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">SUB NPA: </div>${contrato.sub_npa !== "nan" && contrato.sub_npa !== null ? contrato.sub_npa : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">DPD: </div>${contrato.days_past_due ? contrato.days_past_due : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Stop bureau: </div>${contrato.stop_credit_bureau_ind ? contrato.stop_credit_bureau_ind : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Monto Financiado SegD: </div>${contrato.vap_segd ? vap_segd : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Monto Financiado SegD-F: </div>${contrato.vap_segd_f ? vap_segd_f : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Monto Financiado SegD-H: </div>${contrato.vap_segd_h ? vap_segd_h : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Monto Financiado SegC: </div>${contrato.vap_segc ? vap_segc : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">Segmento: </div>${contrato.segmento ? contrato.segmento : "-"}</div>
        <div class="detail-card"><div class="detail-card-title">PAC: </div>${contrato.confirm_flag ? contrato.confirm_flag : "-"}</div>
    </div>



    `;



    accordionBody.innerHTML = detailBody;

    accordionItem.appendChild(accordionTitle);
    accordionItem.appendChild(accordionBody);

    const divAccordion = document.createElement("div");
    divAccordion.classList.add("accordion-item");

    divAccordion.appendChild(accordionItem);

    rootElement.appendChild(divAccordion);
}

function renderContratos(contratos) {
    rootElement.innerHTML = "";
    if(contratos.length === 0){
        console.error("Este Rut no tiene contratos registrados.");
        rootElement.innerHTML = `Error, no se encontró rut en base de datos.`;
    }
    contratos.forEach(element => {
        console.log("rut", element.rut);
        createContratoItem(element);
    });
}

async function getContratos(rut) {
    console.log("inicio getContratos");

    console.log(rut);
    try {

        const response = await client.request.invokeTemplate("getContratos", {
            context: {
                rut: rut
            }
        });
        console.log(response);
        const contratoResponse = JSON.parse(response.response);
        console.log(response.status);

        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }

        return contratoResponse

    } catch (error) {
        spinnerElement.remove();
        rootElement.innerHTML = `Error, no se encontró rut en base de datos.`;
        console.error('Error getting contrato');
        throw error;
    }

}

async function getAccessToken(){
    console.log("Get Access Token started.");
    try {
        const response = await client.request.invokeTemplate("getAuthToken", {
        });
        console.log(response);
        const accessTokenResponse = JSON.parse(response.response);
        console.log(accessTokenResponse);
        return accessTokenResponse.token
    } catch (error) {
        console.error("Error getting access token");
        throw error;
    }
}


async function getInfo(rut, auth){
    console.log("get info started")
    try {
        const response = await client.request.invokeTemplate("getInfo", {
            context: {
                rut: rut,
                auth_token: auth
            }
        });
        console.log(response);

    } catch (error) {
        console.error("Error getting information");
        throw error;
    }
}


async function getInfoFetch(){
    const myHeaders = new Headers();
    myHeaders.append("API-KEY", "34c6fceca75e456f25e7e99531e2425c6c1de443");
    myHeaders.append("AUTHORIZATION", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzQWhvZDBZOXdGa0VqSGE3Qzk4SHhCeDBMb2QwSVctRmQzQ3NBeGk1SzlZIn0.eyJleHAiOjE3MzIxMjM1MTksImlhdCI6MTczMjExNjMxOSwianRpIjoiNWM1YzM2Y2YtNTcyMS00ODA3LTlkODctZjRkY2VmYzFjYzRjIiwiaXNzIjoiaHR0cDovL2ludGVybmFsLWFsYi1rdGwtbXMtaW50ZXJuby0zMjk3Mzg5MjcudXMtZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tOjkwODAvcmVhbG1zL0tUTF9VQ0MtcWEiLCJzdWIiOiIwNDk2ODQ0Mi00ZGNmLTQwZTEtOGQ3OS01YzExZTQ2M2U1MTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJLVExfQUxMIiwic2Vzc2lvbl9zdGF0ZSI6IjRkZDhmN2E4LThkOGItNDhjNy05NTE1LTM0OTRkYjdkMmRkMiIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3VjYy1zdmMtcWEua2luZXR5Y2Nsb3VkLmNvbSIsImh0dHBzOi8vdWNjLXFhLmtpbmV0eWNjbG91ZC5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtS1RMX1VDQy1xYSIsIm9mZmxpbmVfYWNjZXNzIl19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiNGRkOGY3YTgtOGQ4Yi00OGM3LTk1MTUtMzQ5NGRiN2QyZGQyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoia2V5Y2xvYWsgY2xhdmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJraW5ldHljIiwiZ2l2ZW5fbmFtZSI6ImtleWNsb2FrIiwiZmFtaWx5X25hbWUiOiJjbGF2ZSJ9.ZkE7oY0FcE-2Mz_XdbAGXDYqvOUyBnEsFqiTw7WzqBSLpmSgeSHvH1yka3O91KlHxfdVJD5zWdgtTqCyt_f433hHnlf1bpJtD54d5RCKcDyXGxeqQg0Vu0Qa9zIry127y_XrvZmHiDm-vXQODPg1ZdZ23REI8cORq4dGJMCl0ALn2TLBkj63MHTXKGrBABqr0ftmPVkcfNJC0SzzbchmWzKrLxice7BFq-KbEDfZF2jKim4wRE8PG3aykvJ-kXoKU5x6wg6Pi8D5oHzPZsH3OhOI3iYo4OzcPcX55owqQfvJPA2FHtg5gAbUM_Inqr-eerPHF8AHR8kqH9EptQXraQ");
    myHeaders.append("Content-Type", "application/json");
    
    const graphql = JSON.stringify({
      query: "\r\n{\r\npartyByRut(rut: \"18602734-5\"){\r\n    idPar\r\n  }  \r\n}\r\n",
      variables: {}
    })
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow"
    };
    
    fetch("https://ucc-kinetyc-qa.kinetyccloud.com/graphql", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}





init();