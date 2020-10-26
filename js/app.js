$(document).ready(function () {

    var ctx1 = document.getElementById('myChart1').getContext('2d');
    var chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: '#007bff',
                borderColor: '#ffc107',
                data: [0, 10, 5, 2, 20, 30, 45],
                hoverBackgroundColor: '#0000ff'
            }]
        },

        // Configuration options go here
        options: {
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    });

    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Minnesota', 'Illinois', 'Wisconsin', 'Iowa', 'North Dakota', 'South Dakota'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#007bff',
                borderColor: '#ffc107',
                borderWidth: 3,
                hoverBackgroundColor: '#0000ff'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                duration: 4000,
                easing: 'linear'
            }
        }
    });

    // var testData = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [{
    //         fillColor: "#ffc107",
    //         strokeColor: "#ACC26D",
    //         pointColor: "#fff",
    //         pointStrokeColor: "#9DB86D",
    //         data: [203, 156, 99, 251, 305, 247]
    //     }]
    // }
    // var ctx3 = document.getElementById('myChart3').getContext('2d');
    // new Chart(ctx3).Line(testData);
    const xLabels = [];
    const yTemps = [];
    chartInit();
    async function chartInit() {
        await getData();
        const ctx3 = document.getElementById('myChart3').getContext('2d');
        
        const chart3 = new Chart(ctx3, {
           // type: 'bar', //try line and add fill false
            type: 'line', //try bar
            data: {
                labels: xLabels,
                datasets: [{
                    label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',//option shift 8 for degree symbol
                    data: yTemps,
                    backgroundColor: '#007bff',
                    borderColor: '#ffc107',
                    borderWidth: 0.5,
                    hoverBackgroundColor: '#0000ff'
                    ,fill: false //if line remove to test
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a ° sign in the ticks
                            callback: function(value, index, values) {
                                return value + '°';
                            }
                        }
                    }]
                },
                animation: {
                    duration: 4000,
                    easing: 'linear'
                }
            }
        });
        console.log(chart2.canvas);
    }
   
    async function getData() {
        //const response = await fetch('js/test.csv');
        const response = await fetch('data/test2.csv');
        const data = await response.text();
        //console.log(data);
        const table = data.split('\n').slice(1);
        //console.log(table);
        table.forEach(row => {
            //console.log(row);
            const columns = row.split(',');
            const year = columns[0];
            xLabels.push(year); //add after creating new chart
            const temp = columns[1];
            yTemps.push(parseFloat(temp) + 14); //add after creating new chart, temp is a string, so parseFloat converts
            //yTemps.push(temp); //add after creating new chart
            //console.log(year, temp);
        });
    }

}); //jQuery document ready ends here