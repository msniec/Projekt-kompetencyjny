/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { NavigatedData, Page } from 'tns-core-modules/ui/page';
import { SpeechRecognitionInitializer } from '../SpeechRecognition/SpeechRecognitionInitializer';

import { alert } from 'tns-core-modules/ui/dialogs';
import { HomeViewModel } from './buttons-page-model';
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

    const list = [];
    const jedzenie = ['bread', 'butter', 'ham', ''];
    let listofproducts: { name: String; src: string }[] = [
        { name: 'Bread', src: createStyle('~/images/bread.png') },
        { name: 'Cheese', src: createStyle('~/images/cheese.png') },
        { name: 'Choocolate', src: createStyle('~/images/chocolate.png') },
        { name: 'Cookies', src: createStyle('~/images/cookie.png') },
        { name: 'Doughnut', src: createStyle('~/images/doughnut.png') },
        { name: 'Meat', src: createStyle('~/images/meat.png') },
        { name: 'Tomato', src: createStyle('~/images/tomato.png') },
        { name: 'Water', src: createStyle('~/images/water.png') }


    ];

    const viewModel = fromObject({ items: listofproducts });

    page.bindingContext = viewModel;
}

export function onLabelTap(args: EventData) {
    const button = <Button>args.object;
    console.log('tapped button: ' + button.text);
    Products.addProduct(button.text);
    onNavBtnTap();
}
function createStyle(src: String) {
    return `background-image:url('${src}')`;
}

export function onNavBtnTap() {
    console.log('BAC');
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    page.frame.goBack();
}
