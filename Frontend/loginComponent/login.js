
class loginCosumidor extends HTMLElement {
    #urlConsumidor = 'http://localhost:3032/api/v1/consumidor/login';
    #configFetch = {
        method: 'POST',
        mode: 'cors',
        body: "",
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    constructor() {
        super();
    }

    async connectedCallback(){
        const shadow = this.attachShadow({mode:'open'});
        this.#render(shadow);
        this.#agregarEvento(shadow);
    }

    #render(shadow){
        shadow.innerHTML +=`
        <div class="log">
          <label for="bienvenida" class="bienvenida">¡Bienvenido a ProfecoBuy!</label>
          <br>
            <input id="user" type="user" name="user" placeholder="Usuario">
          </div>
          <div class="">
            <input id="contra" type="contrasena" name="contrasena" placeholder="Contrasena">
          </div>
          
        <div class="coso">
            <button type="submit" id="btnIngresar" type="button">Ingresar</button>
        </div>
        `;
    }

    async #login(data){
        this.#configFetch.body = JSON.stringify(data);
        const res = await fetch(this.#urlConsumidor,this.#configFetch).then(response=> response.json());
        if(res.validado == true)
        {
            const lista = this.shadowRoot.host;
            this.shadowRoot.inneHTML ="";
            lista.outerHTML = `<profeco-menu consumidorId="${res.idConsumidor}"></profeco-menu>`;
            
        }else{
            alert("ERROR");
        }
    }

    #agregarEvento(shadow){
        const btnIngresar = shadow.querySelector("#btnIngresar");
        btnIngresar.addEventListener("click",()=>this.#getDatosForm(shadow));
    }

    #getDatosForm(shadow){  
        const Correo = shadow.getElementById("user").value;
        const Contra = shadow.getElementById("contra").value;
     
        const data = {
            usuario:Correo,
            contra:Contra
        }
        
        this.#login(data);
    }
}
window.customElements.define('profeco-login', loginCosumidor);