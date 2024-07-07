
import React from "react";
import { Navbar } from "@/c.widgets/components/navbar";

export function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
        <div className='w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
          <Navbar />
        </div>
        <div className='bg-slate-100 px-4 md:px-8 lg:px-16 xl-px-32 2xl:px-64'>
          {children}
        </div>
    </React.Fragment>
  );
}