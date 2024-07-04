
import Link from "next/link";
import { MobileMenu } from "@/c.widgets/components/mobile-menu";

export function Navbar() {
  return (
    <div className=''>
        <div className=''>
          <Link href="/">NFAPSOCIAL</Link>
        </div>
        <div className='hidden'></div>
        <div>
          <MobileMenu />
        </div>
    </div>
  )
}
