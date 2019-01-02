import { SpeechRecognition } from "nativescript-speech-recognition";
import { SpeechRecognitionTranscription } from "nativescript-speech-recognition";
import { alert } from "tns-core-modules/ui/dialogs";
import PubSub from "pubsub-js";
import {addToList} from '../home/home-page'
import * as dialogs from "tns-core-modules/ui/dialogs";

export class SpeechRecognitionInitializer {
    private speechRecognition = new SpeechRecognition();

    public checkAvailability(): void {
        this.speechRecognition.available().then(
            (available: boolean) => {
                // alert(available);
                console.log("checking" + available);
                this.listen();
            },
            (err: string) => alert("speach reccognition isn't working")
        );
    }
    public listen() {
        // console.log("Listen");
        this.speechRecognition
            .startListening({
                // optional, uses the device locale by default
                locale: "en-US",
                // set to true to get results back continuously
                returnPartialResults: false,
                 // this callback will be invoked repeatedly during recognition
                onResult: (transcription: SpeechRecognitionTranscription) => {
                    dialogs.confirm({
                        title: "Adding products to list",
                        message: "Do you want add this products    "+transcription.text,
                        okButtonText: "Add",
                        cancelButtonText: "Cancel"
                    }).then(result=> { 
                        if(result==true){
                            addToList(transcription.text);
                        }
                    });
                },
                onError: (error: string | number) => {
                    // because of the way iOS and Android differ, this is either:
                    // - iOS: A 'string', describing the issue.
                    alert(error);
                    // - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
                    //            If that code is either 6 or 7 you may want to restart listening.
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
                alert("DEA");
            });
    }
}