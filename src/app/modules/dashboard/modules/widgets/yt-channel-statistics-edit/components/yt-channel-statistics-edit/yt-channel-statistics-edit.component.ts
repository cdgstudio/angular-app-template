import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditableWidgetForm, WidgetState } from '@cdgstudio/dashboard';
import { Observable, Subject } from 'rxjs';
import { ModalService } from '../../../../../../../shared/modal';

@Component({
  selector: 'app-yt-channel-statistics-edit',
  templateUrl: './yt-channel-statistics-edit.component.html',
  styleUrls: ['./yt-channel-statistics-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YtChannelStatisticsEditComponent implements EditableWidgetForm<string>, OnDestroy {
  private newData$ = new Subject<string>();

  form = new FormGroup({
    channel: new FormControl(this.channel, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    @Inject(WidgetState)
    private channel: string,
    private modalService: ModalService,
  ) {}

  update() {
    this.newData$.next(this.form.controls.channel.value);
    this.close();
  }

  close() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    this.newData$.complete();
  }

  getNewData(): Observable<string> {
    return this.newData$;
  }
}
