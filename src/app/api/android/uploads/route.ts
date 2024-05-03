import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();

    const file: any = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        );
        return NextResponse.json({ Message: "Success", data: `/uploads/${filename}` });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", });
    }
};