import { useState } from "react";
import Button from "./Button";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}

const SubscribeForm: React.FC = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    setSubmitting(true);
    const elements = e.currentTarget.elements as FormElements;
    const resetForm = () => {
      elements.email.value = "";
      setMessage("");
      setButtonDisabled(false);
      setSubmitting(false);
    };
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: elements.email.value,
        }),
      });
      const result = await response.json();

      if (response.status >= 400) {
        setStatus(response.status);
        setMessage(result.message);
        setTimeout(() => {
          resetForm();
        }, 2000);
        return;
      }

      setStatus(201);
      setMessage("Thank you for subscribing my newsletter.");
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.log(error);
      setStatus(500);
      setMessage("Error joining the newsletter.");
      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };
  return (
    <>
      <form
        className="relative flex items-center gap-1 bg-gray-800 text-white px-3 py-2 rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          name="email"
          placeholder="Enter email"
          autoComplete="off"
          className="w-2/3 outline-none bg-transparent"
        />
        <Button
          type="submit"
          disabled={buttonDisabled}
          className="!h-8 bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-800"
        >
          {submitting ? "Submitting" : "Subscribe"}
        </Button>
      </form>
      {message && (
        <p
          className={`${
            status !== 201 ? "text-red-500" : "text-green-500"
          } pl-3 pt-2 font-medium`}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default SubscribeForm;
