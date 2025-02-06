import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Job } from './job';
import { JobService } from './job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title = 'job-portal';
  public jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  public getJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (response: Job[]) => {
        this.jobs = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert(error.message);
      }
    });
  }
}