let url = 'http://127.0.0.1:5000/internet_access/';

let categories = ['Internet Access', 'No Internet Access', 'Paid Extra Classes', 'No Paid Extra Classes',
  'Extracurricular Activities', 'No Extracurricular Activities', 'Internet Access and Paid Extra Classes', 
  'No Internet and No Paid Extra Classes', 'Internet Access and No Paid Extra Classes', 
  'No Internet Access and Paid Extra Classes', 'Internet Access and Extracurricular Activities', 
  'No Internet and No Extracurricular Activities', 'Internet Access and No Extracurricular Activities', 
  'No Internet Access and Extracurricular Activities'
];

let studentData = fetch(url).then((response) => response.json())



