import React from "react";

const CommonQuestions = () => {
  const questions = [
    {
      id: 1,
      question: "Yangi mahsulot qanday qo'shaman?",
      answer:
        "Boshqaruv panelida yoki Mahsulotlar sahifasida '+' tugmasini bosing, keyin mahsulot ma'lumotlarini to'ldiring va saqlang.",
    },
    {
      id: 2,
      question: "Mahsulotni qanday o'chiraman?",
      answer:
        "Mahsulotlar jadvalida mahsulot qatoriga olib borib, 'O'chirish' tugmasini bosing. Tasdiqlash uchun OK tugmasini bosing.",
    },
    {
      id: 3,
      question: "Kam qolgan mahsulotlar haqida qanday xabar olaman?",
      answer:
        "Boshqaruv panelida 'Kam qolgan mahsulotlar' bo'limiga qarab turishingiz mumkin. Shuningdek, minimal miqdor belgilangandan keyin avtomatik ogohlantirish olasiz.",
    },
    {
      id: 4,
      question: "Qarzni qanday boshqaraman?",
      answer:
        "Yon menyuda 'Qarzlar' bo'limiga o'tib, berilgan va olingan qarzlarni boshqarishingiz mumkin. Har bir qarz uchun summa, sana va holat belgilashingiz mumkin.",
    },
    // {
    //   id: 5,
    //   question: "Mahsulot tarixini qanday ko'raman?",
    //   answer:
    //     "Har bir mahsulotning tarixini ko'rish uchun mahsulotni bosing. So'nggi o'zgarishlar va inventar harakatlari ko'rsatiladi.",
    // },
  ];

  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white w-full max-w-[750px] p-4 sm:p-6 rounded-lg flex flex-col gap-6 shadow-md">
        <h2 className="text-xl font-semibold">Tez-tez so'raladigan savollar</h2>

        <div className="flex flex-col gap-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              {/* ✅ checkbox = independent per item → multiple can be open */}
              <input type="checkbox" id={`collapse-${q.id}`} />
              <div className="collapse-title font-semibold">{q.question}</div>
              <div className="collapse-content text-sm">{q.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;