import * as msal from '@azure/msal-browser';
import { IUser } from '../models/IUser';
import UserContext from '../components/UserContext';

const clientConfig: msal.Configuration = {
    auth: {
        clientId: "a525ce98-45fd-4e8c-99a3-1f39577924b3",
        authority: "https://login.microsoftonline.com/9970d0c1-ca9f-4f76-9db8-50ed9b1e0d4c",
        redirectUri:"https://5d99-202-140-236-1.ngrok-free.app/Login"
    }
};

export class UserService {
    constructor() { }

    pca: msal.PublicClientApplication = new msal.PublicClientApplication(clientConfig);


    public async Login(): Promise<IUser> {

        await this.pca.handleRedirectPromise();
        
        let accounts = await this.pca.getAllAccounts();
        
        if(accounts.length===0){
            await this.pca.loginRedirect();
        }
        
        return Promise.resolve({
            name: accounts[0]?.name!,
            id: accounts[0]?.localAccountId!,
            email: accounts[0].username
        });

     }
}

