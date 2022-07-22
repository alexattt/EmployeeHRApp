import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  firstName: string = "";
  lastName: string = "";
  ssn: string = "";
  phoneNumber: string = "";

  constructor(private employeesService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
  }

  createEmployee(): void {
    if (!this.firstName) {
      alert('First name is mandatory!');
      return;
    }
    if (!this.lastName) {
      alert('Last name is mandatory!');
      return;
    }
    if (!this.ssn) {
      alert('SSN is mandatory!');
      return;
    }

    const newEmployee = {
      firstName: this.firstName,
      lastName: this.lastName,
      ssn: this.ssn,
      phoneNumber: this.phoneNumber
    };

    this.employeesService.createEmployee(newEmployee).subscribe(
      (data) => {
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.log("err", error);
      });
  };
}
