import React, { memo, useEffect, useState } from 'react'
import '../styles/PaymentsFilters.sass'
import { Field, FormikProvider, useFormik } from 'formik'

const PaymentsFilters = memo(({ Filter }) => {
    const [filterVisible, setFilterVisible] = useState(true)
    const formik = useFormik({
        initialValues: {
            dateFrom: '',
            dateTo: '',
            numberFrom: '',
            numberTo: '',
            checked: []
        }
        // onSubmit: values => {
        //   alert(JSON.stringify(values, null, 2));
        // },
    });

    useEffect(() => {
        Filter(formik.values)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values])

    useEffect(() => {
        document.querySelector('.BoxFilters').classList.toggle('active')
        document.querySelector('.BoxTitleBtn').classList.toggle('active')
    }, [filterVisible])

    return (
        <FormikProvider value={formik}>
            <div className='Box'>
                <h2 className='BoxTitleBtn' onClick={() => setFilterVisible(!filterVisible)}>Фильтры</h2>
                <div className='BoxFilters'>
                    <div className='topFilter'>
                        <div className='topFilterSum'>
                            <h3>Сумма операции</h3>
                            <div className='topFilterSumContent'>
                                <label htmlFor='numberFrom'>От:
                                    <input id='numberFrom'
                                        name='numberFrom' type='number' placeholder='От'
                                        onChange={formik.handleChange}
                                        value={formik.values.numberFrom} />
                                </label>
                                <label htmlFor='numberTo'>До:
                                    <input id='numberTo'
                                        name='numberTo' type='number' placeholder='До'
                                        onChange={formik.handleChange}
                                        value={formik.values.numberTo} />
                                </label>
                            </div>
                        </div>
                        <div className='topFilterDate'>
                            <h3>Дата</h3>
                            <div className='topFilterDateContent'>
                                <label htmlFor='dateFrom'>От:
                                    <input type='date' name='dateFrom' value={formik.values.dateFrom} onChange={formik.handleChange} />
                                </label>
                                <label htmlFor='dateTo'>До:
                                    <input type='date' name='dateTo' value={formik.values.dateTo} onChange={formik.handleChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='bottomFilter'>
                        <h3>Тип операции</h3>
                        <div className='bottomFilterContent'>
                            <label><Field type='checkbox' name='checked' value='autoUp' />Поднятие</label>
                            <label><Field type='checkbox' name='checked' value='commission' />Комиссия</label>
                            <label><Field type='checkbox' name='checked' value='replenishing' />Пополнение</label>
                            <label><Field type='checkbox' name='checked' value='viewing' />Просмотр</label>
                            <label><Field type='checkbox' name='checked' value='stick' />Прикрепление</label>
                        </div>
                    </div>
                </div>
            </div>
        </FormikProvider>
    )
})

export default PaymentsFilters
