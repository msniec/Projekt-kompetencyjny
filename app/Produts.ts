export default class Products {
    public static products = [];

    public static addProduct(name: String) {
        if (this.products.indexOf(name) !== -1) return;
        this.products.push({ name });
    }
}
