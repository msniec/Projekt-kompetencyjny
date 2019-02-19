import * as app from "tns-core-modules/application";
import { on as applicationOn, launchEvent, LaunchEventData} from "tns-core-modules/application";
import FirebaseConnection from "./FirebaseConnection";
import { init } from "nativescript-plugin-firebase";

applicationOn(launchEvent, (args: LaunchEventData) => {
    console.log("applicationOn");
    initilizeFirebase();
 });


app.run({ moduleName: "app-root" });

 function initilizeFirebase() {
    init({
      }).then(
          () => {
                  FirebaseConnection.init()           
          },
          (error) => {
            console.log("firebase.init error: " + error);
          }
      );
}
