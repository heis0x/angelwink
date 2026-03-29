import { useState } from "react";
import { contactLinks, enquiryOptions } from "../data/siteContent";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: enquiryOptions[0],
  format: "In-person",
  availability: "",
  message: "",
};

function createWhatsAppLink(form) {
  const lines = [
    "Hello Angel Zino,",
    "",
    `Name: ${form.name || "-"}`,
    `Email: ${form.email || "-"}`,
    `Phone: ${form.phone || "-"}`,
    `Service: ${form.service || "-"}`,
    `Format: ${form.format || "-"}`,
    `Availability: ${form.availability || "-"}`,
    "",
    "Message:",
    form.message || "-",
  ];

  return `https://wa.me/${contactLinks.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function InquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(createWhatsAppLink(form), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form__grid">
        <label>
          <span>Your name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
        </label>

        <label>
          <span>Email address</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            required
          />
        </label>

        <label>
          <span>Phone number</span>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." />
        </label>

        <label>
          <span>What do you need?</span>
          <select name="service" value={form.service} onChange={handleChange}>
            {enquiryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Format</span>
          <select name="format" value={form.format} onChange={handleChange}>
            <option value="In-person">In-person</option>
            <option value="Online">Online</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>

        <label>
          <span>Availability</span>
          <input
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="Weekdays, weekends, next month..."
          />
        </label>
      </div>

      <label className="inquiry-form__message">
        <span>Your message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell Angel's Wink what you want, the look or outcome you want, and anything important to know."
          rows="6"
          required
        />
      </label>

      <div className="inquiry-form__footer">
        <button className="button" type="submit">
          Send To WhatsApp
        </button>
        <p className="inquiry-form__note">
          This form opens WhatsApp with a prefilled message for Angel Zino.
        </p>
      </div>

      {submitted ? <p className="inquiry-form__success">WhatsApp opened with your drafted enquiry.</p> : null}
    </form>
  );
}
