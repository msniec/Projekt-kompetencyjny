import {SpeechRecognition} from 'nativescript-speech-recognition';
import {alert} from "tns-core-modules/ui/dialogs";

export class SpeechRecognitionInitializer {
  private speechRecognition = new SpeechRecognition();

  public checkAvailability(): void {
    this.speechRecognition.available().then(
      (available: boolean) => {
        this.requestPermission();
      },
      (err: string) => alert("wyjebalo sie")
    );
  }
  private requestPermission(){
  this.speechRecognition.requestPermission().then((granted: boolean) => {
    this.listen();
  }).catch(()=>{
  alert("huj")});
  }
  private listen () {
  alert("Listen")
          this.speechRecognition.startListening(
            {
              // optional, uses the device locale by default
              locale: "en-US",
              // set to true to get results back continuously
              returnPartialResults: true,
              // this callback will be invoked repeatedly during recognition
              onResult: (transcription: any) => {
                alert(`User said: ${transcription.text}`);
                  alert(`User finished?: ${transcription.finished}`);
              },
              onError: (error: string | number) => {
                // because of the way iOS and Android differ, this is either:
                // - iOS: A 'string', describing the issue.
                alert("ASDSAD")
                // - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
                //            If that code is either 6 or 7 you may want to restart listening.
              }
            }
          ).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
          ).catch((error: string | number) => {
            alert("DEA")
          });
          }
}