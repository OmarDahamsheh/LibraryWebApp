import { useState, useEffect } from "react"
import BookModel from "../../Models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookPerPage, setBookPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState(""); { /*This to hold the title to be searched*/ }
    const [searchUrl, setSearchUrl] = useState("");
    // const [category, setcategory] = useState("");
    // const [categoryUrl, setCategoryUrl] = useState("");
    const [categorySelection, setCategorySelection] = useState("Book category");


    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:8080/api/books";
            let url: string = "";

            if (searchUrl === "") {
                url = `${baseUrl}?page=${currentPage - 1}&size=${bookPerPage}`;
            } else {
                let SearchWithPage = searchUrl.replace("<pageNumber>", `${currentPage - 1}`);
                url = baseUrl + SearchWithPage;
            }

            // if (categoryUrl === "") {
            //     url = `${baseUrl}?page=${currentPage - 1}&size=${bookPerPage}`;
            // } else {
            //     url = baseUrl + categoryUrl;
            // }



            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseJson = await response.json();

            setTotalAmountOfBooks(responseJson.totalElements);
            setTotalPages(responseJson.totalPages);

            const loadedBooks: BookModel[] = responseJson.content.map((book: any) => ({
                id: book.id,
                author: book.author,
                title: book.title,
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
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]); {/*Change when currentPage OR searchUrl change*/ }


    const paginate = (currentPage: number) => {
        setCurrentPage(currentPage);
    }


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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === "") setSearchUrl("");
        else {
            setSearchUrl(`/search?title=${search}&page=<pageNumber>&size=${bookPerPage}`);
        }
    }

    // const categoryHandleChange = () => {
    //     if (category === "") setCategoryUrl("");
    //     else setCategoryUrl(`/searchByCategory?category=${category}&page=0&size=${bookPerPage}`);
    // }

    const categotyField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === "fe" ||
            value.toLowerCase() === "be" ||
            value.toLowerCase() === "data" ||
            value.toLowerCase() === "devops"
        ) {
            setCategorySelection(value);
            setSearchUrl(`/searchByCategory?category=${value}&page=<pageNumber>&size=${bookPerPage}`);
        } else {
            setCategorySelection("All");
            setSearchUrl(`?page=<pageNumber>&size=${bookPerPage}`);
        }
    }

    const indexOfLastBook: number = currentPage * bookPerPage;
    const indexOfFirstBook: number = indexOfLastBook - bookPerPage;
    let lastItem = indexOfLastBook <= totalAmountOfBooks ? indexOfLastBook : totalAmountOfBooks;

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control me-2"
                                    placeholder="Search" aria-labelledby="Search"
                                    onChange={e => setSearch(e.target.value)} />
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                    type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded='false'>{categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => { categotyField("All") }}><a href="#" className="dropdown-item">All</a></li>
                                    <li onClick={() => { categotyField("fe") }}><a href="#" className="dropdown-item">Front End</a></li>
                                    <li onClick={() => { categotyField("be") }}><a href="#" className="dropdown-item">Back End</a></li>
                                    <li onClick={() => { categotyField("data") }}><a href="#" className="dropdown-item">Data</a></li>
                                    <li onClick={() => { categotyField("devops") }}><a href="#" className="dropdown-item">DevOps</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results:({totalAmountOfBooks})</h5>
                            </div>
                            <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                            {books.map(book => (<SearchBook book={book} key={book.id} />))}
                        </> :
                        <div className="m-5">
                            <h3>Can't find what you are looking for?</h3>
                            <a type="button" href="#" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">Library Services</a>
                        </div>
                    }
                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
                    {/* it means that if totalPages > 1 then call Pagination */}
                </div>
            </div>
        </div>
    );
}