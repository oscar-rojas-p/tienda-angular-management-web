import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [
		CommonModule,

	],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent {
	@Input() isVisible: boolean = false;
	@Input() title: string = '';
	@Input() buttonAccept: string = 'Guardar';
	@Input() buttonDecline: string = 'Cancelar';
	@Output() closeEvent: EventEmitter<void> = new EventEmitter();
	@Output() registerEvent: EventEmitter<void> = new EventEmitter();

	close(){
		this.closeEvent.emit();
	}

	funcionGuardar(){
		this.registerEvent.emit();
	}

}
