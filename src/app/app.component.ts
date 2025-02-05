import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Job } from './job';
import { JobService } from './job.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title = 'job-portal';
  public jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  public getJobs(): void {
    this.jobService.getJobs().subscribe(
      (response: Job[]) => {
        this.jobs = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert(error.message);
      }
    )
  }
  

}
