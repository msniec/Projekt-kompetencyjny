import { SpeechRecognition } from 'nativescript-speech-recognition';
import { SpeechRecognitionTranscription } from 'nativescript-speech-recognition';
import { alert } from 'tns-core-modules/ui/dialogs';
import PubSub from 'pubsub-js';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import Products from '~/Produts';
import {refresh, changeColourButton} from "../home/home-page"

export class SpeechRecognitionInitializer {
    private speechRecognition = new SpeechRecognition();

    public checkAvailability(): void {
        this.speechRecognition.available().then(
            (available: boolean) => {
                console.log('checking' + available);
                this.listen();
            },
            (err: string) => alert("speach reccognition isn't working")
        );
    }
    public listen() {
        this.speechRecognition
            .startListening({
                locale: 'en-US',
                returnPartialResults: false,
                onResult: (transcription: SpeechRecognitionTranscription) => {
                    dialogs
                        .confirm({
                            title: 'Adding products to list',
                            message: `Do you want add this products ${transcription.text}`,
                            okButtonText: 'Add',
                            cancelButtonText: 'Cancel'
                        })
                        .then(result => {
                            if (result == true) {
                                Products.addProduct(transcription.text);
                                refresh();  
                            }
                            changeColourButton();
                        });
                },
                onError: (error: string | number) => {
                    alert('Do not recognize word');
                    changeColourButton();
                }
            })
            .then(
                (started: boolean) => {
                    console.log(`started listening`);
                },
                (errorMessage: string) => {
                    console.log(`Error: ${errorMessage}`);
                }
            )
            .catch((error: string | number) => {
                alert('DEA');
            });
    }
}
