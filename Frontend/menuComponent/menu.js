class menu_Profeco extends HTMLElement {
    #urlConsumidor = 'http://localhost:3032/api/v1/consumidor/login';
    #configFetch = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    constructor() {
        super();
    }


    connectedCallback(){
        const consumidorId = this.getAttribute("consumidorId");
        const shadow = this.attachShadow({mode:'open'});
        this.#render(shadow);
        this.#agregarEventos(shadow,consumidorId);
    }

    #render(shadow){
        shadow.innerHTML +=`
        <div>
        <nav>
             <ul>
                    <li><button id="btnOfer"type="button">Ofertas</a></li>
                    <li><button id="btnProd" type="button">Productos</a></li>
                    <li><button id="btnWish"type="button">Whishlist</a></li>
                    <li><button id="btnCal"type="button">Calificaciones</a></li>
                </ul>
        </nav>
    </div>        
    `;
    }

    #agregarEventos(shadow,id){
        const btnOferta = shadow.getElementById("btnOfer");
        const btnProducto = shadow.getElementById("btnProd");
        const btnWishlist = shadow.getElementById("btnWish");
        const btnCalificacion = shadow.getElementById("btnCal");
        
        btnOferta.addEventListener("click",()=>this.#cambiaPantallaOferta(id));
        btnProducto.addEventListener("click",()=>this.#cambiaPantallaProducto(id));
        btnWishlist.addEventListener("click",()=>this.#cambiaPantallaWishlist(id));
        btnCalificacion.addEventListener("click",()=>this.#cambiarPantallaCalificacion(id));
    }

    #cambiaPantallaOferta(id){
        alert("oferta");
        const lista = this.shadowRoot.host;
        this.shadowRoot.inneHTML ="";
        lista.outerHTML = `<profeco-menu consumidorId="${id}"></profeco-menu>`;
    }
    #cambiaPantallaProducto(id){
        const lista = this.shadowRoot.host;
        this.shadowRoot.inneHTML ="";
        lista.outerHTML =  `<profeco-producto consumidorId="${id}"></profeco-producto>`;
    }
    #cambiaPantallaWishlist(id){
        const lista = this.shadowRoot.host;
        this.shadowRoot.inneHTML ="";
        lista.outerHTML = `<profeco-wish consumidorId="${id}"></profeco-wish>`;
    }

    #cambiarPantallaCalificacion(id){
        alert("calif");
        const lista = this.shadowRoot.host;
        this.shadowRoot.inneHTML ="";
        //lista.outerHTML = `<profeco-menu consumidorId="${data.idConsumidor}"></profeco-menu>`;
    }
}

window.customElements.define('profeco-menu', menu_Profeco);