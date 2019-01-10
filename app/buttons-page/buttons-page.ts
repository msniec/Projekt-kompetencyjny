/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { SpeechRecognitionInitializer } from "../SpeechRecognition/SpeechRecognitionInitializer";

import { alert } from "tns-core-modules/ui/dialogs";
import { HomeViewModel } from "./buttons-page-model";
import { getFrameById } from "tns-core-modules/ui/frame";

import { EventData, fromObject, Observable } from "tns-core-modules/data/observable";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { TextField } from "tns-core-modules/ui/text-field";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";
import { Button } from "tns-core-modules/ui/button";

import PubSub from "pubsub-js";

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;

    const list = [];
    const jedzenie = ["bread", "butter", "ham", ""]
    let listofproducts: { id: number, name: string }[] = [
        { "id": 0, "name": "bread"},
        { "id": 1, "name": "butter"},
        { "id": 2, "name": "ham"}
        // { "id": 2, "name": "ham", "src": new URL("app\images\bread.png") }
    ];

    //  let a: { id: number, name: string, src: HTMLImageElement }[] = [
    //      { "id": 2, "name": "ham", "src": new Image()} /// tu sie wywala, nie wiem jak dodac zdjecie
    //  ];


    for (let i = 0; i < 10; i++) {
        list.push(listofproducts[i]);
    }

    const viewModel = fromObject({
        items: list,
        
        
    });

    page.bindingContext = viewModel;
}




export function onItemTap(args: ItemEventData) {
    const index = args.index;
    const rootFrame = getFrameById("root-frame");
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById("listView");
    page.bindingContext.myTitles = page.bindingContext.myTitles.filter((value, i) => {
        return i != index;
    });
    lview.refresh();
}

export function onReturnPress(args) {
    let textField = <TextField>args.object;
    const rootFrame = getFrameById("root-frame");
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById("listView");
    console.log("onReturn");
    lview.bindingContext.myTitles.push({
        title: textField.text
    });
    textField.text = "";
    // this.firstTx = textField.text;
}

export function onTap(args: EventData) {
    const button = <Button>args.object;
    button.text = `Tapped`;
    const myButton = new Button();
myButton.text = "Tap me!";
myButton.className = "my-button";
//myButton.on(Button.tapEvent, (data: GestureEventData) => {
    // data is of type GestureEventData
    //alert("Button Tapped!");
//});
}

export function onLabelTap(args: EventData){
    const button = <Button>args.object;

    console.log("tapped button: " + button.text );
}
