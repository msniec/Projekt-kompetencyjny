import {refresh} from "./home/home-page"
import FirebaseConnection from "./FirebaseConnection";
export default class Products {
    public static products = [];

    public static addProduct(name: String) {
        if (this.products.indexOf(name) !== -1) return;
        this.products.push({ name });
        FirebaseConnection.updateProduct();
        refresh();
    }

    public static deleteProduct(name: String){
        if (this.products.indexOf(name) !== -1) return;
        this.products.splice(0);
        FirebaseConnection.updateProduct();
        refresh();
    }

    public static deleteOneProduct(name:String){
        if (this.products.indexOf(name) !== -1) return;
        this.products.splice(this.products.indexOf(name), 1);
        FirebaseConnection.updateProduct();
        refresh();
    }

    public static showProductDetails(name: String){
        this.products.toString;
        FirebaseConnection.updateProduct();
        refresh();
    }
}
