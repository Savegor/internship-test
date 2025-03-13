import React from 'react';
import '../styles/paymentsPagination.sass'

const PaymentsPagination = ({ maxPage, paginate, currentPage }) => {
    const pageNumber = []
    const showPage = []
    for (let i = 1; i <= maxPage; i++) pageNumber.push(i)
    pageNumber.forEach((number, i) => {
        if (number === currentPage)
            showPage.push(
                <div key={i} className='currentPage'>{number}</div>
            )
        else if (number === currentPage + 1 || number === currentPage - 1 || number === 1 || number === maxPage)
            showPage.push(
                <div key={i} onClick={() => paginate(number)}>{number}</div>
            )
        else if ((number === currentPage + 2 || number === currentPage - 2) && number !== 1 && number !== maxPage)
            showPage.push(
                <div key={i}>...</div>
            )
    })
    return (
        <div className='pagination'>
            {showPage}
        </div>
    );
}


export default PaymentsPagination;
