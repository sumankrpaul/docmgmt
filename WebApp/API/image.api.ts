import { privateInstance } from "./common";

export const getStoerdFile = async (id: string)=>{
    try {
        const response = await privateInstance.get(`/files/stored_file/${id}`, { responseType: 'blob' });
        const imageURL = URL.createObjectURL(response.data)
        return imageURL;
    } catch (err){
        throw err as { message: string };
    }
}