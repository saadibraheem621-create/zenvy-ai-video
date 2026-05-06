"use client";

const plans = [
  {
    name: "Starter",
    price: "$10",
    credits: 100,
  },
  {
    name: "Pro",
    price: "$35",
    credits: 500,
  },
  {
    name: "Ultra",
    price: "$99",
    credits: 2000,
  },
];

export default function PricingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "40px",
        }}
      >
        Pricing Plans
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: "#111827",
              borderRadius: "20px",
              padding: "30px",
              border: "1px solid #1e293b",
            }}
          >
            <h2>{plan.name}</h2>

            <h1
              style={{
                fontSize: "50px",
              }}
            >
              {plan.price}
            </h1>

            <p>Credits {plan.credits}</p>

            <button
              onClick={() => {
                window.location.href =
                  `/payments/create?credits=${plan.credits}&amount=${plan.price}`;
              }}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "15px",
                border: "none",
                borderRadius: "12px",
                background: "#06b6d4",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}