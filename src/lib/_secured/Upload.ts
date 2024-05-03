import { put } from '@vercel/blob';
export const UploadFunction = async ({ fileName, body }: { fileName: string, body: any }) => {

    const blob = await put(fileName, body, {
        access: "public",
        token: "vercel_blob_rw_NYEBw6zbetfRPIEo_e9q6h9pepyFG5zBjmjsaebf0AWOKF8"
    });

    return blob;
}