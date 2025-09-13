import { Carousel } from "./Components/Carousel";
import { ExploreTopBox } from "./Components/ExploreTopBooks";
import { Heros } from "./Components/Heros";
import { LibraryServices } from "./Components/LibraryServices";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBox />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    );
}