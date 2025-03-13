import React from 'react'
import { Chart } from 'react-google-charts';


const MyChart = ({ dataChart }) => {
    const data = [
        ['Task', 'Hours per Day'],
        ['Комиссия', -1*dataChart()['commission']],
        ['Просмотр', -1*dataChart()['viewing']],
        ['Прикрепление', -1*dataChart()['stick']],
        ['Поднятие', -1*dataChart()['autoUp']]
    ];
    const options = {
        title: 'Процентное соотношение трат по услугам',
    };
    return (
        <>
             <Chart
                 chartType='PieChart'
                 data={data}
                 options={options}
                 width={'100%'}
                 height={'700px'}
             />
        </>
    );
}

export default MyChart;
