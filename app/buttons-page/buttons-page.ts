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

import { EventData, fromObject } from "tns-core-modules/data/observable";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { TextField } from "tns-core-modules/ui/text-field";

import { Button } from "tns-core-modules/ui/button";

import PubSub from "pubsub-js";

export function onNavigatingTo(args: EventData) {
    
    
    const page = <Page>args.object;
    const vm = fromObject({
        // Setting the listview binding source
        text: "Item",
        myTitles: []
    });
    page.bindingContext = vm;
    // PubSub.subscribe("addItem", item => {
    //     alert(item);
    //     page.bindingContext.push(item);
    // });
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
