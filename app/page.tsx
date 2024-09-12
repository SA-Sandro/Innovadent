import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="">
        <section className="">
          <div className="">
            <Image
              width={300}
              height={300}
              src="/images/main-background.jpg"
              alt="Fondo de Innovadent"
            ></Image>
          </div>
          <div className="">
            <div>
              <h3 className="">Innovadent</h3>
              <p>Porque vuestra sonrisa si que importa</p>
            </div>
          </div>
        </section>

        <section className="">
          <div className="">
            <div className="">
              <a href="create_appointment.html">
                <button className="">Crear una cita</button>
              </a>
            </div>
            <div className="text-center p-2">
              <a href="check_appointment.html">
                <button className="">Ver citas</button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
