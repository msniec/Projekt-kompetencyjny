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
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as imagepicker from 'nativescript-imagepicker';
import { EventData, fromObject } from 'tns-core-modules/data/observable';
import { ListView, ItemEventData } from 'tns-core-modules/ui/list-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import Products from '../Produts';

var iterator = 3;
export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const vm = fromObject({
        color: 'white',
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

export function changeColourButton() {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    page.bindingContext.color = 'white';
}

export function voidF() {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const spr = new SpeechRecognitionInitializer();
    page.bindingContext.color = 'yellow';
    spr.checkAvailability();
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
    Products.addProduct(item);
    lview.refresh();
}

export function removeFromList(item: string) {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById('listView');
    dialogs
        .confirm({
            title: 'Deleting all products from list',
            message: 'Are you sure?',
            okButtonText: 'Yes',
            cancelButtonText: 'No'
        })
        .then(result => {
            if (result == true) {
                Products.deleteProduct(item);
                lview.refresh();
            }
        });
    lview.refresh();
}

export function removeOneItemFromList(item: String) {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById('listView');
    dialogs
        .confirm({
            title: 'Deleting one product from list',
            message: 'Are you sure?',
            okButtonText: 'Yes',
            cancelButtonText: 'No'
        })
        .then(result => {
            if (result == true) {
                Products.deleteOneProduct(item);
                lview.refresh();
            }
        });
    lview.refresh();
}

export function showDetails(item: string) {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    const lview = <ListView>page.getViewById('listView');
    Products.showProductDetails(item);
    lview.refresh();
}

export function redirectToDetails(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate('details-page/details-page');
}

export function refresh() {
    const rootFrame = getFrameById('root-frame');
    const page = rootFrame.currentPage;
    if (page) {
        const lview = <ListView>page.getViewById('listView');
        if (lview) {
            lview.refresh();
        }
    }
}

export function addPhoto() {
    let context = imagepicker.create({
        mode: 'multiple'
    });
    context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then(selection => {
            selection.forEach(selected => {
                if (iterator === 3) {
                    Products.addProduct('Cucumber');
                }
                if (iterator === 2) {
                    Products.addProduct('Carrot');
                }
                if (iterator === 1) {
                    Products.addProduct('Butter');
                }
                iterator--;
            });
        })
        .catch(error => {});
}
