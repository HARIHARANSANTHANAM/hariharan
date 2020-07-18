function opac()
	{
		document.querySelector('body').style.opacity=1;
	}
	document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
	 $(document).ready(function(){
    $('.sidenav').sidenav();
        $('.collapsible').collapsible();

  });

      var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
//FETCH THE API FOR DISPLAYING THE CHART
const h2=document.querySelector("#h2");
//fetch the api for recovered,diseased,active count
var rcount=document.querySelector('#rcount');
var rcounts=document.querySelector('#rcounts');
var ccount=document.querySelector("#ccount");
var ccounts=document.querySelector('#ccounts');
var ddcount=document.querySelector('#ddcount');
var ddcounts=document.querySelector('#ddcounts');
 var globalvalue;
function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

   
var ctx=document.getElementById('mychart').getContext('2d');
var data1={
  recovered:[],
  deaths:[],
  Confirmed:[],
  Date:[]  
};
function addRowstoLinechart(){
fetch("https://api-corona.azurewebsites.net/timeline/India", requestOptions)
  .then(response => response.json())
  .then(result => 
  {
    var i=0,j=0;
    console.log(result);
    var len=result.length;
     const timeline=result.map(result=>{
      if((len*(7/8))<i){
        //console.log("i:"+i+" ,"+len)
       data1.recovered[j]=parseInt(`${result.Recovered}`);
       data1.deaths[j]=parseInt(`${result.Deaths}`);
       data1.Date[j]=`${result.Date}`;
        data1.Confirmed[j]=parseInt(`${result.Confirmed}`);
        j++;
      }
      i++;
      });
          var myLineChart = new Chart(ctx, {
    type: 'line',
      data: {
    labels: data1.Date,
    datasets: [{
      label: 'Recovered',
      data:data1.recovered,
              borderColor: "#3e95cd",
              fill:false,
              pointRadius:1,
              showLine:true
    },
      {label:'died',
      data:data1.deaths,
             borderColor: "#8e5ea2",
fill:false,
              pointRadius:1,
              showLine:true
    },
  {label:'Confirmed',
      data:data1.Confirmed,
        borderColor: "#3cba9f",
fill:false,

              pointRadius:1,
              showLine:true
    }


    ]
  },
    options:{    title: {
      display: true,
      text: 'Total No Of Corona Cases Around India'
    }
}
});



fetch("https://api.covid19api.com/summary", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
     globalvalue=result.Global;
    ccount.innerHTML="+"+thousands_separators(globalvalue.NewConfirmed);
    ccounts.innerHTML=thousands_separators(globalvalue.TotalConfirmed);

    ddcount.innerHTML="+"+thousands_separators(globalvalue.NewDeaths);
    ddcounts.innerHTML=thousands_separators(globalvalue.TotalDeaths);

    rcount.innerHTML="+"+thousands_separators(globalvalue.NewRecovered);
    rcounts.innerHTML=thousands_separators(globalvalue.TotalRecovered);
    new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Recovered", "Deaths", "Confirmed"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [globalvalue.TotalRecovered,globalvalue.TotalDeaths,globalvalue.TotalConfirmed]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});  
  })
  .catch(error => console.log('error', error));




//india map
new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: data1.Date,
      datasets: [
        {
          label: "Recovered",
          backgroundColor: "#3e95cd",
          data:data1.recovered
        }, {
          label: "Death",
          backgroundColor: "#8e5ea2",
          data: data1.deaths
        },{
          label: "Confirmed",
          backgroundColor: "#3cba9f",
          data: data1.Confirmed
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: ''
      }
    }
});



   }
  )
  .catch(error => console.log('error', error));
 
        }

    addRowstoLinechart();



    var data = [
    ['in-py', 0],
    ['in-ld', 1],
    ['in-wb', 2],
    ['in-or', 3],
    ['in-br', 4],
    ['in-sk', 5],
    ['in-ct', 6],
    ['in-tn', 7],
    ['in-mp', 8],
    ['in-2984', 9],
    ['in-ga', 10],
    ['in-nl', 11],
    ['in-mn', 12],
    ['in-ar', 13],
    ['in-mz', 14],
    ['in-tr', 15],
    ['in-3464', 16],
    ['in-dl', 17],
    ['in-hr', 18],
    ['in-ch', 19],
    ['in-hp', 20],
    ['in-jk', 21],
    ['in-kl', 22],
    ['in-ka', 23],
    ['in-dn', 24],
    ['in-mh', 25],
    ['in-as', 26],
    ['in-ap', 27],
    ['in-ml', 28],
    ['in-pb', 29],
    ['in-rj', 30],
    ['in-up', 31],
    ['in-ut', 32],
    ['in-jh', 33]
];

// Create the chart
Highcharts.mapChart('map', {
    chart: {
        map: 'countries/in/in-all'
    },

    title: {
        text: 'Indian Map'
    },

    subtitle: {
        text: ''
    },

    mapNavigation: {
        enabled:false,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min:0,
        max:100
    },

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#3cba9f'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});


