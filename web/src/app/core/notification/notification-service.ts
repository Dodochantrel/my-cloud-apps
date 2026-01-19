import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  private lifeTime: number = 8000;

  success(summary: string, detail: string) {
    this.show('success', summary, detail);
  }

  error(summary: string, detail: string) {
    this.show('error', summary, detail);
  }

  info(summary: string, detail: string) {
    this.show('info', summary, detail);
  }

  warn(summary: string, detail: string) {
    this.show('warn', summary, detail);
  }

  invalidForm() {
    this.error('Formulaire invalide', 'Veuillez remplir tous les champs correctement.');
  }

  private show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: this.lifeTime,
      closable: true,
    });
  }

  confirm(
    event: Event,
    header: string,
    message: string,
    validateLabel: string,
    cancelLabel: string,
    acceptCallback: () => void,
    rejectCallback?: () => void,
  ) {
    return this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      header: header,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: cancelLabel,
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: validateLabel,
        severity: 'danger',
      },
      accept: acceptCallback,
      reject: rejectCallback,
    });
  }
}
