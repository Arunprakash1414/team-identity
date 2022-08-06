import axios from "axios";
import { MOIBIT } from "../config/moibit";


export const apiCalls = async (method, payload, url) => {
    try {
        console.log(MOIBIT.API_URL + url)
        let _response = await axios({
            responseType: url == "readfile" ? "blob" : "json",
            url: MOIBIT.API_URL + url,
            method: method,
            headers: {
                nonce: MOIBIT.NONCE,
                signature: MOIBIT.SIGNATURE,
                developerKey: MOIBIT.DEV_ADDRESS,
                networkID: MOIBIT.NETWORK_ID
            },
            data: payload
        });

        return _response.data;
    }
    catch (err) {
        if (err?.response) {
            return err?.response?.data
        } else {
            return err?.message
        }
    }
}