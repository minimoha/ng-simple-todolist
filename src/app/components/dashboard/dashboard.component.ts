import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';


  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks")
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err)
    })
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to update task")
    })
  }


  deleteTask(task: Task){
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete task")
    })
  }

  call(task: Task){
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }
}
