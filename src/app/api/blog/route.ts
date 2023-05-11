import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, msg } = (await req.json()) as {
      name: string;
      msg: string;
    };
    

    const blg = await prisma.blog.create({
      data: {
        name,
        msg,
      },
    });

    return NextResponse.json({
      blog: {
        name: blg.name,
        msg: blg.msg,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
