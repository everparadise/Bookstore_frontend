import {useState} from "react";
import {BookManagementList} from "../../components/bookManagement/bookManagementList";
import {SearchAndPageContainer} from "../../components/homepage/bookCards";

export function BookManagement() {
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(1);
    const [value, setValue] = useState("");

    function searchHandler(searchTarget) {
        setValue(searchTarget);
    }


    return (
        <div className="home">
            <SearchAndPageContainer page={page} setPage={setPage} totalElements={totalElements}
                                    searchHandler={searchHandler}>
                <BookManagementList page={page} setPage={setPage} value={value} setTotalElements={setTotalElements}
                                    totalElements={totalElements}></BookManagementList>
            </SearchAndPageContainer>
        </div>
    )
}