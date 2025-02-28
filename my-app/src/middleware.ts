// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// // import { getSession } from "@/lib/auth"; // Replace with your session management function

// export async function middleware(request: NextRequest) {
// //   const session = await getSession();

//   // Redirect unauthenticated users to the login page
//   if (!session && !request.nextUrl.pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // Allow authenticated users to access the portal and dashboard
//   return NextResponse.next();
// }

// // Apply middleware to specific routes
// export const config = {
//   matcher: ["/portal", "/dashboard", "/loans", "/contributions"],
// };


// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//     // Your middleware logic here
//     return NextResponse.next();
// }

// // Optionally, specify config
// export const config = {
//     matcher: '/api/:path*', // Adjust as needed
// };




// import getOrCreateDB from '@/models/server/db'
// import getOrCreateStorage from '@/models/server/storageSetup'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'




// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  await Promise.all([
    // getOrCreateDB(),
    // getOrCreateStorage()
  ])
  
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  /* match all request paths except for the the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}



