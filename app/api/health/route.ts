import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    
    // Try to connect to database
    let dbConnected = false;
    let dbError = null;
    
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      dbConnected = true;
    } catch (error) {
      dbError = error instanceof Error ? error.message : String(error);
      console.error("Database connection error:", dbError);
    } finally {
      await prisma.$disconnect();
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        urlSet: hasDatabaseUrl,
        connected: dbConnected,
        error: dbError,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

