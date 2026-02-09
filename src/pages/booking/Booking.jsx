import BookingForm from "./BookingForm";
import styles from "./Booking.module.css";

export default function Booking() {
  return (
    <section className={`${styles.page} min-h-screen`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`${styles.heading} text-center mb-10`}>Book an Appointment</h1>
        <p className={styles.subheading}>Choose a time and let us craft a beautiful experience.</p>
        <div className={styles.formCard}>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}