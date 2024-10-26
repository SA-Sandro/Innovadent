import styles from "./info.module.css";

export default function Info() {
  return (
    <div className="max-w-xl lg:max-w-3xl my-10 mx-2 space-y-4">
      <article className={styles["info-container"]}>
        <h2>¿Qué es Innovadent?</h2>
        <p>
          En Innovadent, creemos firmemente que la salud dental es clave para
          mejorar la calidad de vida de nuestros pacientes. Nuestra misión es
          facilitarte el acceso a un cuidado dental de primera clase a través de
          una plataforma eficiente, intuitiva y moderna.
        </p>
      </article>
      <article className={styles["info-container"]}>
        <h2>¿Por qué elegir Innovadent?</h2>
        <p>
          Nuestro objetivo es ofrecerte un servicio dental que se adapta a tu
          estilo de vida, con las siguientes ventajas:
        </p>
        <ul className="list-disc ml-10 my-2">
          <li>
            Accesibilidad total: Programa o modifica tus citas en cualquier
            momento desde cualquier dispositivo.
          </li>
          <li>
            Recordatorios automáticos: No más olvidos. Recibirás notificaciones
            de tus citas y recordatorios para tus próximos tratamientos.
          </li>
          <li>
            Control en tus manos: Consulta tu historial clínico, próximas citas
            y tratamientos recomendados de forma transparente y siempre
            disponible.
          </li>
        </ul>
      </article>
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-2 md:space-y-0 justify-center">
        <article className={styles["info-container"]}>
          <h2>Nuestra filosofía</h2>
          <p>
            En Innovadent, sabemos que cada paciente es único. Nos preocupamos
            por brindar un trato personalizado que respalde tanto tu salud
            bucodental como tu confianza al sonreír. Porque tu sonrisa es lo que
            más nos importa.
          </p>
        </article>
        <article className={styles["info-container"]}>
          <h2>Nuestro compromiso</h2>
          <p>
            Estamos comprometidos con ofrecerte la mejor experiencia posible,
            desde el momento en que decides agendar una cita, hasta que sales de
            nuestra clínica con una sonrisa renovada. Con Innovadent, tus citas
            son solo el primer paso hacia una mejor salud dental.
          </p>
        </article>
      </div>
    </div>
  );
}
