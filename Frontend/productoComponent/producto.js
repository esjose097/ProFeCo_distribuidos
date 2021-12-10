class productoProfeco extends HTMLElement {
    #urlProducto = 'http://localhost:3032/api/v1/productos/';
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
        //const productoId = this.getAttribute("productoId");
        const shadow = this.attachShadow({mode:'open'});
        this.#renderRegistrar(shadow);
        this.#agregarEventoMostrar(shadow);
    }

    #renderRegistrar(shadow){
        shadow.innerHTML = `
        <header>
            <h1>ProfecoBuy</h1>
        </header>
        <nav>
            <ul>
                <li>
                    <a class="productos" ref="#">
                    Productos  
                    </a>
                </li>
                <li>
                    <a class="ofertas" ref="#">
                            Ofertas
                    </a>
                </li>
                <li>
                    <div class="search-container">
                        <input class="search" type="text" placeholder="Buscar.." name="search">
                        <button class="search" type="submit">Buscar</button>
                    </div>
                </li>
                
                <li>
                    <a class="compras" ref="#">
                        Compras
                    </a>
                </li>
                <li>
                    <a class="logout" ref="#">
                        Cerrar sesión
                    </a>
                </li>
            </ul>
        </nav>
        
        <main>
            <div class="container padding-bottom-3x mb-2">
                
                    <div class="col-lg-8">
                        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                        <!-- registro producto-->
                        <div class="table-responsive wishlist-table margin-bottom-none">
                        <div class="log">
                        <h1>Registro de Producto</h1>
                           <input id="nombre" type="nombre" name="nombre" placeholder="Nombre del producto">
                         
                         <div class="1">
                           <input id="precio" type="precio" name="precio" placeholder="Precio">
                         </div>
                         <div class="1">
                           <input id= "oferta" type="oferta" name="oferta" placeholder="Oferta">
                         </div>
                       <div class="1">
                           <button id="btnRegProducto" type="submit">Registrar producto</button>
                       </div>
                       <div class="2">
                           <button><a href="index.hbs">Cancelar</a></button>
                       </div>
               </div>
                    </div>
                        <button id="btnMostrar">Mostrar productos</button>
                    </div>
                </div>
            </div>
        </main>
        `;
    }

    #agregarEventoMostrar(shadow){
        const btnMostrar = shadow.getElementById("btnMostrar");
        btnMostrar.addEventListener("click",()=>this.#cambiarAMostrar(shadow));
    }
    #cambiarAMostrar(shadow){
        const lista = this.shadowRoot.host;
        this.shadowRoot.inneHTML ="";
        this.#renderMostrar(shadow);
        this.#listarProductos(shadow);
        
    }
    #agregarEventoCrear(shadow){
        const btnRegProd = shadow.shadow.getElementById("btnRegProducto");

        btnRegProd.addEventListener("click",()=>this.#crearProducto(shadow));
    }


    async #crearProducto(shadow){

        const nombre = shadow.getElementById("nombre");
        const precio = shadow.getElementById("precio");
        const oferta = shadow.getElementById("oferta");

        const data = {
            nombre:nombre,
            precio:precio,
            oferta:oferta
        }
        
        this.#agregarProducto(data);

    }
    
    async #agregarProducto(data){
        this.#configFetch.method = "POST";
        this.#configFetch.body = data;
        const res= await fetch(this.#configFetch,this.#urlProducto).then(response=> response.json());
    }
    #renderMostrar(shadow){
        shadow.innerHTML = `
        <header>
            <h1>ProfecoBuy</h1>
        </header>
        
        <nav>
            <ul>
                <li>
                    <a class="productos" ref="#">
                    Productos  
                    </a>
                </li>
                <li>
                    <a class="ofertas" ref="#">
                            Ofertas
                    </a>
                </li>
                <li>
                    <div class="search-container">
                        <input class="search" type="text" placeholder="Buscar.." name="search">
                        <button class="search" type="submit">Buscar</button>
                    </div>
                </li>
                
                <li>
                    <a class="compras" ref="#">
                        Compras
                    </a>
                </li>
                <li>
                    <a class="logout" ref="#">
                        Cerrar sesión
                    </a>
                </li>
            </ul>
        </nav>
        
        <main>
            <div class="container padding-bottom-3x mb-2">
                
                    <div class="col-lg-8">
                        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                        <!-- Wishlist Table-->
                        <div class="table-responsive wishlist-table margin-bottom-none">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Productos</th>
                                        <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#">Clear Wishlist</a></th>
                                    </tr>
                                </thead>
                                <tbody id ="tablaProductos">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `;
    }


    async #listarProductos(shadow){
        this.#renderMostrar(shadow);
        const tabla = shadow.getElementById("tablaProductos");
        const data = await this.#obtenProductos();
        console.log(data);
        tabla.innerHTML = "";
        for(const producto of data)
        {            
            tabla.innerHTML+= this.#template(producto);
        }        
    }

    #template(producto){
        return `
        <tr>
            <td>
                <div class="product-item">
                    <div class="product-info">
                        <h4 class="product-title"><a href="#">${producto.nombre}</a></h4>
                        <div class="text-lg text-medium text-muted">${producto.precio}</div>
                    </div>
                </div>
            </td>
            <td class="text-center">
                <input class="custom-control-input" type="checkbox" id="remove-from-cart" title="" data-original-title="Remove item">
                <label class="custom-control-input" for="remove">Remover</label>
            </td>
    </tr>
    `
    }
        
    async #obtenProductos(){
        this.#configFetch.method="GET";
        return await fetch(this.#urlProducto+"lista",this.configFetch)
        .then(response =>response.json());
    }

    async #obtenProducto(shadow){
        this.#configFetch.method="GET";
        this.#renderMostrar(shadow);
        const tabla = shadow.getElementById("tablaProductos");
        const data = await this.#obtenProductos();
        console.log(data);
        tabla.innerHTML = "";
        for(const producto of data)
        {            
            tabla.innerHTML+= this.#template(producto);
        }   
    
    }
} 




window.customElements.define('profeco-producto', productoProfeco);
