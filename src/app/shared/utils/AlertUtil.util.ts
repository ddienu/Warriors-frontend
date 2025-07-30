import Swal from "sweetalert2";

export default class AlertUtil {

    static success(message: string) {
        return Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    };

    static error(message: string) {
        return Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    };

    static info(message: string) {
        return Swal.fire({
            position: "top-end",
            icon: "info",
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    };

    static confirm(message: string) {
        return Swal.fire({
            icon: 'question',
            title: message,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        })
    }
}