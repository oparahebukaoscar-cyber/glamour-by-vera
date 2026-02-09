import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Booking.module.css";

export default function BookingForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => navigate("/booking/success");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
      <div className={styles.formCard}>
        <input {...register("name")} placeholder="Full Name" className={styles.input} />
        <div style={{ height: 12 }} />
        <input {...register("email")} placeholder="Email" className={styles.input} />
        <div style={{ height: 12 }} />
        <input {...register("date")} type="date" className={styles.input} />

        <div style={{ height: 18 }} />
        <button className={styles.btn} type="submit">
          Confirm Booking
        </button>
      </div>
    </form>
  );
}