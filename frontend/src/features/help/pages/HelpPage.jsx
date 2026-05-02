// components
import TitleBar from "@/components/layout/TitleBar";
import ContactBlock from "../components/ContactBlock";
import CommonQuestions from "../components/CommonQuestions";

const HelpPage = () => {
  return (
    <div className="page-container">
      <TitleBar
        pageTitle={"Yordam va qo'llab-quvvatlash"}
        pageDescription={
          "Savol-javob va texnik yordamga ehtiyojingiz bo'lsa, bu yerdan foydalaning"
        }
      />
      <ContactBlock />
      <CommonQuestions />
    </div>
  );
};

export default HelpPage;
