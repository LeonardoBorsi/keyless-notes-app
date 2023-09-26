import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex justify-center py-8'>
      <Link href="/">
        <Image
          src="/logo.png"
          width={120}
          height={40}
          alt="Notes Logo"
        />
      </Link>
    </div>
  )
}
