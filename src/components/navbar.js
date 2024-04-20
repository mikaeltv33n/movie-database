import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faTicket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className='fixed bottom-0 flex justify-around items-center w-full border bg-white py-4'>
            <Link href="/">
                <FontAwesomeIcon icon={faVideo} className='text-black' />
            </Link>
            <Link href="/moviesearch">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-black' />
            </Link>
            <Link href="/signin">
                <FontAwesomeIcon className='rotate-90 text-black' icon={faTicket} />
            </Link>
            <Link href="/bookmark">
                <FontAwesomeIcon icon={farBookmark} className='text-black' />
            </Link>
        </nav>
    );
}
