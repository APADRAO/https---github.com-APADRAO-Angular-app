//import { IContacorrente } from '../../shared/interfaces/contacorrente';
//import { ICliente } from '../../shared/interfaces/cliente';
import {
  Component,
  ContentChild,
  Injectable,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalConfig } from './modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { LancamentosComponent } from 'src/app/pages/contacorrente/lancamentos/lancamentos.component';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig;
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>;
  //@ContentChild(TemplateRef) templateRef!: TemplateRef<LancamentosComponent>;
  private modalRef!: NgbModalRef;

  
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    //console.log('this.templateRef', this.templateRef);
  }

 

  async close(): Promise<void> {
    if (
      this.modalConfig.shouldClose === undefined ||
      (await this.modalConfig.shouldClose())
    ) {
      const result =
        this.modalConfig.onClose === undefined ||
        (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
  }

  async dismiss(): Promise<void> {
    if (
      this.modalConfig.shouldDismiss === undefined ||
      (await this.modalConfig.shouldDismiss())
    ) {
      const result =
        this.modalConfig.onDismiss === undefined ||
        (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }
}
