import {refresh} from "./home/home-page"
export default class Products {
    public static products = [];

    public static addProduct(name: String) {
        if (this.products.indexOf(name) !== -1) return;
        this.products.push({ name });
        refresh();
    }

    public static deleteProduct(name: String){
        if (this.products.indexOf(name) !== -1) return;
        this.products.splice(0);
        refresh();
    }

    public static showProductDetails(name: String){
        this.products.toString;
        // console.log("details")
        refresh();
    }
}
