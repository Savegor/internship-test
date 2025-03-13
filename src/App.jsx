import { useCallback, useEffect, useState } from 'react'
import { getData } from './api/api'
import './styles/app.sass'
import Payments from './componets/Payments'
import PaymentsPagination from './componets/PaymentsPagination'
import PaymentsFilters from './componets/PaymentsFilters'
import Loading from './componets/loading'
import MyChart from './componets/MyChart'


function App() {
  const [AllPayments, setAllPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Текущая страница
  const [paymentsPerPage] = useState(15)  // Количество страниц показываемых разом
  const [descendingAscending, setDescendingAscending] = useState(true)
  const [showPayments, setShowPayments] = useState([]) // Показываемые данные

  useEffect(() => { // Получение данных
    setLoading(true)
    getData().then((response) => {
      setAllPayments(response.data)
      setShowPayments(response.data)
      setLoading(false)
    })
      .catch((error) => {
        console.error('Ошибка:', error.message)
      });
  }, [])

  const lastPaymentsIndex = currentPage * paymentsPerPage
  const firstPaymentsIndex = lastPaymentsIndex - paymentsPerPage
  const currentPayments = showPayments.slice(firstPaymentsIndex, lastPaymentsIndex)
  const maxPage = Math.ceil(showPayments.length / paymentsPerPage)

  const sortAllPayments = () => { // Сортировка по времени 
    if (descendingAscending) {
      setShowPayments(showPayments.sort((a, b) =>
        new Date(a.date) - new Date(b.date)))
      setDescendingAscending(false)
    } else {
      setShowPayments(showPayments.sort((a, b) =>
        new Date(b.date) - new Date(a.date)))
      setDescendingAscending(true)
    }
  }

  const Filter = (data) => {
    let newArray = AllPayments.filter(e => {
      const isDate = (data.dateFrom === '' || data.dateTo === '') || (new Date(e.date) >= new Date(data.dateFrom) && (new Date(e.date) <= new Date(data.dateTo)))
      const isSum = (data.numberFrom === '' || data.numberTo === '') || (e.sum >= data.numberFrom && e.sum <= data.numberTo)
      const isChecked = data.checked.length === 0 || data.checked.some(elem => e.transactionType === elem)
      return isDate && isSum && isChecked
    })
    setShowPayments(newArray)
  }

  const paginate = pageNumber => setCurrentPage(pageNumber) // Функции изменения страниц
  const nextPage = () => {
    if (currentPage === maxPage) return 0
    setCurrentPage(prev => prev + 1)
  }
  const prevPage = () => {
    if (currentPage === 1) return 0
    setCurrentPage(prev => prev - 1)
  }

  const dataChart = useCallback(() => {
    const dataChartShowData = {
      'autoUp': 0,
      'commission': 0,
      'viewing': 0,
      'stick': 0,
      'replenishing': 0
    }
    showPayments.forEach(e => {
      dataChartShowData[e.transactionType] += e.sum
    })
    return dataChartShowData
  }, [showPayments])

  return (
    <div className="App">
      <div className='content'>
        <h1 className='title'>Платежи</h1>
        {
          <PaymentsFilters Filter={Filter} />
        }
        <div className='paginations'>
          <button className='btn btnPrev' onClick={() => prevPage()} />
          {
            <PaymentsPagination maxPage={maxPage}
              paginate={paginate}
              currentPage={currentPage} />
          }
          <button className='btn btnNext' onClick={() => nextPage()} />
        </div>
        {
          loading ? <Loading /> : <Payments payments={currentPayments} sortAllPayments={sortAllPayments} />
        }
      </div>
        <MyChart dataChart = {dataChart}/>
    </div>
  );
}

export default App
