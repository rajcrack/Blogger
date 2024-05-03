import { UploadFunction } from "@/lib/_secured/Upload";
import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";



export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const file: any = formData.get("file");
        const blobData = await UploadFunction({ fileName: (file as File).name, body: file });
        return NextResponse.json({ file: blobData.url, message: "file stored successfully" });



        // if (!file) {
        //     return NextResponse.json({ error: "No files received." }, { status: 400 });
        // }

        // const buffer = Buffer.from(await file.arrayBuffer());
        // const filename = Date.now() + file.name.replaceAll(" ", "_");
        // console.log(filename);
        // try {
        //     writeFile(
        //         path.join(process.cwd(), "public/uploads/" + filename),
        //         buffer, () => { }
        //     );
        //     return NextResponse.json({ Message: "Success", data: `/uploads/${filename}` });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", });
    }
};