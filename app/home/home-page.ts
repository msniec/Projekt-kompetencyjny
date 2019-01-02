/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { SpeechRecognitionInitializer } from "./../SpeechRecognition/SpeechRecognitionInitializer";

import { Button } from "tns-core-modules/ui/button";
import { alert } from "tns-core-modules/ui/dialogs";
import { HomeViewModel } from "./home-view-model";
import { getFrameById } from "tns-core-modules/ui/frame";
import * as platformModule from "tns-core-modules/platform";

import { EventData, fromObject } from "tns-core-modules/data/observable";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { TextField } from "tns-core-modules/ui/text-field";

import PubSub from "pubsub-js";


export function onNavigatingTo(args: EventData) {
   
    const page = <Page>args.object;
    const vm = fromObject({
        // Setting the listview binding source
        text: "Item",
        myTitles: [],
        screenWidth: platformModule.screen.mainScreen.widthPixels
    });
    page.bindingContext = vm;
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
export function redirectToIcon(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate("pageone/home-page");
}
export function voidF() {
    const spr = new SpeechRecognitionInitializer();
    spr.checkAvailability();
    console.log("VOI");
}

export function onReturnPress(args) {
    let textField = <TextField>args.object;
    addToList(textField.text);
    textField.text = "";
    // this.firstTx = textField.text;
}

function addToList(item: string) {
    const rootFrame = getFrameById("root-frame");
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById("listView");
    console.log("onReturn");
    lview.bindingContext.myTitles.push({
        title: item
    });
}
