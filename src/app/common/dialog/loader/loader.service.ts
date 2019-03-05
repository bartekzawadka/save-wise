import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loading;
    private isVisible = false;

    constructor(private loadingController: LoadingController) {
    }

    async present() {
        if (this.isVisible) {
            await this.loading.dismiss();
        }

        this.loading = await this.loadingController.create();
        await this.loading.present();
        this.isVisible = true;
    }

    async close() {
        await this.loading.dismiss();
        this.isVisible = false;
    }

    async runAsync<T>(promise: () => Promise<T>) {
        await this.present();
        try {
            return await promise();
        }
        finally {
            await this.close();
        }


        // let me = this;
        //
        // return new Promise<T>((resolve, reject) => {
        //     me.present()
        //         .then(() => {
        //             promise().then((data) => {
        //                 me.close().then(() => resolve(data))
        //                     .catch(e => {
        //                         console.log(e);
        //                         resolve(data);
        //                     });
        //             })
        //                 .catch(reject);
        //         })
        //         .catch(reject);
        // })
    }
}
