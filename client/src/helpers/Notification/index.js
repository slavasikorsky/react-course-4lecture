import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = {
    error(title, id){
        toast.error(title, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            toastId: id,
        })
    },

    success(title, id){
        toast.success(title, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            toastId: id,
        })
    },
};

export default notify;