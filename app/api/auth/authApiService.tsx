import ApiConfig from "../base/apiConfig";

class AuthAPIService {
    async loginUser(email: string, password: string) {

        return await ApiConfig.post("/auth/login", { email, password });
    }

    async signup(email: string, name: string, password: string, address: string) {
        try {
            return await ApiConfig.post("/auth/create", { name, password, address, email });
        } catch (error) {
            return null;
        }
    }
}
export default new AuthAPIService();
