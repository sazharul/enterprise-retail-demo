import Swal from "sweetalert2";

const showToast = (message, icon = "success", position = "top-end", timer = 3000) => {
    const toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    toast.fire({
        icon: icon,
        title: message,
    });
};

export default showToast;
