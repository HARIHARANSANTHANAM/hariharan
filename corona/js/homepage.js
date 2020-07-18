
var globalvalue;//this one is
var ctx=document.getElementById('mychart').getContext('2d');//line chart element
var data1={
  recovered:[],
  deaths:[],
  Confirmed:[],
  Date:[]  
};
var doughnutchart={
  TotalRecover:"",
  TotalDeath:"",
  TotalConfirm:""
}
 
var doughnut__chart,myLineChart,bar_chart_Display;
var countries=[];




async function Async__Api__Call(ApiUrl) //api call with asyndata 
{
  let response = await fetch(ApiUrl);
  let data = await response.json()
  return data;
}

function AddInfo_To_Chart(country)//starting of the AddInfo_To_Chart();
{
  console.log(country);
  var countryName=country;
  var Api_URL="https://api-corona.azurewebsites.net/timeline/"+countryName;
  Async__Api__Call(Api_URL)
  .then(result => 
  {
    var i=0,j=0;
    var len=result.length;
     const timeline=result.map(result=>{
      if((len*(15/16))<i)// you can change the number but the numerator must be smaller than the denominator
      {
        //This condition will get the all data of recovered,etc.. of last 15 days and store it in a object named data1
       data1.recovered[j]=parseInt(`${result.Recovered}`);
       data1.deaths[j]=parseInt(`${result.Deaths}`);
       data1.Date[j]=`${result.Date}`;
        data1.Confirmed[j]=parseInt(`${result.Confirmed}`);
        j++;
      }
      i++;
      });
// function numberWithCommas(n) {
//     var parts=n.toString().split(".");
//     return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
//to display the confirmed,recovered and deaths in the Card
    var confirmed=document.getElementById("confirmcount");
    var death=document.getElementById("deathcount");
    var recover=document.getElementById("recovercount");
    var date=document.querySelectorAll(".date");
    for(var i=0;i<date.length;i++)
    date[i].innerHTML=data1.Date[data1.recovered.length-1];

   recover.innerHTML=data1.recovered[data1.recovered.length-1];
   confirmed.innerHTML=data1.Confirmed[data1.recovered.length-1];
   death.innerHTML=data1.deaths[data1.recovered.length-1];


//It is for displaying the line chart
Chart.defaults.global.defaultFontColor = 'grey'; ///default  font color for all the chart is grey

        myLineChart = new Chart(ctx, {
    type: 'line',
    responsive:true,
      data: {
    labels: data1.Date,
    datasets: [{
      label: 'Recovered',
      data:data1.recovered,
              borderColor: "#3e95cd",
              fill:false,
              pointRadius:1,
              showLine:true,
    },
      {label:'died',
      data:data1.deaths,
             borderColor: "#E7717D",
fill:false,
              pointRadius:1,
              showLine:true,

    },
  {label:'Confirmed',
      data:data1.Confirmed,
        borderColor: "#3cba9f",
fill:false,

              pointRadius:1,
              showLine:true,

    }


    ]
  },
    options:{   
      responsive:true,
      maintainAspectRatio:false,
     title: {
      display: true,
      text: 'Total No Of Corona Cases Around India'
    }
}
});
//It is for displaying the Barchart
  bar_chart_Display=new Chart(document.getElementById("bar-chart-grouped"), {
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
          backgroundColor: "#E7717D",
          data: data1.deaths
        },{
          label: "Confirmed",
          backgroundColor: "#3cba9f",
          data: data1.Confirmed
        }
      ]
    },
    options: {
      responsive:true,
      maintainAspectRatio:false,
      title: {
        display: true,
        text: '',
      }
    }
});


    })
  .catch(error => console.log('error', error));


//It is for Displaying The doughnut chart
var CountryName__Summary;
Async__Api__Call(`https://api.covid19api.com/summary`)
  .then(result => {
     var country_Info=result.Countries;
     const Country__Summary=country_Info.map(country=>{
       if(country.Country==countryName)
       {
         doughnutchart.TotalRecover=country.TotalRecovered;
         doughnutchart.TotalDeath=country.TotalDeaths;
         doughnutchart.TotalConfirm=country.TotalConfirmed
       }
     });
    doughnut__chart=new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Recovered", "Deaths", "Confirmed"],
      datasets: [
        {
          label: "",
          backgroundColor: ["#3e95cd", "#E7717D","#3cba9f"],
          data: [doughnutchart.TotalRecover,doughnutchart.TotalDeath,doughnutchart.TotalConfirm]
        }
      ]
    },   
    options: {    
      responsive:true,
      maintainAspectRatio:false,
      title: {
        display: true,
        text: 'Corona Test-Cases'
      }
    }
});  
  })
  .catch(error => console.log('error', error));

}//end of AddInfo_To_Chart(); 

 


//this one will Load the Select Component when the file is loaded into the browser
 $(document).ready(function() {  
        $('.materialSelect').formSelect();
  $('.materialSelect').on('contentChanged', function() {
    $(this).formSelect();
  });
//For getting the country Name and storing in select Option
   Async__Api__Call(`https://api.covid19api.com/summary`)
  .then(data => {
      const countrydata=data.Countries.map(result=>{
      var options=result.Country;
      var newValue = options;
    var $newOpt = $("<option>").attr("value",newValue).text(newValue)
    $("#myDropdown").append($newOpt);
    $("#myDropdown").trigger('contentChanged');

    })
    
  }).catch(error => console.log('error', error));
AddInfo_To_Chart("India");

});
 





//It is Used when the Country in the select Option is changed
 $("#myDropdown").change(function() {

  if(bar_chart_Display!="undefined"){
   bar_chart_Display.destroy();
   myLineChart.destroy();
   doughnut__chart.destroy();
 AddInfo_To_Chart($("#myDropdown").val());
}
});
