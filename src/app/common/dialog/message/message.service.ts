import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private alertController: AlertController) { }

  async showMessage(message: string, title: string = "Błąd", subtitle: string = ""){
    const data = {
      buttons: ['OK'],
      message: message,
      header: title
    };

    if(subtitle){
      data["subHeader"] = subtitle;
    }

    const alert = await this.alertController.create(data);
    await alert.present();
  }
}
