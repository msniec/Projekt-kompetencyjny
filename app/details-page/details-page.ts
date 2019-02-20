/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { NavigatedData, Page } from 'tns-core-modules/ui/page';
import { SpeechRecognitionInitializer } from '../SpeechRecognition/SpeechRecognitionInitializer';

import { alert } from 'tns-core-modules/ui/dialogs';
import { HomeViewModel } from './details-page-model';
import { getFrameById } from 'tns-core-modules/ui/frame';

import { EventData, fromObject, Observable } from 'tns-core-modules/data/observable';
import { ListView, ItemEventData } from 'tns-core-modules/ui/list-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { ObservableArray, ChangedData } from 'tns-core-modules/data/observable-array';
import { Button } from 'tns-core-modules/ui/button';

import PubSub from 'pubsub-js';
import Products from '~/Produts';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;

}



export function onNavBtnTap() {
    console.log('BAC');
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    page.frame.goBack();
}


export function showName(){
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    page.frame.goBack()
}

export function onReturnPress(args) {
    let textField = <TextField>args.object;
    addToList(textField.text);
    textField.text = '';
}

export function addToList(item: string) {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById('listView');
    console.log('onReturn');
    Products.addProduct(item);
    lview.refresh();
}