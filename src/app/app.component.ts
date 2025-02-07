import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Job } from './job';
import { JobService } from './job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

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

  public onOpenModal(job: Job | null, mode: string): void {
    const modalId = mode === 'add' ? 'addJobModal' : 
                    mode === 'edit' ? 'editJobModal' : 
                    'deleteJobModal';
    
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
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

  public addJob(job: Job): void {
    this.jobService.addJob(job).subscribe({
      next: (response: Job) => {
        console.log(response);
        this.getJobs();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert(error.message);
      }
    });
  }

}