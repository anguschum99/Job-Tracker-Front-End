import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Job } from './job';
import { JobService } from './job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title = 'job-portal';
  public jobs: Job[] = [];
  public editJob: Job | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  public onOpenModal(job: Job | null, mode: string): void {
    const modalId = mode === 'add' ? 'addJobModal' : 
                    mode === 'edit' ? 'editJobModal' : 
                    'deleteJobModal';
    
    if (mode === 'edit' && job) {
      this.editJob = { ...job };
    } else if (mode === 'add') {
      this.editJob = {
        id: 0,
        jobName: '',
        jobRole: '',
        screenshot: '',
        date: ''
      };
    }
  
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  public onAddJob(addform: NgForm): void {
    const job: Job = addform.value;
    this.jobService.addJob(job).subscribe({
      next: (response: Job) => {
        console.log(response);
        this.getJobs();
        addform.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert(error.message);
      }
    });
  }

  public onUpdateJob(editform: NgForm): void {
    const updatedJob: Job = {
      ...this.editJob,
      ...editform.value
    };
    
    this.jobService.updateJob(updatedJob).subscribe({
      next: (response: Job) => {
        console.log(response);
        this.getJobs();
        editform.reset();
        // Close the modal
        const modalElement = document.getElementById('editJobModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert(error.message);
      }
    });
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