import {userService} from "./UserService";

class Service {
    getRequestConfig() {
        let headers = {};

        if(userService.isAuthenticated()){
            let userInfo = JSON.parse(userService.getUserInfo());
            headers["Authorization"] = "Bearer " + userInfo.token;
        }

        return {
            headers: headers
        };
    }
}

export default Service;
