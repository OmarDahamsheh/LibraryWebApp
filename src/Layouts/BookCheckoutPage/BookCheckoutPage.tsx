import { useEffect, useState } from "react";
import BookModel from "../../Models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { json } from "stream/consumers";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();

            const loadedBook: BookModel = responseJson;
            // const loadedBook: BookModel = {
            //     id: responseJson.id,
            //     title: responseJson.title,
            //     author: responseJson.author,
            //     description: responseJson.description,
            //     copies_available: responseJson.copiesAvailable,
            //     category: responseJson.category,
            //     img: responseJson.img
            // };
            setBook(loadedBook);
            setIsLoading(false);

        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);


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
        <div className="container d-none d-lg-block">
            <div className="row mt-5">

                <div className="col-sm-2 col-md-2">
                    {book?.img
                        ?
                        <img src={book?.img} width='226' height='349' alt="book" />
                        :
                        <img src={ require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt="book" />
                        }
                </div>
                <div className="col-4 col-md-4 container">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{ book?.description}</p>
                    </div>
                </div>
                <hr />
                {/* <div className="col-12 col-md-8">
                    <div className="row mt-3 me-5">
                        <div className="col-md-3 text-center">
                            <img src={book?.img} width='151' height='233' alt="book" />
                        </div>
                        <div className="col-md-7">
                            <div className="text-center">
                                <h4 className="mt-2">{book?.title}</h4>
                                <h6 className="text-primary">{book?.author}</h6>
                                <p>{book?.description}</p>
                            </div>
                        </div>

                    </div>
                </div> */}


                {/* <div className="col-12 col-6 col-md-4">
                    <div className="card mt-5" style={{ width: "25rem" }}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                        </ul>
                    </div>
                </div> */}
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img
                        ?
                        <img src={book?.img} width='226' height='349' alt="book" />
                        :
                        <img src={ require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt="book" />
                        }
                </div>
                <div className="mt4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{ book?.description}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12"> </div>
            </div>
        </div>
    );
}