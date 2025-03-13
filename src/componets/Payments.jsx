import React, { memo, useEffect, useState } from 'react';
import '../styles/payments.sass'

const Months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
]

const Payments  = memo(({ payments, sortAllPayments }) => {
    const [timeVisible, setTimeVisible] = useState(true)
    let renderPayment = []
    let nowDay = 0
    let nowMonth = 0

    useEffect(() => {
        document.querySelector('.timeTitle').classList.toggle('active')
    }, [timeVisible])

    payments.forEach((payment, id) => {
        const date = new Date(payment.date)
        const hours = date.getHours() // 17
        const minutes = String(date.getMinutes()) // 48
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        if ((nowDay !== day) || (nowMonth !== month)) {
            nowDay = day
            nowMonth = month
            const trTitle = (
                <tr className='DayMonth' key={id}>
                    <th colSpan="3">{nowDay} {Months[nowMonth - 1]}<span className='DayMonthYear'>{year} года</span></th>
                    <th colSpan="3"></th>
                    <th colSpan="3"></th>
                </tr>
            )
            renderPayment.push(trTitle)
        }
        const show = (
            <tr className='payment' key={payment.id}>
                <td className="time">{hours}:{minutes.length === 1 ? "0" + minutes : minutes}</td>
                <td className='description'>{payment.description}</td>
                <td className='sum'>{payment.sum}</td>
            </tr>
        )
        renderPayment.push(show)
    })

    return (
        <table>
            <thead>
                <tr>
                    <th className='timeTitle' onClick={() => {
                        setTimeVisible(!timeVisible)
                        sortAllPayments()
                    }}>Время</th>
                    <th>Описание</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {renderPayment}
            </tbody>
        </table >
    );
})

export default Payments;