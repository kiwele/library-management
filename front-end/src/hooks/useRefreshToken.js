import axios from "../axios"
import useAuth from "./useAuth";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/";

function useRefreshToken() {
    
    // const { setAuth } = useAuth()  
    console.log('here now')

    
    const refresh = async () => {
        const response = await axios.get(`${BASE_URL}/token`, {
            withCredentials: true
        });
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useAuth().setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            console.log(response.data.accessToken);
            return { ...prev, role:response.data.role, accessToken:response.data.accessToken}
        });
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken;
