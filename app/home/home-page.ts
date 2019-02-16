/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { NavigatedData, Page } from 'tns-core-modules/ui/page';
import { SpeechRecognitionInitializer } from './../SpeechRecognition/SpeechRecognitionInitializer';

import { Button } from 'tns-core-modules/ui/button';
import { alert } from 'tns-core-modules/ui/dialogs';
import { HomeViewModel } from './home-view-model';
import { getFrameById } from 'tns-core-modules/ui/frame';
import * as platformModule from 'tns-core-modules/platform';

import { EventData, fromObject } from 'tns-core-modules/data/observable';
import { ListView, ItemEventData } from 'tns-core-modules/ui/list-view';
import { TextField } from 'tns-core-modules/ui/text-field';

import Products from '../Produts';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;

    const vm = fromObject({
        color: 'blue',
        // Setting the listview binding source
        text: 'Item',
        products: Products.products,
        screenWidth: platformModule.screen.mainScreen.widthPixels
    });
    page.bindingContext = vm;
}

export function onItemTap(args: ItemEventData) {
    const index = args.index;
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    
    page.bindingContext.products = page.bindingContext.products.filter((value, i) => {
        return i != index;
    });
   refresh();
}
export function redirectToIcon(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate('buttons-page/buttons-page');
}
export function voidF() {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    page.bindingContext.color = 'yellow';
    const spr = new SpeechRecognitionInitializer();
    spr.checkAvailability();
    // page.bindingContext.color = 'blue';
    console.log('VOI');
}

export function voiceFunction(){


}


export function onReturnPress(args) {
    let textField = <TextField>args.object;
    addToList(textField.text);
    textField.text = '';
    // this.firstTx = textField.text;
}

export function addToList(item: string) {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById('listView');
    console.log('onReturn');
    Products.addProduct(item);
    lview.refresh();
}
export function refresh(){
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById('listView');
    if(lview){
        lview.refresh();
    }   
}