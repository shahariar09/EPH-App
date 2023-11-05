import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataAnalysisService } from './service/data-analysis.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile: any;
  ProcessedData: any = [];
  selectedItem: any

  carPayment
  grossMonthlyIncome
  monthlyMortgagePayment
  creditCardPayment
  appraisedValue
  loanAmount

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  barChartData: any;

  barChartLabels: any
  public barChartLegend = true;
  barChartLabelsApproved: any;
  barChartLabelsNotApproved: any;
  attributeList: any = [
    "GrossMonthlyIncome",
    "CreditCardPayment",
    "CarPayment",
    "StudentLoanPayments",
    "AppraisedValue",
    "DownPayment",
    "LoanAmount",
    "MonthlyMortgagePayment",
    "CreditScore"

  ]
  criteriaForm: FormGroup;
  minLoanAmount: any;
  maxLoanAmount: number;
  minappraisedValue: number;
  maxappraisedValue: number;
  mincreditCardPayment: number;
  maxcreditCardPayment: number;
  minMonthlyMortgagePayment: number;
  maxMonthlyMortgagePayment: number;
  maxgrossMonthlyIncome: number;
  mingrossMonthlyIncome: number;
  minCarPayment: number;
  maxCarPayment: number;
  ResultProcessedData: any;

  constructor(
    private service: DataAnalysisService,
    private formBuilder: FormBuilder
  ) {

    this.criteriaForm = this.formBuilder.group({
      attribute: [''],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];


  }


  uploadCsv(): void {
    if (!this.selectedFile) {
      return;
    }


    const file: File = this.selectedFile;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.service.uploadCsvFile(file).subscribe(
      (data) => {
        console.log(data);
        this.ResultProcessedData = data;
        this.ProcessedData = data;
        // evaluste min max range

        this.minLoanAmount = Math.min(...this.ResultProcessedData.map(c => c.loanAmount))
        this.maxLoanAmount = Math.max(...this.ResultProcessedData.map(c => c.loanAmount))

        this.minappraisedValue = Math.min(...this.ResultProcessedData.map(c => c.appraisedValue))
        this.maxappraisedValue = Math.max(...this.ResultProcessedData.map(c => c.appraisedValue))

        this.mincreditCardPayment = Math.min(...this.ResultProcessedData.map(c => c.creditCardPayment))
        this.maxcreditCardPayment = Math.max(...this.ResultProcessedData.map(c => c.creditCardPayment))

        this.minMonthlyMortgagePayment = Math.min(...this.ResultProcessedData.map(c => c.monthlyMortgagePayment))
        this.maxMonthlyMortgagePayment = Math.max(...this.ResultProcessedData.map(c => c.monthlyMortgagePayment))

        this.mingrossMonthlyIncome = Math.min(...this.ResultProcessedData.map(c => c.grossMonthlyIncome))
        this.maxgrossMonthlyIncome = Math.max(...this.ResultProcessedData.map(c => c.grossMonthlyIncome))


        this.minCarPayment = Math.min(...this.ResultProcessedData.map(c => c.carPayment))
        this.maxCarPayment = Math.max(...this.ResultProcessedData.map(c => c.carPayment))


        var dataScale = this.ResultProcessedData.filter(c => c.isEligible == true).map(c => c.id)

        this.barChartLabelsApproved = this.ResultProcessedData.filter(c => c.isEligible == true).map(c => c.id)
        this.barChartLabelsNotApproved = this.ResultProcessedData.filter(c => c.isEligible == false).map(c => c.id)


        this.barChartData = [
          // { data: [dataScale], label: 'DTI Ratio' },
          { data: dataScale, label: 'DTI Ratio' },
        ];



      },
      (err) => {
        console.log(err);

      }
    )

  }


  updateChart() {
    console.log(this.criteriaForm.value.attribute);

  }




  // get approvalDecision(): string {
  //   if (this.appraisedValue >= 80 && this.downPayment >= 20) {
  //     return 'Approved';
  //   } else {
  //     return 'Not Approved';
  //   }
  // }

  onSelectRange(rangeType, event) {


    console.log(this.carPayment);
    console.log(this.grossMonthlyIncome);
    console.log(this.monthlyMortgagePayment);
    console.log(this.creditCardPayment);
    console.log(this.appraisedValue);
    console.log(this.loanAmount);

    if (rangeType == 1) {
      
      this.ProcessedData = this.ResultProcessedData.filter(c => c.loanAmount >= this.loanAmount)
      this.filterByAtttribute()
    }
    if (rangeType == 2) {
      
      this.ProcessedData = this.ResultProcessedData.filter(c => c.appraisedValue >= this.appraisedValue)
      this.filterByAtttribute()
    }
    if (rangeType == 3) {
      
      this.ProcessedData = this.ResultProcessedData.filter(c => c.creditCardPayment >= this.creditCardPayment)
      this.filterByAtttribute()
    }
    if (rangeType == 4) {
      
      this.ProcessedData = this.ResultProcessedData.filter(c => c.monthlyMortgagePayment >= this.monthlyMortgagePayment)
      this.filterByAtttribute()
    }
    if (rangeType == 5) {
      
      this.ProcessedData = this.ResultProcessedData.filter(c => c.grossMonthlyIncome >= this.grossMonthlyIncome)
      this.filterByAtttribute()
    }
    if (rangeType == 6) {
      
      this.ProcessedData = this.ResultProcessedData.filter(c => c.carPayment >= this.carPayment)
      this.filterByAtttribute()
    }





  }

  filterByAtttribute(){
    debugger
    var dataScale = this.ProcessedData.filter(c => c.isEligible == true).map(c => c.id)
    this.barChartLabelsApproved = this.ProcessedData.filter(c => c.isEligible == true).map(c => c.id)
    this.barChartLabelsNotApproved = this.ProcessedData.filter(c => c.isEligible == false).map(c => c.id)

    this.barChartData = [
      // { data: [dataScale], label: 'DTI Ratio' },
      { data: dataScale, label: 'DTI Ratio' },
    ];
  }


}
