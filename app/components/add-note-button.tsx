import Image from 'next/image'
import Link from 'next/link'

export default function AddNoteButton() {
  return (
    <div className="fixed bottom-10 left-0 right-0 grid place-items-center ">
      <Link href="/add-note">
        <button className="rounded-full bg-yellow-400 text-black px-4 py-4 drop-shadow-xl flex items-center justify-between hover:bg-yellow-300">
          <Image
            src="/add-icon.png"
            width={25}
            height={25}
            alt="Add Note Icon"
          />
          <span className="px-10 font-semibold text-base">
            Add New Note
          </span>
        </button>
      </Link>
    </div>
  )
}
