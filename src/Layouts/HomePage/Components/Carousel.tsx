import { ReturnBook } from "./ReturnBook";
import { useState, useEffect } from "react";
import BookModel from "../../../Models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]); //between <> we put the type of the useState (optional)
    const [isLoading, setIsLoading] = useState(true); //this is the a Loading sign, and initilize to true.
    const [httpError, setHttpError] = useState(null); //this if the API fails.

    /*useEffect(() => {}, [])*/  /* it will be recalled each time the array inside change*/

    useEffect(() => {
        const fetchBooks = async () => { //function of type async, used to wait for promises (like data from an API) to complete.

            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            // const loadedBooks: BookModel[] = 



            const loadedBooks: BookModel[] = responseJson.content.map((book: any) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                description: book.description,
                copies: book.copies,
                copies_available: book.copiesAvailable,
                category: book.category,
                img: book.img
            }));


            setBooks(loadedBooks);
            setIsLoading(false);

        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [])

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed too late reading" book.</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5
            d-none d-lg-block" data-bs-interval="false">
                {/* Desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0, 3).map(book => (<ReturnBook book={book} key={book.id} />))}
                        </div>
                    </div> <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(3, 6).map(book => (<ReturnBook book={book} key={book.id} />))}
                        </div>
                    </div> <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(6, 9).map(book => (<ReturnBook book={book} key={book.id} />))}
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide='prev'>
                    <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide='next'>
                    <span className="carousel-control-next-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <a className="btn btn-outline-secondary btn-lg" href="#">View More</a>
            </div>
        </div>
    );

}