import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import {getValue} from 'nativescript-plugin-firebase';
import Products from "./Produts";
const path = "firebase.txt";

export default class FirebaseConnection{
    public static userKey = "";

    public static init = () => {
        const documents: Folder = <Folder>knownFolders.documents();
        if(!documents.contains(path)) return;
        const file: File = <File>documents.getFile(path);
        file.readText()
            .then((res) => {
                FirebaseConnection.userKey = res;
                FirebaseConnection.readProducts();
            }).catch((err) => {
                console.log(err.stack);
            });
    }

    public static readProducts = () => {
        getValue(`/users/${FirebaseConnection.userKey}`)
            .then(result => {
                for(const product of result.value.products) {
                    console.log(product);
                    Products.addProduct(product);
                }
            })
            .catch(error => console.log("Error: " + error));
    }

    public static createFile = (token) => {
        const documents: Folder = <Folder>knownFolders.documents();
        const file: File = <File>documents.getFile(path);

        file.writeText(token)
            .then(() => {
                FirebaseConnection.userKey = token;
            }).catch((err) => {
                console.log(err);
            });
    }


}