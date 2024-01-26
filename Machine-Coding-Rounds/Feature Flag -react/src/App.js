import "./styles.css";

import PaymentOptions from "./components/PaymentOptions";

export default function App() {
  return (
    <main className="app">
      <h1>Payment Gateway</h1>

      <section className="screen">
        <h3>$ 99.99</h3>
        <PaymentOptions />
      </section>
    </main>
  );
}
