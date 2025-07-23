import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

    fire(options: any): Promise<any> {
    if (typeof Swal !== 'undefined' && typeof Swal.fire === 'function') {
      return Swal.fire(options);
    } else {
      console.warn('SweetAlert2 no disponible');
      return Promise.resolve({ isConfirmed: false });
    }
  }
}
