class wishProfeco extends HTMLElement {
    #urlWishlist = 'http://localhost:3032/api/v1/consumidor/getWishlist/';
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
        this.#listarWishlist(shadow, consumidorId);
    }

    #render(shadow){
        shadow.innerHTML = `
        <header>
            <h1>ProfecoBuy</h1>
        </header>
        
        <nav>
            <ul>
                <li>
                    <a class="productos" ref="#">
                    Wishlist 
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
                                        <th>Wishlist</th>
                                        <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#">Clear Wishlist</a></th>
                                    </tr>
                                </thead>
                                <tbody id="tablaWishlist">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `;
    }

    async #listarWishlist(shadow, id){
        const wishlist = await this.#obtenWishlist(id);
        const tabla = shadow.getElementById("tablaWishlist");
        for(const detalle of wishlist.productos)
        {
            tabla.innerHTML+= this.#template(detalle);
        }
        tabla.innerHTML+=`
        <div>
            <h3>TOTAL: ${wishlist.total}</h3>
        </div>`;
    }

//nombre, cantidad, subtotal
    #template(detalle){
        return `
        <tr>
            <td>
                <div class="product-item">
                    <div class="product-info">
                        <h4 class="product-title"><a href="#">${detalle.producto.nombre}</a></h4>
                        <div class="text-lg text-medium text-muted">$${detalle.producto.precio}</div>
                        <div>N&uacute;mero de articulos: ${detalle.cantidad}
                            <div class="d-inline text-success">6</div>
                        </div>
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

    async #obtenWishlist(id){
        return await fetch(this.#urlWishlist+id,this.#configFetch)
        .then(response=>response.json());
    }
}




window.customElements.define('profeco-wish', wishProfeco);