import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ToDo } from '../../api/to-do.models';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent {
  searchForm = new FormGroup({
    query: new FormControl(this.activatedRoute.snapshot.queryParamMap.get('query') ?? '', { nonNullable: true }),
  });

  todos$ = this.activatedRoute.data.pipe(map((data) => data['todos'] as ToDo[]));

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  search() {
    if (!this.searchForm.valid) {
      return;
    }

    this.router.navigate([], {
      queryParams: this.searchForm.value,
      relativeTo: this.activatedRoute,
    });
  }
}
