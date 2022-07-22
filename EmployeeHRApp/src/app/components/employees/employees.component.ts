import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/Employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeesService) { }


  ngOnInit() {
    
    this.refreshEmployees();
  }

  refreshEmployees() {
    this.employeeService.getEmployees().pipe()
      .subscribe((employees: Employee[]) => {
          this.dataSource.data = employees;
          this.dataSource.paginator = this.paginator;
        },
        (error: Error) => console.log(error));
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'ssn', 'phoneNumber'];
  dataSource = new MatTableDataSource(this.employees);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
