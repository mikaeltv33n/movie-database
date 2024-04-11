import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faTicket, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className='fixed bottom-0 flex justify-around items-center w-full border bg-white py-4'>
            <Link href="/">
                <FontAwesomeIcon icon={faVideo} className='text-black' />
            </Link>
            <Link href="/">
                <FontAwesomeIcon className='rotate-90 text-black' icon={faTicket} />
            </Link>
            <Link href="/bookmark">
                <FontAwesomeIcon icon={faBookmark} className='text-black' />
            </Link>
        </nav>
    );
}
