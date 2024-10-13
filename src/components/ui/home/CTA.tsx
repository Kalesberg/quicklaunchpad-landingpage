import Button from "components/common/Button";
import React from "react";

const CTA: React.FC = () => {
  return (
    <section className="text-center mb-16 py-28 bg-[#1C1E29] rounded-lg">
      <h2 className="text-6xl font-bold mb-4 max-w-[650px] mx-auto mb-14">
        Want to be a part of our launchpads?
      </h2>
      <Button variant="primary" size="medium" className="max-w-[277px] w-full">
        Apply to raise
      </Button>
    </section>
  );
};

export default CTA;
