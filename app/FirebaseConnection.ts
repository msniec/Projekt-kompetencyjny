import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import {getValue, setValue, push} from 'nativescript-plugin-firebase';
import Products from "./Produts";
import { refresh } from "./home/home-page";
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
                Products.products = result.value;
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

    public static updateProduct = () =>{
        const documents: Folder = <Folder>knownFolders.documents();
        if(!documents.contains(path)){
            push('/users',Products.products).then(
                (result)  => {
                 console.log("plik firebase nie istnieje wygenerowany klucz" + result.key);
                 FirebaseConnection.createFile(result.key);
                }
            );
            
        }
        const file: File = <File>documents.getFile(path);
       setValue(`/users/${FirebaseConnection.userKey}`,Products.products)
            .then(()=>{
                console.log("update produktow dla klucza"+FirebaseConnection.userKey)
            }).catch((err)=>{
                console.log(err);
            })
        
    }
}