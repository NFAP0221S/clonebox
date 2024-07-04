
import Link from "next/link";
import { MobileMenu } from "@/c.widgets/components/mobile-menu";

export function Navbar() {
  return (
    <div className='h-24 flex items-center justify-between'>
        <div className=''>
          <Link href="/" className="font-bold text-xl text-blue-600">NFAPSOCIAL</Link>
        </div>
        <div className='hidden'></div>
        <div>
          <MobileMenu />
        </div>
    </div>
  )
}
