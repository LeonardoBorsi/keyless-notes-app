import Image from 'next/image'
import Link from 'next/link'

export default function BackButton() {
  return (
    <Link href="/" className="flex hover:underline py-4 w-fit">
      <Image
        src="/back-icon.png"
        width={25}
        height={20}
        alt="Back Icon"
      />
      <span className="ml-2">
        Back to all notes
      </span>
    </Link>
  )
}
