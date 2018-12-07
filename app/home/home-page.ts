/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { NavigatedData, Page } from "tns-core-modules/ui/page";
import {SpeechRecognitionInitializer} from "./../SpeechRecognition/SpeechRecognitionInitializer";

import { HomeViewModel } from "./home-view-model";
import { getFrameById } from "tns-core-modules/ui/frame";

import { EventData, fromObject } from "tns-core-modules/data/observable";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";

export function onNavigatingTo(args: EventData) {
    const spr = new SpeechRecognitionInitializer();
    spr.checkAvailability();
    const page = <Page>args.object;
    const vm = fromObject({
        // Setting the listview binding source
        myTitles: [
            { title: "The Da Vinci Code" },
            { title: "Harry Potter and the Chamber of Secrets" },
            { title: "The Alchemist" },
            { title: "The Godfather" },
            { title: "Goodnight  Moon" },
            { title: "The Hobbit" }
        ]
    });
    page.bindingContext = vm;
}

export function onListViewLoaded(args: EventData) {
    const listView = <ListView>args.object;
}

export function onItemTap(args: ItemEventData) {
    const index = args.index;
    const rootFrame = getFrameById("root-frame");
    const page = rootFrame.currentPage;
    page.bindingContext.myTitles.pop();
}
