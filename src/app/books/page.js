"use client"

import BookForm from "@/components/bookform"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import { createBook, getBooks, deleteBook, getBook } from "@/actions/books"

export default function Books() {
    const [books, setBooks] = useState([])
    const [book, setBook] = useState({})
    const [formState, formAction] = useFormState(createBook)

    const dialogRef = useRef(null)

    async function editHandler(event) {
        setBook(await getBook(event.target.dataset.id))
        dialogRef.current.showModal()
    }

    async function deleteHandler(event) {
        if (confirm("Are you sure you want to delete this book?")) {
            await deleteBook(event.target.dataset.id)
            setBooks(await getBooks())
        }
    }

    useEffect(function () {
        getBooks().then(books => setBooks(books))
    }, [formState])

    return (
        <>
            <h1 className="text-3xl">Books</h1>
            <BookForm formAction={formAction} formState={formState} />
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        {book.Title} by {book.Author}
                        <button data-id={book._id} onClick={editHandler}  className="bg-blue-500 text-white font-semibold uppercase px-4 py-2 rounded-full">
                            Edit
                        </button>
                        <button data-id={book._id} onClick={deleteHandler} className="bg-red-500 text-white font-semibold uppercase px-4 py-2 rounded-full">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <dialog ref={dialogRef} className="h-[12rem] w-[20rem] py-4 px-6 rounded-md backdrop:bg-white/55 backdrop:backdrop-blur-md">
                <h3>Hej</h3>
                <BookForm data={book} />
                <button onClick={() => dialogRef.current.close()}>Cancel</button>
            </dialog>
        </>
    )
}
