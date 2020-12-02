import React from 'react';
import classNames from 'classnames';
import './styles.css';
type PropsType = {
    onClickItem: (currentPage:number) => void,
    currentPage: number,
    perPage: number,
    countItems:number
}

const Pagination : React.FC < PropsType > = ({currentPage, countItems, perPage, onClickItem}) => {
    const countPages = Math.ceil(countItems / perPage); 
    
    let PaginateItems = [];
    for (let i = 0; i < countPages; i++) {
        const index = i + 1;
        if (i == 0 && currentPage > 1) {
            PaginateItems.push( <div key={"pagination__prev"} className="pagination__prev" onClick={() => onClickItem(currentPage - 1)}>«</div> );
        }

        PaginateItems.push(
            <div key={index+"_"+"pagination"}
                className={ classNames("pagination__item",{"pagination__item--active": currentPage == (index)})}
                onClick={() => currentPage != (index) && onClickItem(index)}>
                {index}
            </div>
        );

        if (i == countPages - 1 && currentPage < countPages) {
            PaginateItems.push( <div key={"pagination__next"} className="pagination__next" onClick={() => onClickItem(currentPage + 1)}>»</div> );
        }
    }

    return (
        <div className="pagination">
            {PaginateItems}
        </div>
    )
}

export default React.memo(Pagination);